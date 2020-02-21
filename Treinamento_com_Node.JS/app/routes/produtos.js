module.exports = function(app) {
    app.get("/produtos",function(req, res) {
        
        var connection = app.infra.ConnectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);
        
        produtosDAO.lista(function(err, results){
            res.format({
                html: function(){
                    res.render('produtos/lista', {lista:results});
                },
                json: function(){
                    res.json(results);
                }
            });
        });

        connection.end();
    });

    app.get("/", function(req, resp){
	    resp.send("<html><body><h1>Pagina principal...</h1></body></html>");
    });

    app.get("/produtos/formularioDeCadastro", function(req, resp){
        resp.render('produtos/cadastrarProduto', {validationErrors: {}, produto: {} });
    });

    app.post('/produtos', function(req,resp){

        var produto = req.body;
     
        console.log(produto);

        req.assert('titulo', 'Titulo deve ser preenchido').notEmpty();
        req.assert('preco', 'Preco invalido').isFloat();
        req.assert('descricao', 'Coloque uma descricao').notEmpty();

        var errors = req.validationErrors();
        if(errors){
            console.log('erros '+errors);
            resp.format({
                html: function(){
                    resp.status(400).render('produtos/cadastrarProduto', { validationErrors: errors, produto: produto });
                },
                json: function(){
                    resp.status(400).json(errors);
                }
            });
            return;
        }else{
            var thisPromiseCount = 'dddd';
            console.log('sem erros');
            console.log.insertAdjacentHTML('beforeend', thisPromiseCount + 
      ') Promise made (<small>Sync code terminated</small>)<br/>');
        }
     
        var connection = app.infra.ConnectionFactory();
        var produtosDAO = new app.infra.ProdutosDAO(connection);
        produtosDAO.salvar(produto, function(erros,resultados){
            resp.redirect('/produtos');
        });
    });

    app.listen(3000, function(req, resp){
        console.log("servidor rodando...");
    });
}