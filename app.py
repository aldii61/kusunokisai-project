import json
from flask import Flask, Response, request
from flask_cors import CORS
from google.cloud import documentai

app = Flask(__name__)
CORS(app)

PROJECT_ID = "receipt-app-497806"
LOCATION = "us"
PROCESSOR_ID = "261df60a260a2866"

@app.route("/ocr", methods=["GET", "POST"])
def ocr():

    client = documentai.DocumentProcessorServiceClient()

    name = client.processor_path(
        PROJECT_ID,
        LOCATION,
        PROCESSOR_ID
    )

    if request.method == "POST":
        image_file = request.files["image"]
        image_content = image_file.read()
    else:
        with open("test.jpg", "rb") as image:
            image_content = image.read()

    raw_document = documentai.RawDocument(
        content=image_content,
        mime_type="image/jpeg"
    )

    request_ai = documentai.ProcessRequest(
        name=name,
        raw_document=raw_document
    )

    result = client.process_document(request=request_ai)

    data = {
        "date": "",
        "amount": "",
        "memo": "",
        "items": []
    }

    for entity in result.document.entities:

        if entity.type_ == "receipt_date":
            data["date"] = entity.mention_text

        if entity.type_ == "total_amount":
            data["amount"] = entity.mention_text

        if entity.type_ == "supplier_name":
            data["memo"] = entity.mention_text

        if entity.type_ == "line_item":
            data["items"].append(entity.mention_text)

    return Response(
        json.dumps(data, ensure_ascii=False),
        mimetype="application/json"
    )

@app.route("/")
def home():
    return "Flask OK！ /ocr にアクセスしてね"

if __name__ == "__main__":
    app.run(debug=True)