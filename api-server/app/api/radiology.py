import json
import os
from flask import jsonify, request
from app.api.util import get_query_parameter
from app.service.radiology import get_model_output_service,get_ai_response,get_similar_using_patient_id
from flask import Blueprint, send_file
from app.embedding import search as search_cxr

radiology_bp = Blueprint('cxr', __name__, url_prefix='/cxr')



@radiology_bp.route('/search', methods=['GET'])
def search():
    image_name = get_query_parameter("image_name",required=False)
    patient_id = get_query_parameter("patient_id")
    try:
        if image_name is None :
                data= get_similar_using_patient_id(patient_id)
                return jsonify({'status': 'success', 'data': data})
        result = search_cxr(image_name, 5)
        data = []
        for record in result:
            data.append({
                'id': record._id,
                'distance': record.distance,
                'gemini_description': record.gemini_description
            })
        return jsonify({'status': 'success', 'data': data})
    except Exception as e:
        print(str(e))
        return jsonify({'status': 'fail'})


@radiology_bp.route('/get_image', methods=['GET'])
def get_image():
    image_name = get_query_parameter("image_name")
    # image = get_image_cxr(image_name)
    return send_file(os.path.join(f'images/{image_name}'), mimetype='image/png')


@radiology_bp.route('/upload', methods=['POST'])
def upload_cxr():
    # {cxr:"",patient_id:""}
    data = json.loads(request.data)

    # radiology_id=get_body_parameter("cxr")
    try:
        data = []
        # data=get_patient_ehr_details_dao(conversation_id,to_dict=True)
        # data=[{"image":"base64" , "summary":summary}]
        return jsonify({'status': 'success', 'data': data})
    except Exception as e:
        return jsonify({'status': 'fail'})


@radiology_bp.route('/get_model_output', methods=['GET'])
def get_model_output():
    patient_id = get_query_parameter("patient_id")
    image_name = get_query_parameter("image_name", required=False)
    try:
        data = get_model_output_service(patient_id=patient_id, image_name=image_name)
        return jsonify({'status': 'success', 'data': data})
    except Exception as e:
        print(e)
        return jsonify({'status': 'fail'})

@radiology_bp.route('/get_ai_response', methods=['GET'])
def get_chat_output():
    patient_id = get_query_parameter("patient_id")
    prompt = get_query_parameter("prompt")
    try:
        data = get_ai_response(patient_id=patient_id, prompt=prompt)
        print("test3")
        return jsonify({'status': 'success', 'data': data})
    except Exception as e:
        print(e)
        return jsonify({'status': 'fail'})
