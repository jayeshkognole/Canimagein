import google.generativeai as genai
import os
import app.constant as constant



# genai.configure(api_key=os.getenv('GENAI_KEY'))
genai.configure(api_key="")

class GeminiAPI:

    def __init__(self, model_name: str, max_output_tokens: int = constant.MAX_OUTPUT_TOKEN, temperature: float = constant.TEMPERATURE):
        self.model = genai.GenerativeModel(model_name)
        self.max_output_tokens = max_output_tokens
        self.temperature = temperature

    def generate_content(self, data):
        generation_config = genai.types.GenerationConfig(max_output_tokens=self.max_output_tokens,
                                                             temperature=self.temperature)
        res = self.model.generate_content(data, generation_config=generation_config)
        res.resolve()
        return res.text

class GeminiAPIText:

    def __init__(self, model_name: str, max_output_tokens: int = constant.MAX_OUTPUT_TOKEN,
                     temperature: float = constant.TEMPERATURE):
            self.model = genai.GenerativeModel(model_name)
            self.max_output_tokens = max_output_tokens
            self.temperature = temperature

    def generate_text(self, data):
        generation_config = genai.types.GenerationConfig(max_output_tokens=self.max_output_tokens, temperature=self.temperature)
        res = self.model.generate_content(data, generation_config=generation_config)
        return res.text

class GeminiAPIFlash:

    def __init__(self, model_name: str, max_output_tokens: int = constant.MAX_OUTPUT_TOKEN,
                     temperature: float = constant.TEMPERATURE):
        self.model = genai.GenerativeModel(model_name)
        self.max_output_tokens = max_output_tokens
        self.temperature = temperature

    def generate_transcript(self, data,file):
        audio_file=genai.upload_file(path=file)
        generation_config = genai.types.GenerationConfig(max_output_tokens=self.max_output_tokens, temperature=self.temperature)
        res = self.model.generate_content([data,audio_file], generation_config=generation_config)
        genai.delete_file(audio_file.name)
        return res.text