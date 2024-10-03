import os

from app.storage.dao import add_radiology_dao,add_data

image_path = './data/images'
already_added_image = '00000103_010'


def populate_radiology_table():
    for i, file in enumerate(os.listdir(image_path)):
        image_name = file.split('.')[0]
        if image_name != already_added_image:
            add_radiology_dao(
                image_name=image_name,
                patient=i + 2,
                ml_output='ML_OUTPUT',
                paligemma_output='PALIGEMMA_OUTPUT',
                gemini_output='Lorem ipsum dolor sit amet, consectetur adipiscing elit. '
                              'Fusce placerat, risus vitae sollicitudin semper, risus massa ultricies magna, blandit '
                              'ornare dui tortor nec nisi. Mauris gravida nunc vel elit fermentum vehicula. '
                              'Morbi egestas elit id libero cursus, ac pellentesque nunc luctus. '
                              'Proin imperdiet, odio nec ultrices ullamcorper, dolor dui mollis ligula, '
                              'vel malesuada lectus mi eu dolor. Integer non magna nec lectus iaculis auctor. ',
                similar_radiology_id=None
            )

def add_record():
    add_data()
    pass

if __name__ == '__main__':
    # populate_radiology_table()
    add_record()