import logging
import sys
import traceback

from flask import jsonify

logger = logging.getLogger(__name__)


def handle_api_errors(error):
    traceback.print_exception(*sys.exc_info())
    response = jsonify({'status': 'error', 'message': error.description})
    response.status_code = error.code
    return response
