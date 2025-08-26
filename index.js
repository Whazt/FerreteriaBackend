const express = require('express');
const app = express();
const Port = 3000;

app.get('/', (req,res) => {
    res.send('Probando Express');
});

app.listen(Port, () =>{
    console.log(`Server listening on port http://localhost:${Port}`);
});