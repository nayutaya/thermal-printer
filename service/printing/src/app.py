
import datetime
import os
import tempfile

import escpos.printer
import flask
import flask_cors

SERVICE_NAME    = "Printing Service"
SERVICE_VERSION = "2.0.0"

app = flask.Flask(__name__)
flask_cors.CORS(app)

printer_type   = os.environ.get("PRINTER_TYPE")
printer_device = os.environ.get("PRINTER_DEVICE")
printer_host   = os.environ.get("PRINTER_HOST")
printer_port   = os.environ.get("PRINTER_PORT")
if printer_type == "SERIAL":
    create_printer = lambda: escpos.printer.Serial(printer_device)
elif printer_type == "NETWORK":
    create_printer = lambda: escpos.printer.Network(host=printer_host, port=int(printer_port))
else:
    class Dump(escpos.printer.Dummy):
        def close(self):
            print(self.output)
    create_printer = lambda: Dump()

printer = create_printer()
printer.text(SERVICE_NAME + "\n")
printer.text("Version: "        + SERVICE_VERSION     + "\n")
printer.text("Printer Type: "   + str(printer_type)   + "\n")
printer.text("Printer Device: " + str(printer_device) + "\n")
printer.text("Printer Host: "   + str(printer_host)   + "\n")
printer.text("Printer Port: "   + str(printer_port)   + "\n")
printer.text("Time: "           + datetime.datetime.now().isoformat() + "\n")
printer.cut(mode="PART")
printer.close()

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
        printer = create_printer()
        printer.image(file)
        printer.cut(mode="PART")
        printer.close()

    return flask.jsonify({
        "Service": {
            "Name": SERVICE_NAME,
            "Version": SERVICE_VERSION,
        },
        "Time": datetime.datetime.now().isoformat(),
    })
