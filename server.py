from flask import Flask, request, jsonify, render_template
from flask_cors import CORS  

app = Flask(__name__)
CORS(app)  


@app.route('/')
def index():
    return render_template('index.html') 

@app.route("/multiplicar", methods=["POST"])
def multiplicar_matrices():
    data = request.get_json() 
    matriz1 = data.get("matriz1")
    matriz2 = data.get("matriz2")

    if not matriz1 or not matriz2 or len(matriz1[0]) != len(matriz2):
        return jsonify({"error": "Las matrices no son compatibles."}), 400

  
    filas_resultado = len(matriz1)
    columnas_resultado = len(matriz2[0])
    resultado = [[0] * columnas_resultado for _ in range(filas_resultado)]

    for i in range(filas_resultado):
        for j in range(columnas_resultado):
            resultado[i][j] = sum(matriz1[i][k] * matriz2[k][j] for k in range(len(matriz2)))

    return jsonify({"resultado": resultado})

if __name__ == "__main__":
    app.run(debug=True, port=5000) 
