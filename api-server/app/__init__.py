import logging
from logging import config

import yaml

# -------------- Setup logging --------------

with open('logging.conf') as f:
    log_config = yaml.load(f.read(), Loader=yaml.FullLoader)
    logging.config.dictConfig(log_config)

logger = logging.getLogger(__name__)

from flask import Flask
from flask_cors import CORS


def init_app():
    # -------------- Setup App Config --------------
    from config import get_config
    app_config = get_config()
    url_prefix = app_config['app']['url_prefix']

    app = Flask(__name__, static_folder='../data', static_url_path='/assets')
    app.secret_key = 'example'
    app.config['SESSION_TYPE'] = 'filesystem'

    CORS(app)

    # -------------- Register Blueprints --------------

    from app.api.test import test_bp
    from app.api.ehr import ehr_bp
    from app.api.radiology import radiology_bp
    for blueprint in [test_bp, ehr_bp, radiology_bp]:
        logger.debug(f'Registering blueprint: {blueprint}')
        if url_prefix:
            blueprint.url_prefix = f'{url_prefix}{blueprint.url_prefix}'
            print(blueprint.url_prefix)
        app.register_blueprint(blueprint)

    # -------------- Register Error Handler --------------

    from app.api.handlers import handle_api_errors
    from werkzeug.exceptions import HTTPException

    app.register_error_handler(HTTPException, handle_api_errors)

    return app
