import express from "express"
import morgan from "morgan"
import { fileURLToPath } from "url"
import path from "path"


const app = express()
const port = 5000

app.use(morgan("dev"))
app.use(express.json())

// Obtén la ruta completa del archivo actual (app.js)
const __filename = fileURLToPath(import.meta.url);

// Usa path.dirname para obtener el directorio
const __dirname = path.dirname(__filename);

// Configura la carpeta 'public' para archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));


app.get("/", (req, res) => {
    const filePath = path.join(__dirname, "public", "index.html");
    res.sendFile(filePath);
});

app.post('/multiplicar', (req, res) => {
    const { matriz1, matriz2 } = req.body;

    
    if (matriz1[0].length !== matriz2.length) {
        return res.status(400).json({ error: "Las matrices no son compatibles para multiplicar." });
    }

    
    const resultado = [];
    for (let i = 0; i < matriz1.length; i++) {
        const filaResultado = [];
        for (let j = 0; j < matriz2[0].length; j++) {
            let sum = 0;
            for (let k = 0; k < matriz1[0].length; k++) {
                sum += matriz1[i][k] * matriz2[k][j];
            }
            filaResultado.push(sum);
        }
        resultado.push(filaResultado);
    }

   
    res.json({ resultado });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
