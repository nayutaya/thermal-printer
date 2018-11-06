
import datetime
import tempfile

import flask
import flask_cors

import printer.mock
import printer.serial

VERSION = "0.0.0"

app = flask.Flask(__name__)
flask_cors.CORS(app)

printer = printer.mock.MockPrinter()
#printer = printer.serial.SerialPrinter(device="/dev/ttyPRINTER")
printer.print_text("Printing Service\n")
printer.print_text("v" + VERSION)
printer.cut_paper()

@app.route("/")
def get_root():
    return flask.jsonify({
        "time": datetime.datetime.now().isoformat(),
    })

@app.route("/print", methods=["POST"])
def post_print():
    assert flask.request.method == "POST"
    assert flask.request.headers.get("content-type") == "image/png"

    with tempfile.NamedTemporaryFile(suffix=".png") as file:
        file.write(flask.request.data)
        file.seek(0)
        printer.print_image(file)
        printer.cut_paper()

    return flask.jsonify({
        "time": datetime.datetime.now().isoformat(),
    })
