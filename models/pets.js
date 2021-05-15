const conn = require('../infra/connection')
const uploadDeArquivos = require('../arquivos/uploadDeArquivos')

class Pet {
    adicionar(pet, res) {
        uploadDeArquivos(pet.imagem, pet.nome, (erro, novoCaminho) => {
            if(erro) {
                res.status(400).json({erro})
            }
            else {
                const novoPet = {nome: pet.nome, imagem: novoCaminho}
                const sql = 'INSERT INTO Pets SET ?'
                conn.query(sql, novoPet, erro => {
                    if(erro) {
                        res.status(400).json(erro)
                    }
                    else {
                        res.status(200).json(novoPet)
                    }
                })
            }
        })
    }
}

module.exports = new Pet()