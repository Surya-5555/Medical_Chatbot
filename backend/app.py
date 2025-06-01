from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend connection

genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-1.5-flash")

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json.get('message')
    
    prompt = f"""
    You are a compassionate medical assistant named "Dr. Sree".
    Provide friendly, helpful, and evidence-based health information.
    Always recommend consulting a doctor for serious concerns.

    Patient says: "{user_input}"
    """
    
    response = model.generate_content(
        prompt,
        generation_config=genai.types.GenerationConfig(
            temperature=0.7,
            max_output_tokens=300
        )
    )
    
    return jsonify({
        "response": response.text
    })

if __name__ == '__main__':
    app.run(port=5000, debug=True)