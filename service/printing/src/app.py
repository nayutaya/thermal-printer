
import datetime

import flask
import flask_cors

app = flask.Flask(__name__)
flask_cors.CORS(app)

@app.route("/")
def get_root():
    return flask.jsonify({
        "time": datetime.datetime.now().isoformat(),
    })
