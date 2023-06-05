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

// };

var tipo;
var produto = {};
document.getElementById("tipoProduto").addEventListener("change", function () {
    var tipoProduto = this.value;
    if (tipoProduto === "quimico") {
        document.getElementById("quimicoFields").style.display = "block";
        document.getElementById("equipamentoFields").style.display = "none";
    } else if (tipoProduto === "equipamento") {
        document.getElementById("quimicoFields").style.display = "none";
        document.getElementById("equipamentoFields").style.display = "block";
    }

    tipo = tipoProduto;
});

//CAMPOS GERAIS
var tipoProduto = document.getElementById("tipoProduto").value;
var inputID = document.getElementById("inputID").value;
var nome = document.getElementById("nome").value;
var descricao = document.getElementById("descricao").value;
var fabricante = document.getElementById("fabricante").value;
var preco = parseFloat(document.getElementById("preco").value);
var dataFabricacao = document.getElementById("dataFabricacao").value;
var prateleira = document.getElementById("prateleira").value;

//CAMPOS ESPECIFICOS DE QUIMICO
var formulaQuimica = document.getElementById("formulaQuimica").value;
var concentracao = parseFloat(document.getElementById("concentracao").value);
var classeRisco = document.getElementById("classeRisco").value;
var volume = parseFloat(document.getElementById("volume").value);
var dataValidade = document.getElementById("dataValidade").value;
var quantidadeQuimico = parseFloat(document.getElementById("quantidadeQuimico").value);

//CAMPOS ESPECIFICOS DE EQUIPAMENTO
var tipoEquipamento = document.getElementById("tipoEquipamento").value;
var capacidade = parseFloat(document.getElementById("capacidade").value);
var condicoesOperacao = document.getElementById("condicoesOperacao").value;
var calibracao = document.getElementById("calibracao").value;

console.log(inputID);

//Função de busca:
document.getElementById("btnBuscar").addEventListener("click", function () {
    event.preventDefault();
    var inputID = document.getElementById("inputID").value;
    mostrar(inputID, tipo);

});

//Função de deletar
document.getElementById("btnDeletar").addEventListener("click", function () {
    event.preventDefault();
    console.log("Deletou");
    var inputID = document.getElementById("inputID").value;
    deletar(inputID, tipo);


});

//Função de alterar:
//Função de alterar:
document.getElementById("btnAlterar").addEventListener("click", function () {
    event.preventDefault();
    //console.log("Alterou");

    // Resgata os valores dos campos do formulário
    var tipoProduto = document.getElementById("tipoProduto").value;
    var nome = document.getElementById("nome").value;
    var descricao = document.getElementById("descricao").value;
    var fabricante = document.getElementById("fabricante").value;
    var preco = document.getElementById("preco").value;
    var dataFabricacao = document.getElementById("dataFabricacao").value;
    var fkPrateleirasNumeroPrateleira = parseInt(document.getElementById("prateleira").value, 10);

    console.log(tipoProduto);
    console.log(nome);
    console.log(descricao);
    console.log(fabricante);
    console.log(preco);
    console.log(dataFabricacao);
    console.log(fkPrateleirasNumeroPrateleira);



    if (tipoProduto === "quimico") {

        var formulaQuimica = document.getElementById("formulaQuimica").value;
        var concentracao = document.getElementById("concentracao").value;
        var classeRisco = document.getElementById("classeRisco").value;
        var volume = document.getElementById("volume").value;
        var dataValidade = document.getElementById("dataValidade").value;
        var quantidadeQuimico = document.getElementById("quantidadeQuimico").value;
        var id = document.getElementById("inputID").value;


        console.log(formulaQuimica);
        console.log(concentracao);
        console.log(classeRisco);
        console.log(volume);
        console.log(dataValidade);
        console.log(quantidadeQuimico);
        console.log(id);

        produto = {
            id: id,
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
    } else {
        var id = document.getElementById("inputID").value;
        var tipo = document.getElementById("tipoEquipamento").value;
        var capacidade = document.getElementById("capacidade").value;
        var condicoesOperacao = document.getElementById("condicoesOperacao").value;
        var calibracao = document.getElementById("calibracao").value;

        produto = {
            id: id,
            nome: nome,
            descricao: descricao,
            fabricante: fabricante,
            preco: preco,
            dataFabricacao: dataFabricacao,
            fkPrateleirasNumeroPrateleira: fkPrateleirasNumeroPrateleira,
            tipo: tipo,
            capacidade: capacidade,
            condicoesOperacao: condicoesOperacao,
            calibracao: calibracao
        };
    }


    update(tipoProduto, produto);
});






function mostrar(id, tipo) {


    var nome = document.getElementById("nome");
    var descricao = document.getElementById("descricao");
    var fabricante = document.getElementById("fabricante");
    var preco = document.getElementById("preco");
    var dataFabricacao = document.getElementById("dataFabricacao");
    var prateleira = document.getElementById("prateleira");


    //CAMPOS ESPECIFICOS DE QUIMICO
    var formulaQuimica = document.getElementById("formulaQuimica");
    var concentracao = document.getElementById("concentracao");
    var classeRisco = document.getElementById("classeRisco");
    var volume = document.getElementById("volume");
    var dataValidade = document.getElementById("dataValidade");
    var quantidadeQuimico = document.getElementById("quantidadeQuimico");

    //CAMPOS ESPECIFICOS DE EQUIPAMENTO
    var tipoEquipamento = document.getElementById("tipoEquipamento");
    var capacidade = document.getElementById("capacidade");
    var condicoesOperacao = document.getElementById("condicoesOperacao");
    var calibracao = document.getElementById("calibracao");


    console.log("meu id" + id);
    let url = "";

    if (tipo === "quimico") {
        url = 'http://localhost/backEndBD/quimico.php?id=' + id;
    } else {
        url = 'http://localhost/backEndBD/equipamento.php?id=' + id;
    }

    fetch(url, {
        method: 'GET'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na requisição: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            // Aqui você pode lidar com os dados JSON recebidos
            console.log(data);

            if (data.status != true) {

                var containerElement = document.getElementById('aviso');
                var alertElement = document.createElement('div');
                alertElement.classList.add('alert', 'alert-success');
                alertElement.textContent = 'Produto encontrado com sucesso!';
                // Adicionar o elemento de alerta ao DOM

                containerElement.appendChild(alertElement);

                if (tipo === "quimico") {
                    nome.value = data.nome;
                    descricao.value = data.descricao;
                    fabricante.value = data.fabricante;
                    preco.value = data.preco;
                    dataFabricacao.value = data.data_de_fabricacao;
                    prateleira.value = data.fk_prateleiras_numero_prateleira;
                    formulaQuimica.value = data.formula_quimica;
                    concentracao.value = data.concentracao;
                    classeRisco.value = data.classe_de_risco;
                    volume.value = data.volume;
                    dataValidade.value = data.data_de_validade;
                    quantidadeQuimico.value = data.quantidade_quimico;
                } else {
                    nome.value = data.nome;
                    descricao.value = data.descricao;
                    fabricante.value = data.fabricante;
                    dataFabricacao.value = data.data_de_fabricacao;
                    prateleira.value = data.fk_prateleiras_numero_prateleira;
                    preco.value = data.preco;
                    tipoEquipamento.value = data.tipo;
                    capacidade.value = data.capacidade;
                    condicoesOperacao.value = data.condicoes_de_operacao;
                    calibracao.value = data.calibracao;

                }
            } else {
                var containerElement = document.getElementById('aviso');
                var alertElement = document.createElement('div');
                alertElement.classList.add('alert', 'alert-danger');
                alertElement.textContent = 'Produto não encontrado!';
                // Adicionar o elemento de alerta ao DOM
                var containerElement = document.getElementById('aviso');
                containerElement.appendChild(alertElement);
            }
        })
        .catch(error => {
            // Aqui você pode lidar com erros na requisição
            console.error(error);
        });

}


function deletar(id, tipo) {

    let url = "";

    if (tipo === "quimico") {
        url = 'http://localhost/backEndBD/quimico.php';
    } else {
        url = 'http://localhost/backEndBD/equipamento.php';
    }

    fetch(url, {
        method: 'DELETE',
        body: JSON.stringify({ id: id }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na requisição: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
                var containerElement = document.getElementById('aviso');
                var alertElement = document.createElement('div');
                alertElement.classList.add('alert', 'alert-danger');
                alertElement.textContent = 'Produto Deletado!';
                // Adicionar o elemento de alerta ao DOM
                var containerElement = document.getElementById('aviso');
                containerElement.appendChild(alertElement);
            console.log(data);
        })
        .catch(error => {
            // Aqui você pode lidar com erros na requisição
            console.error(error);
        });

}

function update(tipo, produto) {


    let url = "";

    if (tipo === "quimico") {
        url = 'http://localhost/backEndBD/quimico.php';
    } else {
        url = 'http://localhost/backEndBD/equipamento.php';
    }

    fetch(url, {
        method: 'PUT',
        body: JSON.stringify(produto),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na requisição: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
                var containerElement = document.getElementById('aviso');
                var alertElement = document.createElement('div');
                alertElement.classList.add('alert', 'alert-success');
                alertElement.textContent = 'Produto alterado!';
                // Adicionar o elemento de alerta ao DOM
                var containerElement = document.getElementById('aviso');
                containerElement.appendChild(alertElement);
            console.log(data);
        })
        .catch(error => {
            // Aqui você pode lidar com erros na requisição
            console.error(error);
        });

}







