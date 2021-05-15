const fs = require('fs')
const path = require('path')

module.exports = (caminho, nome, callBackImagemCriada) => {
    const extValidas = ['jpg', 'png', 'jpeg']
    const extensao = path.extname(caminho)
    const extEhValida = extValidas.indexOf(extensao.substring(1)) !== -1

    if(!extEhValida) {
        const erro = 'Tipo de arquivo inválido!'
        callBackImagemCriada(erro)
    }
    else {
        const novoCaminho = `./assets/imagens/${nome}${extensao}`

        fs.createReadStream(caminho)
            .pipe(fs.createWriteStream(novoCaminho))
            .on('finish', () => callBackImagemCriada(false, novoCaminho))
    }
}
