const customExpress = require('./config/customExpress')
const conn = require('./infra/connection')
const Tabelas = require('./infra/tabelas')

conn.connect(erro => {
    if(erro) {
        console.log(erro)
    }
    else {
        console.log('Conectado com sucesso!')
        Tabelas.init(conn)
        const app = customExpress()
        app.listen(7000, () => console.log('Servidor rodando na porta 7000'))
    }
})
