import express from 'express';

const app = express();
const port = 5000;

app.use(express.static('public'));
app.use(express.json());

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
