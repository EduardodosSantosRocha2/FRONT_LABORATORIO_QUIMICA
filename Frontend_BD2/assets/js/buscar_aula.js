// window.onload = function() {

// // logado?
// var intervalo = 2000; // Executar a cada 2 segundos

// // Iniciar o intervalo
// var intervalID = setInterval(verificarLogin, intervalo);

// function verificarLogin() {

//     fetch('http://localhost/backEndBD/auth.php', {
//         method: 'GET',
//         //headers: {
//         //    'Content-Type': 'application/json'
//        // },
//         //body: JSON.stringify(dadosFormatados)
//     })
//         .then(response => response.json())
//         .then(data => {
//             // Aqui você pode lidar com a resposta da API
//             if (data.status === false) {
//                 window.location.href = "index.html";
//             }
//             else{
//                 console.log('logado');
//             }
//             console.log(data);
//         })
//         .catch(error => {
//             // Aqui você pode lidar com erros na requisição
//             console.error(error);
//         });
// }

// };



var aula = {};


//atributos de usuarios

document.getElementById("btnBuscar").addEventListener("click", function () {
    event.preventDefault();
    var id = document.getElementById('id_Aula').value;
    mostrar(id);
});


//Função de deletar
document.getElementById("btnDeletar").addEventListener("click", function () {
    event.preventDefault();
    let id = document.getElementById("id_Aula").value;
    deletar(id);
});

//Função de alterar:
document.getElementById("btnAlterar").addEventListener("click", function () {
    event.preventDefault();
    console.log("Alterou");
    
    let id = document.getElementById("id_Aula").value;
    let cpf = document.getElementById('cpf').value;
    let topico = document.getElementById('topico').value;
    let nome = document.getElementById('nome').value;
    let topicos_abordado = document.getElementById('temas').value;

    aula = {
        id: id,
        cpf: cpf,
        topico: topico,
        nome: nome,
        topicos_abordado,topicos_abordado
    };



    update(aula);

});


function mostrar(cpfBusca) {
    let url = 'http://localhost/backEndBD/aula.php?id=' + cpfBusca;

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
                alertElement.textContent = 'Id reserva encontrado com sucesso!';
                containerElement.appendChild(alertElement);

                var cpf = document.getElementById('cpf');
                var topico = document.getElementById('topico');
                var nome = document.getElementById('nome');
                var topicos_abordado = document.getElementById('temas');
               
                cpf.value = data.fk_professor_fk_usuario_cpf;
                topico.value = data.topico;
                nome.value = data.nome;
                topicos_abordado.value = data.topicos_abordado;
            } else {
                var containerElement = document.getElementById('aviso');
                var alertElement = document.createElement('div');
                alertElement.classList.add('alert', 'alert-danger');
                alertElement.textContent = 'Id reserva não encontrado!';
                containerElement.appendChild(alertElement);
                console.error(error);
            }


        })
        .catch(error => {
        });
}


function deletar(id) {

    let url = "";
    url = 'http://localhost/backEndBD/aula.php';


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
            alertElement.classList.add('alert', 'alert-success');
            alertElement.textContent = 'Reserva deletado!';
            // Adicionar o elemento de alerta ao DOM
            var containerElement = document.getElementById('aviso');
            containerElement.appendChild(alertElement);
            console.log(data);
        })
        .catch(error => {
            var containerElement = document.getElementById('aviso');
            var alertElement = document.createElement('div');
            alertElement.classList.add('alert', 'alert-danger');
            alertElement.textContent = 'Reserva não deletada!';
            // Adicionar o elemento de alerta ao DOM
            var containerElement = document.getElementById('aviso');
            containerElement.appendChild(alertElement);
            console.error(error);
        });

}


function update(reserva) {

    //console.log(JSON.stringify(usuario));

    let url = "";
    url = 'http://localhost/backEndBD/aula.php';

    fetch(url, {
        method: 'PUT',
        body: JSON.stringify(reserva),
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
            alertElement.textContent = 'Reserva alterado!';
            // Adicionar o elemento de alerta ao DOM
            var containerElement = document.getElementById('aviso');
            containerElement.appendChild(alertElement);
            console.log(data);
        })
        .catch(error => {
            var containerElement = document.getElementById('aviso');
            var alertElement = document.createElement('div');
            alertElement.classList.add('alert', 'alert-danger');
            alertElement.textContent = 'Reserva não alterada!';
            // Adicionar o elemento de alerta ao DOM
            var containerElement = document.getElementById('aviso');
            containerElement.appendChild(alertElement);
            console.error(error);
        });

}


