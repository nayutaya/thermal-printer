
import datetime
import os
import tempfile

import flask
import flask_cors

import printer.mock
import printer.serial

SERVICE_NAME    = "Printing Service"
SERVICE_VERSION = "1.1.0"

app = flask.Flask(__name__)
flask_cors.CORS(app)

tty_device = os.environ.get("TTY_DEVICE")
if tty_device:
    printer = printer.serial.SerialPrinter(device=tty_device)
else:
    printer = printer.mock.MockPrinter()

printer.print_text(SERVICE_NAME + "\n")
printer.print_text("Version: " + SERVICE_VERSION + "\n")
printer.print_text("Device: " + str(tty_device) + "\n")
printer.print_text("Time: " + datetime.datetime.now().isoformat() + "\n")
printer.cut_paper()

@app.route("/")
def get_root():
    return flask.jsonify({
        "Service": {
            "Name": SERVICE_NAME,
            "Version": SERVICE_VERSION,
        },
        "Time": datetime.datetime.now().isoformat(),
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
        "Service": {
            "Name": SERVICE_NAME,
            "Version": SERVICE_VERSION,
        },
        "Time": datetime.datetime.now().isoformat(),
    })
