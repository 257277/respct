from flask import Flask, request, jsonify
import asyncio
import json
import sys
import websockets
import bcrypt
from flask_pymongo import PyMongo
import certifi
import jwt
from flask_cors import CORS

ca = certifi.where()

app = Flask(__name__)
CORS(app)
app.config["MONGO_URI"] ="mongodb+srv://rahulSharma:rahulSharma@cluster0.so3yn.mongodb.net/Respct"
mongo = PyMongo(app,tlsCAFile=ca)

@app.route("/register", methods=["POST"])
def register():
    registration_data = request.get_json()
    name = registration_data.get("name")
    email = registration_data.get("email")
    password = registration_data.get("password")
    print(name,email,password)
    if not name or not email or not password:
        return jsonify({"message": "Missing required fields"})
    existing_user =mongo.db.users.find_one({"email": email})
    if existing_user:
        return jsonify({"message": "User already exists"})
    hashed_password = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())
    new_user = {
        "name": name,
        "email": email,
        "password": hashed_password
        
    }
    mongo.db.users.insert_one(new_user)

    return jsonify({"message": "Registration successful"})



@app.route("/login", methods=["POST"])
def login():
    # Get the login data from the request
    login_data = request.get_json()
    email = login_data.get("email")
    password = login_data.get("password")
    if not email or not password:
        return jsonify({"message": "Missing required fields"})
    user = mongo.db.users.find_one({"email": email})
    if not user:
        return jsonify({"message": "Invalid email or password"})
    if not bcrypt.checkpw(password.encode("utf-8"), user["password"]):
        return jsonify({"message": "Invalid email or password"})
    token_payload = {
        "email": user["email"],
    }
    token = jwt.encode(token_payload, "Respct", algorithm="HS256")
    user_id = str(user["_id"])
    return jsonify({"message": "Login successful", "name": user["name"], "id": user_id, "token": token})



@app.route("/generate-message", methods=["POST"])
def generate_response():
    try:
        prompt = request.json.get("prompt")
        if prompt:
            response = asyncio.run(run_and_generate_response(prompt))
            return jsonify({"response": response})
        else:
            return jsonify({"error": "Invalid prompt."})
    except ImportError:
        return jsonify({"error": "Websockets package not found. Make sure it's installed."})

async def run(context):
    # Define the URI for WebSocket connection
    HOST = 'elder-feeds-phrases-burst.trycloudflare.com'
    URI = f'ws://{HOST}/api/v1/stream'

    # Request parameters for GPT-3 API
    request_data = {
        'prompt': context,
        'max_new_tokens': 250,
       'auto_max_new_tokens': False,

        # Generation params. If 'preset' is set to different than 'None', the values
        # in presets/preset-name.yaml are used instead of the individual numbers.
        'preset': 'None',
        'do_sample': True,
        'temperature': 0.7,
        'top_p': 0.1,
        'typical_p': 1,
        'epsilon_cutoff': 0,  # In units of 1e-4
        'eta_cutoff': 0,  # In units of 1e-4
        'tfs': 1,
        'top_a': 0,
        'repetition_penalty': 1.18,
        'repetition_penalty_range': 0,
        'top_k': 40,
        'min_length': 0,
        'no_repeat_ngram_size': 0,
        'num_beams': 1,
        'penalty_alpha': 0,
        'length_penalty': 1,
        'early_stopping': False,
        'mirostat_mode': 0,
        'mirostat_tau': 5,
        'mirostat_eta': 0.1,
        'guidance_scale': 1,
        'negative_prompt': '',

        'seed': -1,
        'add_bos_token': True,
        'truncation_length': 2048,
        'ban_eos_token': False,
        'skip_special_tokens': True,
        'stopping_strings': []
    }

    async with websockets.connect(URI, ping_interval=None) as websocket:
        await websocket.send(json.dumps(request_data))

        while True:
            incoming_data = await websocket.recv()
            incoming_data = json.loads(incoming_data)

            event_type = incoming_data.get('event', '')

            if event_type == 'text_stream':
                yield incoming_data['text']
            elif event_type == 'stream_end':
                return


async def run_and_generate_response(prompt):
    response = ''
    async for chunk in run(prompt):
        response += chunk
    return response

if __name__ == '__main__':
    app.run(debug=True, port=5002)
