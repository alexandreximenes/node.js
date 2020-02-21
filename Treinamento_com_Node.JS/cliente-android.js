var http = require('http');

var configuracoes = {
    host: 'localhost',
    port: 3000,
    path: '/produtos',
    method: 'post',
    headers : {
        'Accept': 'Application/json', // aceita requisições em json
        'Contant-type': 'Application/json'  // config para enviar dados em json
        //'Accept' : 'text/html'
    }
}


let client = http.request(configuracoes, function(res){
    console.log(res.statusCode);
    res.on('data', function(body){
        console.log("Corpo "+ body);
    });


});

let produto = {
    titulo : 'mais sobre node',
    descricao: 'node, javascript e um pouco sobre http',
    preco: '100'
}

client.end(JSON.stringify(produto));

// http.get(configuracoes, function(res){
//     console.log(res.statusCode);
//     res.on('data', function(body){
//         console.log("Corpo "+ body);
//     });


// });