from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)

CORS(
    app,
    resources={r"/*": {"origins": ["http://localhost:3000", "http://127.0.0.1:3000"]}},
)

MAX_INT_SIZE = 2**63 - 1

def calculate(operation, firstHex, secondHex):
    if operation == "+":
        result = firstHex + secondHex
    elif operation == "-":
        result = firstHex - secondHex
    elif operation == "*":
        result = firstHex * secondHex
    elif operation == "/":
        if secondHex == 0:
            return jsonify({"error": "Division by zero is not allowed"}), 400
        else:
            result = firstHex / secondHex
    
    return result

def to_hex_64bit(val):
    """Convert to 64-bit unsigned hexadecimal format."""
    # Calculate two's complement for 64-bit unsigned representation
    if val < 0:
        val = (1 << 64) + val
    return f"{val:016x}"  # Format as 16-character wide hex string

@app.route("/api/calculate/hexadecimal", methods=["POST"])
def get_data():
    try:
        # Convert hex strings to integers
        firstHex = int(request.form.get("firstHex"), 16)
        secondHex = int(request.form.get("secondHex"), 16)
    
        if abs(firstHex) > MAX_INT_SIZE or abs(secondHex) > MAX_INT_SIZE:
            return jsonify({"error": "One or both numbers are too large"}), 400

    except ValueError as ve:
        return (
            jsonify({"error": "Invalid input format. Please provide valid hexadecimal numbers."}),
            400,
        )

    operation = request.form.get("operation")

    result = calculate(operation, firstHex, secondHex)
    
    if isinstance(result, float):
        hex_result = float.hex(result)
        decimal_result = result
    else:
        # Convert result to 64-bit unsigned hex format
        hex_result = to_hex_64bit(result)
        decimal_result = result

    return jsonify(
        {
            "firstHex": hex(firstHex),
            "secondHex": hex(secondHex),
            "operation": operation,
            "result_hex": f"0x{hex_result}",
            "result_decimal": decimal_result,
        }
    )

if __name__ == "__main__":
    app.run(debug=True)
