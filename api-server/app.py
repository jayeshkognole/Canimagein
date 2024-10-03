from app import init_app

if __name__ == "__main__":
    app = init_app()

    from config import get_config

    app_config = get_config()
    APP_HOST = app_config['app']['host']
    APP_PORT = app_config['app']['port']
    app.run(host=APP_HOST, port=APP_PORT, debug=False)
