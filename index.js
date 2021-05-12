const express = require('express')

const app = express()

app.listen(7000, () => console.log('Servidor rodando na porta 7000'))

app.get('/', (req, res) => res.send('Servidor OK!'))