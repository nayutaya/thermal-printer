
import datetime

import flask
import flask_cors

import printer.mock
import printer.serial

VERSION = "0.0.0"

app = flask.Flask(__name__)
flask_cors.CORS(app)

printer = printer.mock.MockPrinter()
#printer = printer.serial.SerialPrinter(device="/dev/ttyPRINTER")
printer.print_text("Printing Service")
printer.print_text("v" + VERSION)
printer.cut_paper()

@app.route("/")
def get_root():
    return flask.jsonify({
        "time": datetime.datetime.now().isoformat(),
    })
