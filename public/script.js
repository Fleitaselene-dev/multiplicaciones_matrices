console.log("anda");

document.getElementById("generar").addEventListener("click", function() {
    let filas = parseInt(document.getElementById("filas").value);
    let columnas = parseInt(document.getElementById("columnas").value);
    let matrices = document.getElementById("matrices");
    matrices.innerHTML = "";

    if (isNaN(filas) || isNaN(columnas) || filas <= 0 || columnas <= 0) {
        alert("Por favor, ingrese valores válidos para filas y columnas.");
        return;
    }

    for (let i = 1; i <= 2; i++) {
        let matriz = document.createElement("div");
        matriz.innerHTML = `<h3>Matriz ${i}</h3>`;
        for (let f = 0; f < filas; f++) {
            let row = document.createElement("div");
            for (let c = 0; c < columnas; c++) {
                let input = document.createElement("input");
                input.type = "number";
                input.className = `matriz${i}`;
                input.dataset.row = f;
                input.dataset.col = c;
                row.appendChild(input);
            }
            matriz.appendChild(row);
        }
        matrices.appendChild(matriz);
    }

    document.getElementById("multiplicar").style.display = "block";
});

document.getElementById("multiplicar").addEventListener("click", function() {
    let matriz1 = [], matriz2 = [];
    let filas = parseInt(document.getElementById("filas").value);
    let columnas = parseInt(document.getElementById("columnas").value);

   
    for (let f = 0; f < filas; f++) {
        let row1 = [], row2 = [];
        for (let c = 0; c < columnas; c++) {
            let val1 = parseFloat(document.querySelector(`.matriz1[data-row="${f}"][data-col="${c}"]`).value);
            let val2 = parseFloat(document.querySelector(`.matriz2[data-row="${f}"][data-col="${c}"]`).value);

            if (isNaN(val1) || isNaN(val2)) {
                alert("Todos los campos deben ser números.");
                return;
            }

            row1.push(val1);
            row2.push(val2);
        }
        matriz1.push(row1);
        matriz2.push(row2);
    }

   
    fetch("http://localhost:5000/multiplicar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ matriz1, matriz2 })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Respuesta del servidor:", data)
        if(!data.resultado){
            console.error(data)
            alert(`Error del servidor: ${data.error || "No se pudo procesar la solicitud."}`);
        return;
        }
        mostrarResultado(data.resultado);
    })
    .catch(error => console.error("Error:", error));
});

function mostrarResultado(matriz) {
    let resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = "<h3>Matriz Resultante</h3>";
    
    let matrizContainer = document.createElement("div");
    matrizContainer.className = "matriz-resultado";
    matrizContainer.style.display = "flex";
    matrizContainer.style.flexDirection = "column";
    matrizContainer.style.alignItems = "center";
    matrizContainer.style.margin = "20px 0";

    matriz.forEach(fila => {
        let row = document.createElement("div");
        row.style.display = "flex";
        row.style.margin = "2px 0";
        
        fila.forEach(valor => {
            let span = document.createElement("span");
            span.textContent = valor;
            span.style.width = "50px";
            span.style.height = "50px";
            span.style.display = "flex";
            span.style.justifyContent = "center";
            span.style.alignItems = "center";
            span.style.border = "1px solid darksalmon";
            span.style.margin = "0 2px";
            span.style.backgroundColor = "#fff8f7";
            
            row.appendChild(span);
        });
        
        matrizContainer.appendChild(row);
    });
    
    resultadoDiv.appendChild(matrizContainer);
}