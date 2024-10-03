# CanImageIN Backend Server

## Steps to run this server

### Configure

Update `data/config/config.ini` to update host and port if required.

Update data/config/creds.json with proper credentials to access GCP services.
Credentials can be found at ~/.config/gcloud/application_default_credentials.json on linux machine.

### Install required packages

Run following commands from home directory of this application to create python virtual environment with required
libraries.

```commandline
python3.11 -m venv venv
source venv/bin/activate
pip install -r requirements.txt 
pip install lib/imaging-research/cxr-foundation/
```

### Run the server

Run following commands from home directory of this application.

```commandline
source venv/bin/activate
python app.py
```