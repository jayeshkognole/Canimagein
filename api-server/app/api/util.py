from flask import request
from werkzeug.exceptions import BadRequest


def get_form_parameter(parameter_name, required=True):
    val = request.form.get(parameter_name)
    if required and val is None:
        raise BadRequest(f'{parameter_name} is required')
    return val


def get_query_parameter(parameter_name, required=True):
    val = request.args.get(parameter_name)
    if required and val is None:
        raise BadRequest(f'{parameter_name} is required')
    return val


def get_file(parameter_name, required=True):
    if parameter_name not in request.files:
        if required:
            raise BadRequest('File is missing.')
        else:
            return None, None
    file = request.files[parameter_name]
    if file.filename == '':
        raise BadRequest('File is missing.')
    return file.filename, file.read()
