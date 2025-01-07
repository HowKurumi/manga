from flask import Flask, request, jsonify
from bs4 import BeautifulSoup
import requests

app = Flask(__name__)

@app.route('/get-image', methods=['POST'])
def get_image():
    try:
        data = request.json
        url = data.get('url')
        class_name = data.get('class_name')

        if not url or not class_name:
            return jsonify({"error": "Missing URL or class name"}), 400

        response = requests.get(url)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')

        img_tag = soup.find('img', class_=class_name)
        if img_tag and img_tag.get('src'):
            return jsonify({"image_url": img_tag['src']}), 200
        else:
            return jsonify({"error": "Image not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
