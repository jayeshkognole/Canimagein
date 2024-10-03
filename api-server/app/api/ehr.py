
from flask import Blueprint, jsonify, request
# from app.storage.dao import get_employee,insert_employee
from app.storage.dao import get_patient_ehr_history_dao , get_patient_ehr_details_dao
from app.api.util import get_form_parameter,get_query_parameter
from app.service.ehr import process_transcript,addEhr
import os
import time
import base64
ehr_bp = Blueprint('ehr', __name__, url_prefix='/ehr')

@ehr_bp.route('/health', methods=['GET'])
def test():
    return "testing works"

@ehr_bp.route('/get_patient_ehr_history', methods=['GET'])
def get_patient_ehr_history():
    patient_id=get_query_parameter("patient_id")
    try:
        titels=get_patient_ehr_history_dao(patient_id,to_dict=True)
        return jsonify({'status': 'success', 'data': titels})
    except Exception as e:
        return jsonify({'status': 'fail'})
    

@ehr_bp.route('/get_patient_ehr_details', methods=['GET'])
def get_patient_ehr_details():
    conversation_id=get_query_parameter("conversation_id")
    try:
        data=get_patient_ehr_details_dao(conversation_id,to_dict=True)
        return jsonify({'status': 'success', 'data': data})
    except Exception as e:
        return jsonify({'status': 'fail'})
    

@ehr_bp.route('/add_conversation', methods=['POST'])
def add_conversation():
    try:
        data = request.get_json()
        audio_data = data['audioData']
        patient_id = data['patient_id']
        if audio_data is None or audio_data == "":
            filepath="data/EHR_Voicenote.mp3"
        else :
            audio_bytes = base64.b64decode(audio_data)
            filename = int(round(time.time() * 1000))
            filepath = os.path.join("data/Audio/", f"{filename}.wav")
            os.makedirs("data/Audio/", exist_ok=True)
            with open(filepath, 'wb') as f:
                f.write(audio_bytes)
        result=process_transcript(file_path=filepath,patient_id=patient_id)
        return jsonify({'status': 'success', 'data': result})
    except Exception as e:
        print(e)
        return jsonify({'status': 'fail'})
    

@ehr_bp.route('/update_summary_ehr', methods=['POST'])
def update_summary_ehr():
    try:
        data = request.get_json()
        transcript = data['transcript']
        patient_id = data['patient_id']
        conversation_id = data['conversation_id']
        result=addEhr(transcript=transcript,patient_id=patient_id,conversation_id=conversation_id)
        return jsonify({'status': 'success', 'data': result})
    except Exception as e:
        print(e)
        return jsonify({'status': 'fail'})
        