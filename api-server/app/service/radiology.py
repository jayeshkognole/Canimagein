
from app.service.gemini_api import GeminiAPI
import app.constant as constant
import app.service.prompt_library as prompt_library
from app.storage.dao import get_model_output,get_records,get_similar_readiology
import json
import os
import base64
from PIL import Image

# gemini_text = GeminiAPIText('gemini-1.5-flash-002', max_output_tokens=constant.MAX_OUTPUT_TOKEN,
#                                          temperature=constant.TEMPERATURE)

gemini_text=GeminiAPI('gemini-1.5-flash-002', max_output_tokens=constant.MAX_OUTPUT_TOKEN,
                                         temperature=constant.TEMPERATURE)

def get_model_output_service(patient_id=None,image_name=None):
    data= get_model_output(patient_id=patient_id,image_name=image_name)  

    parsed_data = {}
    for key, value in data.items():
        try:
            # Attempt to parse as JSON. If it fails, keep the original value.
            parsed_data[key] = json.loads(value)
        except json.JSONDecodeError:
            parsed_data[key] = value  
    # print(json.dumps(parsed_data, indent=2))

    with open("./app/images/"+parsed_data['image_name'], "rb") as image_file:
        image_base64 = base64.b64encode(image_file.read()).decode('utf-8')
    with open("./app/images/ml/"+parsed_data["ml_output"]["cxr"], "rb") as cxr_file:
        cxr_base64 = base64.b64encode(cxr_file.read()).decode('utf-8')
    with open("./app/images/ml/"+parsed_data["ml_output"]["heat_map"], "rb") as heat_file:
        heat_base64 = base64.b64encode(heat_file.read()).decode('utf-8')    

# Update the dictionary with the new values
    parsed_data["ml_output"]["cxr"] = cxr_base64  # or new_image_name if they represent the same thing
    parsed_data["ml_output"]["heat_map"] = heat_base64
    parsed_data["image_name"]=image_base64
    return parsed_data

def get_ai_response(patient_id=None, prompt=None):
    full_data=[]
    data=get_records(patient_id=patient_id)
    print("test")
    full_data.append(prompt_library.get_chat_response(prompt))
    full_data.append(str(data))
    full_data.append(Image.open("./app/images/ml/00000103_010_cxr.png"))
    full_data.append(Image.open("./app/images/ml/00000103_010_heat_map.png"))   
    print("test2") 
    res= gemini_text.generate_content(full_data)
    print(res)
    return res


def get_similar_using_patient_id(patient_id=None):
    data=get_similar_readiology(patient_id)
    results=[]

    for item in data:
        print(item)
        filename = item['similar']
        filepath = os.path.join('./app/images/', filename+".png")

        try:
            with open(filepath, "rb") as image_file:
                image_base64 = base64.b64encode(image_file.read()).decode('utf-8')
                results.append({'similar': image_base64, 'gemini': item['gemini']})
        except FileNotFoundError:
            print(f"Error: Image file not found: {filepath}")
            return None  # Indicate failure
        except Exception as e:
            print(f"An error occurred processing {filename}: {e}")
            return None # Indicate failure
    
    return results

    


