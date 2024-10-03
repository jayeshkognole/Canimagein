import os

from peewee import *

db_file_path = os.path.join('data', 'metadata', 'metadata.sqlite')
fresh_deployment = not os.path.exists(db_file_path)
db = None


def connect():
    _db = SqliteDatabase(db_file_path)
    _db.connect()
    return _db


def initialize():
    global db
    db = connect()


initialize()


class BaseModel(Model):
    class Meta:
        database = db


class Patient(BaseModel):
    patient_id = TextField(primary_key=True)
    name = CharField()
    email = CharField(unique=True, null=True)
    address = TextField(null=True)
    phone_no = CharField(null=True)
    dob = DateField(null=True)
    gender = CharField(null=True)
    ehr_prediction = TextField(null=True)
    radiology_prediction = TextField(null=True)


class Conversation(BaseModel):
    conversation_id = AutoField(primary_key=True)
    patient = ForeignKeyField(Patient, backref='conversations')
    transcript = TextField(null=True)
    transcript_english = TextField(null=True)
    voice_path = TextField(null=True)
    date = DateField(null=True)
    title = TextField(null=False)


class EHR(BaseModel):
    ehr_id = AutoField(primary_key=True)
    patient = ForeignKeyField(Patient, backref='ehr')
    past_medical_history = TextField(null=True)
    phy_examination = TextField(null=True)
    assessment = TextField(null=True)
    current_medical_issue = TextField(null=True)
    last_admitted_date = DateField(null=True)
    last_admitted_summary = TextField(null=True)
    conversation_id = ForeignKeyField(Conversation, backref='ehr_entries', null=True)  # Added conversation_id
    summary = TextField(null=True)
    summary_english = TextField(null=True)
    similar_ehr = TextField(null=True)


class Radiology(BaseModel):
    image_name = TextField(null=True, primary_key=True)
    patient = ForeignKeyField(Patient, backref='radiology_reports')
    ml_output = TextField(null=True)  # Store ML output for X-ray
    paligemma_output = TextField(null=True)  # Store Paigamma output
    gemini_output = TextField(null=True)  # Store Gamma output
    similar_radiology_id = TextField(null=True)  # Store similar x-ray path
