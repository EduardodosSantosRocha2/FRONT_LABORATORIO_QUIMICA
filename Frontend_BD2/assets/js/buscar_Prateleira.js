window.onload = function() {

// logado?
var intervalo = 2000; // Executar a cada 2 segundos

// Iniciar o intervalo
var intervalID = setInterval(verificarLogin, intervalo);

function verificarLogin() {

    fetch('http://localhost/backEndBD/auth.php', {
        method: 'GET',
        //headers: {
        //    'Content-Type': 'application/json'
       // },
        //body: JSON.stringify(dadosFormatados)
    })
        .then(response => response.json())
        .then(data => {
            // Aqui você pode lidar com a resposta da API
            if (data.status === false) {
                window.location.href = "index.html";
            }
            else{
                console.log('logado');
            }
            console.log(data);
        })
        .catch(error => {
            // Aqui você pode lidar com erros na requisição
            console.error(error);
        });
}

};






//atributos de usuarios

document.getElementById("btnBuscar").addEventListener("click", function () {
    console.log('buscar');
    event.preventDefault();
    let numero_prateleira = document.getElementById('prateleira').value;
    console.log(numero_prateleira);
    mostrar(numero_prateleira);
});


//Função de deletar
document.getElementById("btnDeletar").addEventListener("click", function () {
    event.preventDefault();
    var numero_prateleira = document.getElementById('prateleira').value;
    deletar(numero_prateleira);
});

//Função de alterar:
document.getElementById("btnAlterar").addEventListener("click", function () {
    event.preventDefault();
    console.log("Alterou");

    let numero = document.getElementById('prateleira').value;
    let nome = document.getElementById('nome').value;
    let capacidade = document.getElementById('capacidade').value;

    

    // Cria um objeto JSON com os dados do formulário
    let jsonData = {
        numero:numero,
        nome:nome,
        capacidade:capacidade
    };

    update(jsonData);

});


function mostrar(numero_prateleira) {
    let url = 'http://localhost/backEndBD/prateleiras.php?id=' + numero_prateleira;
    console.log(url);

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
            console.log(data);

            if (data.status != true) {
                var containerElement = document.getElementById('aviso');
                var alertElement = document.createElement('div');
                alertElement.classList.add('alert', 'alert-success');
                alertElement.textContent = 'Numero Prateleira encontrado com sucesso!';
                containerElement.appendChild(alertElement);


                let numero = document.getElementById('prateleira');
                let nome = document.getElementById('nome');
                let capacidade = document.getElementById('capacidade');

                nome.value = data.nome;
                capacidade.value = data.capacidade_de_armazenamento;

            } else {
                var containerElement = document.getElementById('aviso');
                var alertElement = document.createElement('div');
                alertElement.classList.add('alert', 'alert-danger');
                alertElement.textContent = 'Numero Prateleira não encontrado!';
                containerElement.appendChild(alertElement);
                console.error(error);
            }


        })
        .catch(error => {
        });
}


function deletar(numero) {

    let url = "";
    url = 'http://localhost/backEndBD/prateleiras.php';


    fetch(url, {
        method: 'DELETE',
        body: JSON.stringify({ numero: numero }),
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
            alertElement.textContent = 'Prateleira deletado!';
            // Adicionar o elemento de alerta ao DOM
            var containerElement = document.getElementById('aviso');
            containerElement.appendChild(alertElement);
            console.log(data);
        })
        .catch(error => {
            var containerElement = document.getElementById('aviso');
            var alertElement = document.createElement('div');
            alertElement.classList.add('alert', 'alert-danger');
            alertElement.textContent = 'Prateleira não deletada!';
            // Adicionar o elemento de alerta ao DOM
            var containerElement = document.getElementById('aviso');
            containerElement.appendChild(alertElement);
            console.error(error);
        });

}


function update(prateleira) {

    //console.log(JSON.stringify(usuario));

    let url = "";
    url = 'http://localhost/backEndBD/prateleiras.php';

    fetch(url, {
        method: 'PUT',
        body: JSON.stringify(prateleira),
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
            alertElement.textContent = 'Prateleira alterado!';
            // Adicionar o elemento de alerta ao DOM
            var containerElement = document.getElementById('aviso');
            containerElement.appendChild(alertElement);
            console.log(data);
        })
        .catch(error => {
            var containerElement = document.getElementById('aviso');
            var alertElement = document.createElement('div');
            alertElement.classList.add('alert', 'alert-danger');
            alertElement.textContent = 'Prateleira não alterada!';
            // Adicionar o elemento de alerta ao DOM
            var containerElement = document.getElementById('aviso');
            containerElement.appendChild(alertElement);
            console.error(error);
        });

}


