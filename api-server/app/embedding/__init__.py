import os
import shutil

import chromadb
import tensorflow as tf
from chromadb.api.types import IncludeEnum
# from cxr_foundation.inference import generate_embeddings, InputFileType, OutputFileType, ModelVersion

from app.storage.dao import get_radiology_dao
from config import get_config

working_dir = './data/tmp/embeddings'
chromadb_location = './data/index'
collection_name = 'cxr_embeddings'
images_dir = './data/images'

EMBEDDING_VERSION = 'elixr_img_contrastive'


# ----------- Helper class -----------

class MatchingRecord:
    def __init__(self, _id, distance, gemini_description):
        self._id = _id
        self.distance = distance
        self.gemini_description = gemini_description


# ----------- Helper functions -----------

# Function to parse the TFRecord and extract only the embedding feature
def _parse_function(proto):
    feature_description = {
        'embedding': tf.io.VarLenFeature(tf.float32),  # Assuming variable-length embeddings stored
    }

    # Parse the input tf.Example proto using the feature description
    parsed_features = tf.io.parse_single_example(proto, feature_description)
    # Convert sparse embedding to dense tensor and return
    return tf.sparse.to_dense(parsed_features['embedding'])


# Function to process a single TFRecord file and extract embeddings
def process_tfrecord_file(tfrecord_file):
    # Create a dataset from the TFRecord file
    dataset = tf.data.TFRecordDataset([tfrecord_file])
    # Map the dataset to the parsing function to extract only embeddings
    parsed_dataset = dataset.map(_parse_function)

    embeddings = []
    for record in parsed_dataset:
        embedding_numpy = record.numpy()  # Convert tensor to numpy array
        embeddings.append(embedding_numpy)  # Add to the list
    return embeddings


def get_embeddings(cxr, _id):
    """
    Use CXR embeddings model to generate embeddings from given CXR in png file format.
    Also add embeddings to the chromadb
    :param cxr: image
    :param id: id of image record in the database
    :param file_type: Type of file passed to the function. Possible values are png, dicom
    :return:
    """

    # Create required directory structure
    input_dir = os.path.join(working_dir, _id, 'input')
    input_file_name = os.path.join(input_dir, f'{_id}.png')
    output_dir = os.path.join(working_dir, _id, 'output')

    for _dir in [input_dir, output_dir]:
        if os.path.exists(_dir):
            shutil.rmtree(_dir)
        os.makedirs(_dir)

    # Save image to input directory
    with open(input_file_name, 'wb') as fp:
        fp.write(cxr)

    if EMBEDDING_VERSION == 'cxr_foundation':
        MODEL_VERSION = ModelVersion.V1
        TOKEN_NUM = 1
        EMBEDDINGS_SIZE = 1376
    elif EMBEDDING_VERSION == 'elixr':
        MODEL_VERSION = ModelVersion.V2
        TOKEN_NUM = 32
        EMBEDDINGS_SIZE = 768
    elif EMBEDDING_VERSION == 'elixr_img_contrastive':
        MODEL_VERSION = ModelVersion.V2_CONTRASTIVE
        TOKEN_NUM = 32
        EMBEDDINGS_SIZE = 128
    else:
        raise Exception(f'Not a valud CXR EMBEDDING_VERSION: {EMBEDDING_VERSION}')

    # Generate all the embeddings in .tfrecord format
    # generate_embeddings(input_files=[input_file_name], output_dir=output_dir,
    #                     input_type=InputFileType.PNG, output_type=OutputFileType.TFRECORD,
    #                     model_version=MODEL_VERSION)

    tfrecord_file = list(os.listdir(output_dir))[0]

    file_embeddings = process_tfrecord_file(os.path.join(output_dir, tfrecord_file))
    return file_embeddings


def save_embeddings(_ids, embeddings):
    """
    Save embeddings to index
    :param _id: list of ids indicating names of images
    :param embeddings: list of embedding vectors corresponding to each id
    :return: 
    """
    collection = get_chromadb_collection()

    collection.add(
        documents=_ids,
        embeddings=embeddings,
        ids=_ids
    )


def get_chromadb_collection(create_new=False):
    """
    Returns chromadb collection
    :return:
    """

    if create_new:
        if os.path.exists(chromadb_location):
            shutil.rmtree(chromadb_location)
        os.makedirs(chromadb_location)
        client = chromadb.PersistentClient(path=chromadb_location)
        collection = client.create_collection(collection_name)
    else:
        client = chromadb.PersistentClient(path=chromadb_location)
        collection = client.get_collection(collection_name)
    return collection


def get_image(_id):
    with open(os.path.join(images_dir, f'{_id}.png'), 'rb') as fp:
        return fp.read()


# ----------- API functions -----------

def process_cxr(cxr, _id):
    embeddings = get_embeddings(cxr, _id)
    save_embeddings([_id], embeddings)


def search(_id, n_results):
    # First retrieve embeddings of cxr with given id from chromadb
    collection = get_chromadb_collection()
    cxr_index_record = collection.get(ids=[_id], include=[IncludeEnum.embeddings, IncludeEnum.documents])
    if cxr_index_record and "documents" in cxr_index_record and cxr_index_record["documents"]:
        cxr_embeddings = cxr_index_record['embeddings'][0]
    else:
        return []

    # Now use these embeddings to search similar images
    matches = collection.query(
        query_embeddings=cxr_embeddings,
        n_results=n_results,
    )

    matching_ids = matches['ids'][0]
    matching_distances = matches['distances'][0]

    result = []
    for i, matching_id in enumerate(matching_ids):
        if matching_id != _id:
            cxr_dao = get_radiology_dao(matching_id)
            if cxr_dao:
                gemini_summary = cxr_dao.gemini_output
            else:
                gemini_summary = None

            result.append(MatchingRecord(
                matching_id,
                matching_distances[i],
                gemini_summary
            ))

    return result


def generate_embeddings_for_nih_dataset():
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "./data/config/creds.json"
    _cfg = get_config()

    # Create a new chromadb collection
    get_chromadb_collection(create_new=True)

    # Create embeddings for each image and save in chromadb
    files_path = 'data/images'
    for i, file in enumerate(os.listdir(files_path)):
        print('-' * 100)
        print(f'Processing file {i}: {file}')
        with open(os.path.join(files_path, file), 'rb') as fp:
            cxr = fp.read()
            process_cxr(cxr, file.split('.')[0])


if __name__ == '__main__':
    generate_embeddings_for_nih_dataset()
