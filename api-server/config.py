import configparser
import copy
import logging
import os

logger = logging.getLogger(__name__)


def __load_config():
    logger.info('Loading config')
    _cfg = configparser.ConfigParser(interpolation=None)
    _cfg.read(os.path.join('data', 'config', 'config.ini'))
    _cfg_dict = {s: dict(_cfg.items(s)) for s in _cfg.sections()}
    return _cfg_dict



__config = None


def get_config():
    global __config
    if __config is None:
        __config = __load_config()
    return copy.copy(__config)

