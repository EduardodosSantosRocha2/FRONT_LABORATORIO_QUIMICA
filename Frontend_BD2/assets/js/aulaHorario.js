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



var reserva = {};


//atributos de usuarios

document.getElementById("btnBuscar").addEventListener("click", function () {
    var id = document.getElementById("id").value;
    event.preventDefault();
    mostrar(id);
});


//Função de deletar
document.getElementById("btnDeletar").addEventListener("click", function () {
    event.preventDefault();
    var id = document.getElementById("id").value;
    deletar(id);
});

//Função de alterar:
document.getElementById("btnAlterar").addEventListener("click", function () {
    event.preventDefault();
    console.log("Alterou");
    
    var horario = document.getElementById("horarioReserva").value;
    var data = document.getElementById("dataReserva").value;
    var cpf = document.getElementById("cpfProfessor").value;
    var id = document.getElementById("id").value;

        reserva = {
            id:id,
            cpf: cpf,
            data: data,
            horario: horario
        };
     


    update(reserva);

});


function mostrar(cpfBusca) {
    let url = 'http://localhost/backEndBD/reserva.php?id=' + cpfBusca;

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

                var horario = document.getElementById("horarioReserva");
                var dataR = document.getElementById("dataReserva");
                var cpfr = document.getElementById("cpfProfessor");
                horario.value = data.horario_reserva;
                dataR.value = data.data_reserva;
                cpfr.value = data.fk_professor_fk_usuario_cpf;
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
    url = 'http://localhost/backEndBD/reserva.php';
   

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
    url = 'http://localhost/backEndBD/reserva.php';

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


