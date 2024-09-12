from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import os

app = Flask(__name__)

# Set up CORS
CORS(app)

# Set up your API key here or use environment variables
api_key = 'AIzaSyAeAW3HmkHJC_99GEF4SKR190bBCKRYmbc'
genai.configure(api_key=api_key)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/generate', methods=['POST'])
def generate():
    content_request = request.json
    topic = content_request.get('topic', '')
    keywords = content_request.get('keywords', '')
    terminology = content_request.get('terminology', '')
    writing_style = content_request.get('writing_style', '')

    # Generate a prompt based on the inputs
    prompt = (f"Write a story on the topic of '{topic}'. "
              f"Include the following keywords: {keywords}. "
              f"Use the following terminology: {terminology}. "
              f"Write in the style of {writing_style}.")

    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(prompt)

    return jsonify({'text': response.text})


if __name__ == '__main__':
    app.run(debug=True)