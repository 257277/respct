from flask import Flask

app = Flask(__name__)

@app.route("/message",methods=["POST"])
def message():
    return "welcome"



if __name__ == "__main__":
    app.run(debug=False, port=5002)