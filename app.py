import json
from flask import (
    Flask,
    Response,
    request,
    send_from_directory
)
from flask_cors import CORS
from google.cloud import documentai


app = Flask(__name__)
CORS(app)


PROJECT_ID = "receipt-app-497806"
LOCATION = "us"
PROCESSOR_ID = "261df60a260a2866"


# ========================================
# OCR利用回数
# ========================================

ocr_count = 0
OCR_LIMIT = 100


# ========================================
# OCR
# ========================================

@app.route("/ocr", methods=["GET", "POST"])
def ocr():
    global ocr_count

    # 100回に達したら停止
    if ocr_count >= OCR_LIMIT:
        return Response(
            json.dumps(
                {
                    "error": "OCRの利用上限100回に達しました"
                },
                ensure_ascii=False
            ),
            status=429,
            mimetype="application/json"
        )

    client = (
        documentai.DocumentProcessorServiceClient()
    )

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

    # Document AIへ送信
    result = client.process_document(
        request=request_ai
    )

    # ここまで成功したら1回カウント
    ocr_count += 1

    print(
        f"OCR利用回数：{ocr_count}/{OCR_LIMIT}"
    )

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
            data["items"].append(
                entity.mention_text
            )

    return Response(
        json.dumps(
            data,
            ensure_ascii=False
        ),
        mimetype="application/json"
    )


# ========================================
# ログイン画面
# ========================================

@app.route("/")
def home():
    return send_from_directory(
        ".",
        "login.html"
    )


# ========================================
# HTML / CSS / JS / 画像など
# ========================================

@app.route("/<path:path>")
def static_files(path):

    return send_from_directory(
        ".",
        path
    )


# ========================================
# Flask起動
# ========================================

if __name__ == "__main__":
    app.run(
        debug=True
    )