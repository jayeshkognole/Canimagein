import datetime
from datetime import date, timedelta

from peewee import ModelSelect
from playhouse.shortcuts import model_to_dict
import json
from app.storage.schema import Patient, Conversation, EHR, Radiology, db, fresh_deployment


def create_database(_db=None):
    db.create_tables([
        Patient, Conversation, EHR, Radiology
    ])


def convert(func):
    def wrapper(*args, **kwargs):
        result_conversion = 'to_dict'
        to_dict = result_conversion in kwargs and kwargs[result_conversion]
        if result_conversion in kwargs:
            del kwargs[result_conversion]
        result = func(*args, **kwargs)
        try:
            if to_dict:
                if isinstance(result, ModelSelect) or isinstance(result, list):
                    return [model_to_dict(item) for item in result]
                else:
                    return model_to_dict(result)
            else:
                return result
        except Exception as e:
            return result

    return wrapper


def insert_dummy():
    try:
        patient = Patient.create(
            name="Hari Singh",
            email="hari.singh@example.com",
            address="123 Main St, Anytown",
            phone_no="555-123-4567",
            dob=date.today() - timedelta(days=58 * 365.25),
            gender="Male",
            ehr_prediction="low",
            radiology_prediction=""
        )
        conversation = Conversation.create(
            patient=patient,
            transcript="Patient complaining of persistent cough, shortness of breath, and weight loss.",
            voice_path="/data/Images/recording.wav",
            dob=date.today(),
            title="Summary"
        )
        conversation1 = Conversation.create(
            patient=patient,
            transcript="Patient complaining of persistent cough, shortness of breath, and weight loss.",
            voice_path="/data/Images/recording.wav",
            dob=date.today(),
            title=str(date.today())
        )
        ehr = EHR.create(
            patient=patient,
            past_medical_history="History of hypertension, controlled with medication.",
            phy_examination="Lungs clear to auscultation. Heart rate regular.",
            assessment="Possible respiratory infection. Recommend chest X-ray.",
            current_medical_issue="Persistent cough, shortness of breath, weight loss",
            last_admitted_date=date.today() - timedelta(days=365),
            last_admitted_summary="Admitted for observation due to high blood pressure.",
            conversation_id=conversation,  # Assign the conversation ID
            summary="Patient presented with cough and shortness of breath.",  # Add a summary
            similar_ehr="[]"
        )
        ehr = EHR.create(
            patient=patient,
            past_medical_history="",
            phy_examination="",
            assessment="",
            current_medical_issue="",
            last_admitted_date=date.today() - timedelta(days=365),
            last_admitted_summary="",
            conversation_id=conversation1,  # Assign the conversation ID
            summary="",  # Add a summary
            similar_ehr='["1", "2"]'
        )
        radiology = Radiology.create(
            patient=patient,
            image_name="00000103_010",
            ml_output='{"diagnosis": "Consolidation", "confidence": 0.95,"cxr":"00000103_010_cxr.png","heat_map":"00000103_010_heat_map.png"}',  # Store as JSON string
            paligemma_output='{"finetuned": "Consolidation is present due to an underlying infectious or inflammatory process in the lung parenchyma.", "base": "Image shows a xray of Lung"}',  # Store as JSON string
            gemini_output='This patient presents with concerning symptoms, including persistent cough, shortness of breath, and weight loss, which could indicate a serious underlying condition. The chest x-ray shows signs of consolidation likely due to infection, the constellation of symptoms, particularly weight loss, warrants further investigation to rule out malignancy. The patients history of hypertension is a separate issue but could be a contributing factor to their overall health status. Further evaluation and imaging, such as a CT scan, may be necessary.', 
            similar_xray_path='["/data/Images/xray1.png", "/data/Images/xray2.png"]'  # Store as JSON string
        )

    except Exception as e:
        print(f"Error creating dummy data: {e}")
        print("inserted successfully ")

def add_data():
    try:
        with db.atomic():
            # Add Patient record
            patient = Patient.create(
                patient_id="DM001-2024-045",
                name="Hari Singh",
                email="hari.singh@gmail.com",
                address="602,Pawan C, DSK vishwa",
                phone_no="9527449637",
                dob=datetime.date(1980, 1, 15),
                gender="Male",
                ehr_prediction="high",
                radiology_prediction="Some radiology prediction"

            )

            patient1 = Patient.create(
                patient_id="DM001-2024-047",
                name="John Doe",
                email="john.doe@gmail.com",
                address="Dhayari,pune",
                phone_no="8308845564",
                dob=datetime.date(1987, 1, 15),
                gender="Male",
                ehr_prediction="low",
                radiology_prediction="Some radiology prediction"

            )

            patient2 = Patient.create(
                patient_id="DM001-2024-046",
                name="John snow",
                email="john.snow@gmail.com",
                address="123 Main St",
                phone_no="555-1234",
                dob=datetime.date(1980, 1, 15),
                gender="Male",
                ehr_prediction="Some EHR prediction",
                radiology_prediction="Some radiology prediction"

            )

            # Add Conversation record
            conversation = Conversation.create(
                patient=patient,
                transcript="नमस्ते मैं आपकी क्या मदद कर सकती हूं? नमस्ते डॉक्टर मुझे पिछले कुछ दिनों से सीने में दर्द हो रहा है और मैंने सोचा कि डॉक्टर के पास जाना अच्छा होगा। आपका नाम बताइए? मेरा नाम हरि सिंह है। आपकी उम्र क्या है? मैं 57 साल का हूं। आपके लक्षणों के बारे में मुझे और बताइए आपको पहली बार सीने में दर्द कब हुआ और कितनी बार महसूस हुआ? दर्द लगभग तीन दिन पहले शुरू हुआ और यह आता जाता रहता है। यह एक सुस्त दर्द जैसा लगता है और यह ज्यादातर मेरी छाती के बीच में होता है। कभी-कभी यह मेरी बाहों में और कंधों तक फैल जाता है। आपको सीने में दर्द के साथ सांस लेने में कोई तकलीफ या फिर चक्कर आना ऐसा अनुभव हुआ है? हां मुझे सांस लेने में तकलीफ महसूस हो रही है और पिछले कुछ दिनों से और या फिर हफ्तों से मेरा वजन घट भी रहा है। आप कोई ब्लड प्रेशर की दवाई ले रहे हो? हां मैं लिसिनोप्रिल नाम की एक दवा ले रहा हूं। क्या आप धूम्रपान करते हो? जी हां डॉक्टर मैं लगभग 15 सालों से धूम्रपान कर रहा हूं। धूम्रपान करने से हृदय रोग का खतरा बढ़ सकता है जो आपके सीने में दर्द का संभावित कारण हो सकता है। आपको पहले कभी दिल की कोई समस्या हुई है? नहीं जहां तक मुझे याद है। ठीक है आपके लक्षणों और चिकित्सा के इतिहास के आधार पर मैं आपकी स्थिति का बेहतर निदान करने से करने के लिए आपको कुछ और प्रश्न पूछना चाहूंगी। क्या आपको कोई बुखार या ठंड लगना हुआ है? नहीं मुझे ऐसा कुछ हुआ नहीं है। आपको कोई संक्रमण जैसी बीमारी हुई है जैसे कि सर्दी या फिर फ्लू? नहीं डॉक्टर। आपको कुछ फेफड़ों से जुड़ी समस्या हुई है जैसे कि अस्थमा और सीओपीडी? नहीं मुझे नहीं हुआ। ठीक है आइए आपकी छाती का जांच करते हैं। कृपया गहरी सांस लीजिए और कुछ सेकंड तक रोक के रखिए। ठीक है अब आप सांस छोड़ सकते हो। आप आप मुझे खांस के दिखाइए। आपके फेफड़े तो साफ है और आपकी हृदय की गति भी सामान्य है। आप आपने मुझे जो बताया है और मैंने जो जांच किया है उस आधार पर मुझे लगता है कि किसी भी समस्या को दूर करने के लिए आपकी छाती का एक्सरे करवाना अच्छा होगा। आगे बढ़ने से पहले मैं कुछ और सवाल आपको पूछना चाहूंगी। क्या आपको अपनी गर्दन या फिर जबड़े में कोई दर्द हो रहा है या फिर कोई बेचैनी हो रही है? नहीं मुझे ऐसा कुछ नहीं हुआ है। क्या आपको एसिडिटी या हार्टबर्न जैसी कोई समस्या हुई है? नहीं डॉक्टर। क्या आपको हाल हाल में सामान्य से ज्यादा थकान महसूस हो रही है? हां मुझे जरा सामान्य से ज्यादा थकान महसूस हो रही है। ठीक है हम इस सारी जानकारी को ध्यान में रखे हुए आपके लक्षणों की जड़ तक पहुंचने की कोशिश करेंगे। मैं छाती का एक्सरे करने के लिए आपको रेफरल लिखूंगा और मैं हम वहां से आगे बढ़ सकते हैं। धन्यवाद। ठीक है डॉक्टर धन्यवाद शुक्रिया।",
                transcript_english="Namaste. How can I help you? Namaste doctor. I've been having chest pain for the past few days, and I thought it would be good to see a doctor. What is your name? My name is Hari Singh. What is your age? I am 57 years old. Tell me more about your symptoms. When did you first experience chest pain, and how many times have you felt it? The pain started about three days ago, and it comes and goes. It feels like a dull ache, and it's mostly in the middle of my chest. Sometimes it spreads to my arms and shoulders. Have you experienced any breathing difficulties or dizziness along with the chest pain? Yes, I'm experiencing breathing difficulties, and for the past few days or weeks, I've also been losing weight. Are you taking any blood pressure medication? Yes, I'm taking a medication called Lisinopril. Do you smoke? Yes, doctor. I've been smoking for about 15 years. Smoking can increase the risk of heart disease, which could be a possible cause of your chest pain. Have you ever had any heart problems before? No, not that I remember. Okay. Based on your symptoms and medical history, I would like to ask you a few more questions to better diagnose your condition. Have you had any fever or chills? No, I haven't. Have you had any infectious illnesses like a cold or the flu? No, doctor. Have you had any lung problems like asthma or COPD? No, I haven't. Okay. Let's examine your chest. Please take a deep breath and hold it for a few seconds. Okay. Now you can exhale. Now, cough for me. Your lungs are clear, and your heart rate is normal. Based on what you've told me and my examination, I think it would be best to get a chest X-ray to rule out any problems. Before we proceed, I'd like to ask a few more questions. Are you experiencing any pain or discomfort in your neck or jaw? No, I haven't. Have you experienced any acidity or heartburn? No, doctor. Have you been experiencing more fatigue than usual lately? Yes, I've been feeling a little more tired than usual. Okay. Keeping all this information in mind, we'll try to get to the root of your symptoms. I'll write you a referral for a chest X-ray, and we can proceed from there. Thank you. Okay, doctor. Thank you. Thank you.",
                voice_path="data/EHR_Voicenote.mp3",
                date=datetime.date.today(),
                title="summary"
            )

            # Add EHR record
            ehr = EHR.create(
                patient=patient,
                past_medical_history="Takes Lisinopril for blood pressure.  Smoker for 15 years. No known prior heart problems, lung problems (asthma/COPD), infectious illnesses, or fever/chills. No neck/jaw pain, acidity, or heartburn.",
                phy_examination="Physical examination findings",
                assessment="Lungs clear, heart rate normal.Assessment",
                current_medical_issue="Chest pain, shortness of breath, weight loss, fatigue.  Possible heart issues. Chest X-ray recommended to rule out problems.",
                last_admitted_date=datetime.date(2023, 10, 26),
                last_admitted_summary="Last admission summary",
                conversation_id=conversation,  # Link to the conversation
                summary="57 वर्षीय हरि सिंह को पिछले तीन दिनों से सीने में दर्द हो रहा है, जो उनकी छाती के बीच में केंद्रित है लेकिन कभी-कभी उनकी बाहों और कंधों तक फैल जाता है। उन्हें सांस लेने में भी तकलीफ हो रही है और उनका वजन पिछले कुछ हफ़्तों से कम हो रहा है। वे 15 सालों से धूम्रपान करते हैं और लिसिनोप्रिल लेते हैं। डॉक्टर ने उनकी छाती की जांच की और उनके फेफड़े साफ़ पाए गए और हृदय गति सामान्य थी। डॉक्टर ने छाती का एक्स-रे करवाने की सलाह दी।",
                summary_english="Chest pain for the past three days, intermittent, dull ache in the center of the chest radiating to arms and shoulders. Accompanied by shortness of breath, weight loss (past few days/weeks), and increased fatigue.",
                similar_ehr="Similar EHR ID"
            )

            # Add Radiology record
            radiology = Radiology.create(
                image_name="00000103_010", 
                patient=patient,
                ml_output="""{"diagnosis": "Consolidation", "confidence": 0.95,"cxr":"00000103_010_cxr.png","heat_map":"00000103_010_heat_map.png"}""",
                paligemma_output="""{"finetuned": "Consolidation is present due to an underlying infectious or inflammatory process in the lung parenchyma.", "base": "Image shows a xray of Lung"}""",
                gemini_output="This patient presents with concerning symptoms, including persistent cough, shortness of breath, and weight loss, which could indicate a serious underlying condition. The chest x-ray shows signs of consolidation likely due to infection, the constellation of symptoms, particularly weight loss, warrants further investigation to rule out malignancy. The patients history of hypertension is a separate issue but could be a contributing factor to their overall health status. Further evaluation and imaging, such as a CT scan, may be necessary.",
                similar_radiology_id="""[{"similar":"00017324_012","gemini":"Both the radiologist-uploaded CXR and the derived similar X-ray from the database demonstrate bilateral pulmonary consolidations. However, subtle differences exist in the distribution and density of the opacities. The uploaded CXR shows slightly more prominent consolidation in the right lung base compared to the database image, which exhibits a more even distribution of consolidation bilaterally. The precise location and extent of the consolidation may vary due to factors such as imaging technique, patient positioning, and the natural progression of the underlying pathology. Further analysis, including comparison with prior imaging studies and clinical information, is necessary to determine the significance of these subtle differences."},{"similar":"00006008_003","gemini":"Both the uploaded CXR and the retrieved similar X-ray demonstrate multifocal airspace opacities consistent with pulmonary consolidation. The distribution appears predominantly bilateral and peripheral in both images, although slightly more pronounced on the right in the uploaded CXR. A key difference is the presence of a metallic port device, likely a port-a-cath, overlying the left upper lung field in the retrieved X-ray, which is absent in the uploaded image. This suggests different patient histories and potential underlying etiologies for the observed consolidation. While the overall pattern of consolidation is similar, the presence of the port raises the possibility of treatment-related or malignancy-associated lung changes in the retrieved image, a consideration not present in the uploaded CXR. Further clinical correlation and potentially additional imaging would be necessary for definitive diagnosis in both cases."},{"similar":"00022235_008","gemini":"Both the uploaded CXR and the retrieved similar CXR demonstrate diffuse, hazy opacities predominantly in the bilateral mid and lower lung zones, suggesting airspace disease. However, the uploaded CXR exhibits more pronounced patchy consolidation in the left mid-lung zone compared to the retrieved image, which shows a more homogenous haziness. While both images could represent a variety of processes including infection (e.g., pneumonia) or edema, the focal consolidation in the uploaded CXR might raise the suspicion for a multifocal process or a superimposed bacterial infection on a background of diffuse lung disease. Further clinical correlation is necessary to determine the etiology."}]"""
            )

            print("Records added successfully!")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
    pass    


if fresh_deployment:
    create_database()
    # insert_dummy()
    add_data()


@convert
def get_patient_ehr_history_dao(patient_id=None):
    try:
        patient = Patient.get(Patient.patient_id == patient_id)  # Get the patient
        conversations = (Conversation.select(Conversation.conversation_id, Conversation.title).where(
            Conversation.patient == patient))
        return [{'conversation_id': conv.conversation_id, 'title': conv.title} for conv in conversations]
    except Patient.DoesNotExist:
        return []


def add_radiology_dao(image_name, patient, ml_output, paligemma_output, gemini_output, similar_radiology_id):
    radiology = Radiology.create(
        image_name=image_name,
        patient=patient,
        ml_output=ml_output,
        paligemma_output=paligemma_output,
        gemini_output=gemini_output,
        similar_radiology_id=similar_radiology_id
    )
    return radiology







@convert
def get_radiology_dao(image_name):
    try:
        radiology_record = Radiology.get(Radiology.image_name == image_name)  # Get the record
        return radiology_record
    except Patient.DoesNotExist:
        return None


@convert
def get_radiology_daos(patient_id):
    try:
        radiology_records = Radiology.get(Radiology.patient == patient_id)  # Get the record
        return radiology_records
    except Patient.DoesNotExist:
        return None


@convert
def get_patient_ehr_details_dao(conversation_id=None):
    try:
        ehr_entries = EHR.select(EHR, Patient, Conversation
                                 ).join(Patient).switch(EHR).join(Conversation).where(
            Conversation.conversation_id == conversation_id
        )

        if not ehr_entries:
            return []  # Return empty list if no matching EHR entries found

        result = []

        # Patient Data
        patient_data = []
        for ehr_entry in ehr_entries:  # Potentially multiple EHR entries per conversation
            patient = ehr_entry.patient
            ehr_prediction = patient.ehr_prediction
            # Calculate age if DOB is available
            age = None
            if patient.dob:
                today = date.today()
                age = today.year - patient.dob.year - ((today.month, today.day) < (patient.dob.month, patient.dob.day))

            patient_data.append({
                "id": patient.patient_id,
                "name": patient.name,
                "email": patient.email,
                "age": age,  # Include age
                "address": patient.address,
                "phone_no": patient.phone_no,
                "gender": patient.gender,
            })

        # Ensure only unique patient data is included (if a patient has multiple EHR entries for a conversation)
        seen_patient_ids = set()
        unique_patient_data = []
        for patient in patient_data:
            if patient['id'] not in seen_patient_ids:
                unique_patient_data.append(patient)
                seen_patient_ids.add(patient['id'])

        result.append({
            "table": "Patient",
            "columns": ["id", "name", "email", "age", "address", "phone_no", "gender"],
            "rows": unique_patient_data,
            "ehr_prediction": ehr_prediction
        })
        # EHR Data
        ehr_data = []
        ehr_summary =ehr_summary_english= ""

        for ehr_entry in ehr_entries:  # Handle multiple EHR entries, if any
            ehr_data.append({
                # "id": ehr_entry.ehr_id,
                "past_medical_history": ehr_entry.past_medical_history,
                "physical_examination": ehr_entry.phy_examination,
                "assessment": ehr_entry.assessment,
                "current_medical_issue": ehr_entry.current_medical_issue,
                "last_admitted_date": ehr_entry.last_admitted_date,
                "last_admitted_summary": ehr_entry.last_admitted_summary,
                # "summary": ehr_entry.summary,
                # "conversation_id": ehr_entry.conversation_id.conversation_id
            })
            ehr_summary += ehr_entry.summary if ehr_entry.summary else ""
            ehr_summary_english += ehr_entry.summary_english if ehr_entry.summary_english else ""
            ehr_similar = ehr_entry.similar_ehr

        result.append({
            "table": "EHR",

            "columns": ["past_medical_history", "physical_examination", "assessment", "current_medical_issue",
                        "last_admitted_date", "last_admitted_summary"],
            "rows": ehr_data,
            "summary": ehr_summary,
            "similar_ehr": ehr_similar,
            "summary_english":ehr_summary_english
        })
        return result
    except Exception as e:
        # Handle potential exceptions (e.g., database errors) appropriately
        print(f"Error retrieving data: {e}")
        return []  # Return an empty list in case of error


@convert
def add_conversaion(patient_id=None, transcript=None, file_path=None, transcript_english=None):
    try:
        patient = Patient.get(Patient.patient_id == patient_id)  # Get the patient object
        new_conversation = Conversation.create(
            patient=patient,
            transcript=transcript,
            voice_path=file_path,
            date=datetime.date.today(),
            title=datetime.date.today(),
            transcript_english=transcript_english
        )
        return new_conversation
    except Exception as e:
        print(f"Error retrieving data: {e}")
        return {}


@convert
def add_ehr(patient_id=None, conversation=None, past_medical_history=None, phy_examination=None, assessment=None,
            current_medical_issue=None, last_admitted_date=None, last_admitted_summary=None, summary=None,
            summary_english=None):
    try:
        patient = Patient.get(Patient.patient_id == patient_id)  # Get the patient object
        new_ehr_entry = EHR.create(
            patient=patient,
            conversation_id=conversation,
            past_medical_history=past_medical_history,
            phy_examination=phy_examination,
            assessment=assessment,
            current_medical_issue=current_medical_issue,
            last_admitted_date=last_admitted_date,
            last_admitted_summary=last_admitted_summary,
            summary=summary,
            summary_english=summary_english,
        )
        return new_ehr_entry
    except Exception as e:
        print(f"Error retrieving data: {e}")
        return {}


@convert
def get_summary_ehr(patient_id=None, conversation_id=None):
    try:
        ehr_data = []
        for ehr_entry in EHR.select().where(EHR.patient_id == patient_id).where(EHR.conversation_id == conversation_id):
            ehr_dict = {
                "past_medical_history": ehr_entry.past_medical_history,
                "phy_examination": ehr_entry.phy_examination,
                "assessment": ehr_entry.assessment,
                "current_medical_issue": ehr_entry.current_medical_issue,
                "last_admitted_date": ehr_entry.last_admitted_date,
                "last_admitted_summary": ehr_entry.last_admitted_summary,
                "summary": ehr_entry.summary,
                "summary_english": ehr_entry.summary_english,
                "similar_ehr": ehr_entry.similar_ehr,
            }
            ehr_data.append(ehr_dict)
        return ehr_data
    except Exception as e:
        print(f"Error retrieving data: {e}")
        return {}


@convert
def update_summary_ehr(patient_id=None, conversation_id=None, updates=None):
    try:
        query = EHR.update(**updates).where((EHR.patient == patient_id) & (EHR.conversation_id == conversation_id))
        updated_count = query.execute()
        return updated_count
    except Exception as e:
        print(f"Error retrieving data: {e}")
        return {}


@convert
def get_model_output(image_name=None, patient_id=None):
    try:
        if image_name is None:
            radiology_report = Radiology.select(
                Radiology.ml_output,
                Radiology.paligemma_output,
                Radiology.gemini_output,
                Radiology.image_name
            ).where(
                Radiology.patient == patient_id,
            ).limit(1).get()
            return {
                'ml_output': radiology_report.ml_output,
                'paligemma_output': radiology_report.paligemma_output,
                'gemini_output': radiology_report.gemini_output,
                'image_name':radiology_report.image_name+".png"
            }
        radiology_report = Radiology.select(
            Radiology.ml_output,
            Radiology.paligemma_output,
            Radiology.gemini_output,
            Radiology.image_name
        ).where(
            Radiology.patient == patient_id,
            Radiology.image_name == image_name
        ).get()

        return {
            'ml_output': radiology_report.ml_output,
            'paigamma_output': radiology_report.paligemma_output,
            'gemini_output': radiology_report.gemini_output,
            'image_name':radiology_report.image_name+".png"
        }
    except Exception as e:
        print(f"Error retrieving data: {e}")
        return None

@convert
def get_records(patient_id):
    try:
        patient = Patient.get(Patient.patient_id == patient_id)
    except Patient.DoesNotExist:
        return None  # Or handle the case where the patient doesn't exist


    results = {
        "patient": patient,
        "conversation": Conversation.select().where(Conversation.patient == patient).first(),
        "ehr": EHR.select().where(EHR.patient == patient).first(),
        "radiology": Radiology.select().where(Radiology.patient == patient).first(),  # Corrected table name
    }

    return results

@convert
def get_similar_readiology(patient_id=None):
    try:
        radiology_reports = (Radiology
                             .select(Radiology.similar_radiology_id)
                             .where(Radiology.patient == patient_id)
                             )

        for report in radiology_reports:
            similar_ids_str = report.similar_radiology_id
            if similar_ids_str:  # Handle cases where the field might be NULL
                try:
                    similar_ids_list = json.loads(similar_ids_str)
                    #Now similar_ids_list is a list of dictionaries.
                    print(similar_ids_list)
                    return similar_ids_list #Return the parsed list
                except json.JSONDecodeError as e:
                    print(f"Error decoding JSON: {e}")
                    return None # or handle the error appropriately.  e.g., raise the exception.
            else:
                return [] #Return an empty list if the field is null

    except Radiology.DoesNotExist:
        print(f"No radiology reports found for patient ID: {patient_id}")
        return None #or handle the DoesNotExist exception
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return None #or handle other exceptions