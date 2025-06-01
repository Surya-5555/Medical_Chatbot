import os
import google.generativeai as genai
from google.generativeai import types
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

def chat_with_gemini():
    # ✅ Configure the Gemini API key from environment variable
    genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))

    # ✅ Use Gemini 1.5 Flash model
    model = genai.GenerativeModel("gemini-1.5-flash")

    print("🩺 Dr. Sree Medical Chatbot (type 'exit' to quit)\n")

    while True:
        # Prompt user for input
        user_input = input("You (Patient): ")

        # Exit condition
        if user_input.lower() in ["exit", "quit"]:
            print("👋 Stay healthy! Goodbye!")
            break

        # Medical system prompt to simulate context
        prompt = f"""
        You are a compassionate and knowledgeable medical assistant named "Dr. Sree".
        Your job is to provide friendly, helpful, and evidence-based information on health-related concerns.
        You can explain symptoms, causes, prevention, and general care tips for common health issues.
        Always encourage users to consult a real doctor for serious or persistent problems.

        Patient says: "{user_input}"
        """

        # Generate response from Gemini
        responses = model.generate_content(
            prompt,
            generation_config=types.GenerationConfig(
                temperature=0.7,
                top_p=0.9,
                top_k=40,
                max_output_tokens=300,
            ),
            stream=True,  # stream the response for natural feel
        )

        print("Dr. Sree : ", end="")

        # Print streaming response
        for response in responses:
            print(response.text, end="", flush=True)

        print("\n")  # new line after response

if __name__ == "__main__":
    chat_with_gemini()
