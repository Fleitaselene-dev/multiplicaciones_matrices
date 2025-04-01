console.log("anda");
document.addEventListener("DOMContentLoaded", function () {
document.getElementById("generar").addEventListener("click", function() {
    let filas1 = parseInt(document.getElementById("filas1").value);
    let columnas1 = parseInt(document.getElementById("columnas1").value);
    let filas2 = parseInt(document.getElementById("filas2").value);
    let columnas2 = parseInt(document.getElementById("columnas2").value);
    let matrices = document.getElementById("matrices");
    matrices.innerHTML = "";

    if (isNaN(filas1) || isNaN(columnas1) || isNaN(filas2) || isNaN(columnas2) ||  
    filas1 <= 0 || columnas1 <= 0 || filas2 <= 0 || columnas2 <= 0) {
        alert("Por favor, ingrese valores válidos para filas y columnas.");
        return;
    }

     if (columnas1 !== filas2) {
        alert("El número de columnas de la Matriz 1 debe ser igual al número de filas de la Matriz 2.");
        return;
    }
    function crearMatriz(id, filas, columnas) {
        let matriz = document.createElement("div");
        matriz.innerHTML = `<h3>${id}</h3>`;
        for (let f = 0; f < filas; f++) {
            let row = document.createElement("div");
            for (let c = 0; c < columnas; c++) {
                let input = document.createElement("input");
                input.type = "number";
                input.className = id;
                input.dataset.row = f;
                input.dataset.col = c;
                row.appendChild(input);
            }
            matriz.appendChild(row);
        }
        matrices.appendChild(matriz);
    }

    crearMatriz("matriz1", filas1, columnas1);
    crearMatriz("matriz2", filas2, columnas2);

    document.getElementById("multiplicar").style.display = "block";
});

document.getElementById("multiplicar").addEventListener("click", function() {
    let matriz1 = [], matriz2 = [];
    let filas1 = parseInt(document.getElementById("filas1").value);
    let columnas1 = parseInt(document.getElementById("columnas1").value);
    let filas2 = parseInt(document.getElementById("filas2").value);
    let columnas2 = parseInt(document.getElementById("columnas2").value);


    for (let f = 0; f < filas1; f++) {
        let row1 = [];
        for (let c = 0; c < columnas1; c++) {
            let val = parseFloat(document.querySelector(`.matriz1[data-row="${f}"][data-col="${c}"]`).value);
            if (isNaN(val)) {
                alert("Todos los campos deben ser números.");
                return;
            }
            row1.push(val);
        }
        matriz1.push(row1);
    }

    for (let f = 0; f < filas2; f++) {
        let row2 = [];
        for (let c = 0; c < columnas2; c++) {
            let val = parseFloat(document.querySelector(`.matriz2[data-row="${f}"][data-col="${c}"]`).value);
            if (isNaN(val)) {
                alert("Todos los campos deben ser números.");
                return;
            }
            row2.push(val);
        }
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
function mostrarResultado(data) {
    // Verificamos que data y data.resultado estén presentes y que sea un arreglo
    if (!data || !Array.isArray(data.resultado)) {
        console.error("Error: No se recibió una matriz válida.");
        alert("Error: La respuesta del servidor no contiene una matriz válida.");
        return;
    }

    let matriz = data.resultado;  // Accedemos a la matriz correctamente
    let resultadoDiv = document.getElementById("resultado");
    resultadoDiv.innerHTML = "<h3>Matriz Resultante</h3>";
    
    let matrizContainer = document.createElement("div");
    matrizContainer.className = "matriz-resultado";
    matrizContainer.style.display = "flex";
    matrizContainer.style.flexDirection = "column";
    matrizContainer.style.alignItems = "center";
    matrizContainer.style.margin = "20px 0";

    // Iteramos sobre las filas de la matriz
    matriz.forEach(fila => {
        let row = document.createElement("div");
        row.style.display = "flex";
        row.style.margin = "2px 0";  // Espaciado entre las filas
        
        // Iteramos sobre los valores de cada fila
        fila.forEach(valor => {
            let span = document.createElement("span");  // Creamos un elemento span para cada valor
            span.textContent = valor;  // Establecemos el valor de la matriz en el span
            span.style.width = "50px";  // Tamaño de cada celda
            span.style.height = "50px";  // Tamaño de cada celda
            span.style.display = "flex";
            span.style.justifyContent = "center";  // Centrado horizontal del valor
            span.style.alignItems = "center";  // Centrado vertical del valor
            span.style.border = "1px solid darksalmon";  // Estilo de borde de las celdas
            span.style.margin = "0 2px";  // Espaciado entre celdas
            span.style.backgroundColor = "#fff8f7";  // Color de fondo de las celdas
            
            row.appendChild(span);  // Añadimos el span (valor de la celda) a la fila
        });
        
        matrizContainer.appendChild(row);  // Añadimos la fila al contenedor de la matriz
    });
    
    resultadoDiv.appendChild(matrizContainer);  // Añadimos el contenedor de la matriz al div de resultados
}
})