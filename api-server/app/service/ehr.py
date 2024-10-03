
from app.service.gemini_api import GeminiAPIFlash,GeminiAPIText
import app.constant as constant
import app.service.prompt_library as prompt_library
from app.storage.dao import add_conversaion,add_ehr,get_summary_ehr,update_summary_ehr
import json
gemini_transcript = GeminiAPIFlash('gemini-1.5-flash-002', max_output_tokens=constant.MAX_OUTPUT_TOKEN,
                                                temperature=constant.TEMPERATURE)
gemini_text = GeminiAPIText('gemini-1.5-flash-002', max_output_tokens=constant.MAX_OUTPUT_TOKEN,
                                         temperature=constant.TEMPERATURE)

def process_transcript(file_path=None,patient_id=None):
    res=""
    response = gemini_transcript.generate_transcript(prompt_library.GENERATE_CONVERSATION_TRANSCRIPT, file_path)
    # print(response)
    formatted_string=""
    if response:
        data = json.loads(response[response.find('{') : response.rfind('}')+1])
        # print(data)
        transcript = data['transcript']
        summary = data['summary']
        transcript_english = data['transcript_english']
        summary_english = data['summary_english']
        if transcript:
            conversation=add_conversaion(transcript=transcript,patient_id=patient_id,file_path=file_path, transcript_english=transcript_english)
            res= gemini_text.generate_text(prompt_library.get_ehr_generate_prompt(transcript_english))
            print(res)
            ehr_data = json.loads(res[res.find('{') : res.rfind('}')+1])
            for key, value in ehr_data.items():
                value_str = str(value) if value is not None else "None" 
                formatted_string += f"{key}: {value_str}\n\n"
            ehr=add_ehr(patient_id=patient_id,conversation=conversation,past_medical_history=ehr_data["past_medical_history"],phy_examination=ehr_data["phy_examination"],assessment=ehr_data["assessment"],current_medical_issue=ehr_data["current_medical_issue"],last_admitted_date=ehr_data["last_admitted_date"],last_admitted_summary=ehr_data["last_admitted_summary"],summary=summary,summary_english=summary_english) 
    result={
        "transcript":transcript,
        "transcript_english":transcript_english,
        "ehr":formatted_string
    }
    return result


def addEhr(transcript=None,patient_id=None,conversation_id=None):
    try:
        ehrs=get_summary_ehr(conversation_id=conversation_id,patient_id=patient_id)
        res= gemini_text.generate_text(prompt_library.get_ehr_format_prompt(transcript,str(ehrs)))
        ehr_data = json.loads(res[res.find('{') : res.rfind('}')+1])
        return update_summary_ehr(patient_id=patient_id, conversation_id=conversation_id,updates=ehr_data)
    except Exception as e:
        print(f"Error retrieving data: {e}")
        return {}     
    pass
