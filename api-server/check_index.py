import chromadb
from chromadb.api.types import IncludeEnum

chromadb_location = './data/index'
collection_name = 'cxr_embeddings'


def get_chromadb_collection():
    client = chromadb.PersistentClient(path=chromadb_location)
    collection = client.get_collection(collection_name)
    return collection


def get_document_count():
    collection = get_chromadb_collection()
    records = collection.get(include=[IncludeEnum.embeddings, IncludeEnum.documents])
    print(len(records['embeddings']))


def test_search():
    _id = '1727784905550'

    from app.embedding import search
    search(_id, 5)


if __name__ == '__main__':
    get_document_count()
