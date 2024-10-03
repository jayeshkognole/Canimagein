
from flask import Blueprint, jsonify, request

test_bp = Blueprint('lens', __name__, url_prefix='/lens')


@test_bp.route('/get_all_documents', methods=['POST'])
def test_func():
    pass