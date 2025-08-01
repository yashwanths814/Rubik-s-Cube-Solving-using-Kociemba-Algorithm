from flask import Flask, request, jsonify
from flask_cors import CORS
from cube_solver import solve_and_animate

app = Flask(__name__)
CORS(app)

@app.route('/solve', methods=['POST'])
def solve_cube():
    data = request.get_json()
    scramble = data.get("scramble")

    if not scramble:
        return jsonify({"error": "No scramble provided"}), 400

    try:
        result = solve_and_animate(scramble)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
