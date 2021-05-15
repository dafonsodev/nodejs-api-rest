const moment = require('moment')
const conn = require('../infra/connection')

class Atendimento {
    adicionar(atendimento, res) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')

        const dataEhValida = moment(data).isSameOrAfter(dataCriacao)
        const clienteEhValido = atendimento.cliente.length >= 5

        const validacoes = [
            {
                nome: 'data',
                valido: dataEhValida,
                mensagem: 'A data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: clienteEhValido,
                mensagem: 'O nome deve ter no mínimo 5 caracteres'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if(existemErros) {
            res.status(400).json(erros)
        }
        else {
            const atendimentoDatado = {...atendimento, dataCriacao, data}
            const sql = 'INSERT INTO Atendimentos SET ?'
            conn.query(sql, atendimentoDatado, (erro, resultados) => {
                if(erro) {
                    res.status(400).json(erro)
                }
                else {
                    res.status(201).json(atendimento)
                }
            })
        }
    }

    listar(res) {
        const sql = 'SELECT * FROM Atendimentos'
        conn.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            }
            else {
                res.status(200).json(resultados)
            }
        })
    }

    listarPorId(id, res) {
        const sql = `SELECT * FROM Atendimentos WHERE id = ${id}`
        conn.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            }
            else {
                res.status(200).json(resultados[0])
            }
        })
    }

    alterar(id, valores, res) {
        if(valores.data) {
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }

        const sql = 'UPDATE Atendimentos SET ? WHERE id = ?'
        conn.query(sql, [valores, id], (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            }
            else {
                res.status(200).json({...valores, id})
            }
        })
    }

    deletar(id, res) {
        const sql = 'DELETE FROM Atendimentos WHERE id = ?'
        conn.query(sql, id, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            }
            else {
                res.status(200).json({id})
            }
        })
    }
}

module.exports = new Atendimento()