// window.onload = function() {

//     // logado?
//     var intervalo = 2000; // Executar a cada 2 segundos

//     // Iniciar o intervalo
//     var intervalID = setInterval(verificarLogin, intervalo);

//     function verificarLogin() {

//         fetch('http://localhost/backEndBD/auth.php', {
//             method: 'GET',
//             //headers: {
//             //    'Content-Type': 'application/json'
//            // },
//             //body: JSON.stringify(dadosFormatados)
//         })
//             .then(response => response.json())
//             .then(data => {
//                 // Aqui você pode lidar com a resposta da API
//                 if (data.status === false) {
//                     window.location.href = "index.html";
//                 }
//                 else{
//                     console.log('logado');
//                 }
//                 console.log(data);
//             })
//             .catch(error => {
//                 // Aqui você pode lidar com erros na requisição
//                 console.error(error);
//             });
//     }

//     };




document.getElementById("tipoProduto").addEventListener("change", function () {
    var tipoProduto = this.value;

    if (tipoProduto === "quimico") {
        document.getElementById("quimicoFields").style.display = "block";
        document.getElementById("equipamentoFields").style.display = "none";
    } else if (tipoProduto === "equipamento") {
        document.getElementById("quimicoFields").style.display = "none";
        document.getElementById("equipamentoFields").style.display = "block";
    }
});

document.getElementById("cadastroForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Impede o envio do formulário

    // Resgata os valores dos campos do formulário
    var tipoProduto = document.getElementById("tipoProduto").value;
    var nome = document.getElementById("nome").value;
    var descricao = document.getElementById("descricao").value;
    var fabricante = document.getElementById("fabricante").value;
    var preco = parseFloat(document.getElementById("preco").value);
    var dataFabricacao = document.getElementById("dataFabricacao").value;
    var fkPrateleirasNumeroPrateleira = parseInt(document.getElementById("prateleira").value);

    console.log("tetste");
    console.log(fkPrateleirasNumeroPrateleira);
    console.log("\n\n\n");

    var produto = {};

    if (tipoProduto === "quimico") {
        var formulaQuimica = document.getElementById("formulaQuimica").value;
        var concentracao = parseFloat(document.getElementById("concentracao").value);
        var classeRisco = document.getElementById("classeRisco").value;
        var volume = parseFloat(document.getElementById("volume").value);
        var dataValidade = document.getElementById("dataValidade").value;
        var quantidadeQuimico = parseFloat(document.getElementById("quantidadeQuimico").value);

        produto = {
            tipoProduto: tipoProduto,
            nome: nome,
            descricao: descricao,
            fabricante: fabricante,
            preco: preco,
            dataFabricacao: dataFabricacao,
            fkPrateleirasNumeroPrateleira: fkPrateleirasNumeroPrateleira,
            formulaQuimica: formulaQuimica,
            concentracao: concentracao,
            classeRisco: classeRisco,
            volume: volume,
            dataValidade: dataValidade,
            quantidadeQuimico: quantidadeQuimico
        };
    } else if (tipoProduto === "equipamento") {
        var tipoEquipamento = document.getElementById("tipoEquipamento").value;
        var capacidade = parseFloat(document.getElementById("capacidade").value);
        var condicoesOperacao = document.getElementById("condicoesOperacao").value;
        var calibracao = document.getElementById("calibracao").value;

        produto = {
            tipoProduto: tipoProduto,
            nome: nome,
            descricao: descricao,
            fabricante: fabricante,
            preco: preco,
            dataFabricacao: dataFabricacao,
            fkPrateleirasNumeroPrateleira: fkPrateleirasNumeroPrateleira,
            tipoEquipamento: tipoEquipamento,
            capacidade: capacidade,
            condicoesOperacao: condicoesOperacao,
            calibracao: calibracao
        };
    }



    // Envia o objeto produto para a API em formato JSON
    var produtoJSON = JSON.stringify(produto);
    console.log(produtoJSON);



    let url = "";


    if (tipoProduto === "quimico") {
        url = 'http://localhost/backEndBD/quimico.php';
    } else {
        url = 'http://localhost/backEndBD/equipamento.php';
    }

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(produto)
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === true) {
                var containerElement = document.getElementById('aviso');
                
                var alertElement = document.createElement('div');
                alertElement.classList.add('alert', 'alert-success');
                alertElement.textContent = 'Produto cadastrado com sucesso!';
                // Adicionar o elemento de alerta ao DOM

                containerElement.appendChild(alertElement);


            }
            else {
                var containerElement = document.getElementById('aviso');
                var alertElement = document.createElement('div');
                alertElement.classList.add('alert', 'alert-danger');
                alertElement.textContent = 'Produto não cadastrado!';
                // Adicionar o elemento de alerta ao DOM
                var containerElement = document.getElementById('aviso');
                containerElement.appendChild(alertElement);

            }
        })
        .catch(error => {
                var containerElement = document.getElementById('aviso');
                var alertElement = document.createElement('div');
                alertElement.classList.add('alert', 'alert-danger');
                alertElement.textContent = 'Produto não cadastrado!';
                // Adicionar o elemento de alerta ao DOM
                var containerElement = document.getElementById('aviso');
                containerElement.appendChild(alertElement);
            console.error(error);
        });

    //
    //







});


