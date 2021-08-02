var http = require('http');
const fs = require('fs');
var dado;

function responde(req, res) {

    console.log(req.method);
    console.log(req.url);

    var decodedURL = decodeURI(req.url);

    console.log(decodedURL);

    if (decodedURL.indexOf('$') > -1){
        res.setHeader('Content-Type', 'text/text');
        res.writeHead(200);

        var position = decodedURL.indexOf('$');
        var jsonText = decodedURL.substring(position+1);

        var dado = JSON.parse(jsonText);
        console.log(dado)
        num = Number(dado.numero);
        equation = num**2 + 10*num + num;
        texto = `${equation}`;
        res.end(texto);
    }else{
        res.writeHead(200, {'Content-Type': 'text/html'})

        fs.readFile('base.html', (err,dado) => {
            res.end(dado)
        });
    }
}

var serv = http.createServer(responde)

serv.listen(8080);