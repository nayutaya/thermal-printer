
import datetime
import os
import tempfile

import flask
import flask_cors

import printer.mock
import printer.network
import printer.serial

SERVICE_NAME    = "Printing Service"
SERVICE_VERSION = "1.1.0"

app = flask.Flask(__name__)
flask_cors.CORS(app)

printer_type   = os.environ.get("PRINTER_TYPE")
printer_device = os.environ.get("PRINTER_DEVICE")
printer_host   = os.environ.get("PRINTER_HOST")
printer_port   = os.environ.get("PRINTER_PORT")
if printer_type == "SERIAL":
    printer = printer.serial.SerialPrinter(device=printer_device)
elif printer_type == "NETWORK":
    printer = printer.network.NetworkPrinter(host=printer_host, port=int(printer_port))
else:
    printer = printer.mock.MockPrinter()

printer.print_text(SERVICE_NAME + "\n")
printer.print_text("Version: "        + SERVICE_VERSION     + "\n")
printer.print_text("Printer Type: "   + str(printer_type)   + "\n")
printer.print_text("Printer Device: " + str(printer_device) + "\n")
printer.print_text("Printer Host: "   + str(printer_host)   + "\n")
printer.print_text("Printer Port: "   + str(printer_port)   + "\n")
printer.print_text("Time: "           + datetime.datetime.now().isoformat() + "\n")
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
