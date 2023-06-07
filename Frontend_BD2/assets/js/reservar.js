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




document.getElementById("formReserva").addEventListener("submit", function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Obter os valores dos campos
    var horario = document.getElementById("horarioReserva").value;
    var dataR = document.getElementById("dataReserva").value;
    var cpf = document.getElementById("cpfProfessor").value;

    // Criar objeto JSON com os dados
    let jsonData = {
        "horario": horario,
        "data": dataR,
        "cpf": cpf
    };


    addReserva(jsonData);


});


function addReserva(reservalab) {
    // Converte o objeto em JSON


    let url = "http://localhost/backEndBD/reserva.php";

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reservalab)
    })
        .then(response => response.json())
        .then(data => {

            if (data.status === true) {
                var containerElement = document.getElementById('aviso');
                var alertElement = document.createElement('div');
                alertElement.classList.add('alert', 'alert-success');
                alertElement.textContent = 'Horario cadastrado com sucesso!';
                // Adicionar o elemento de alerta ao DOM

                containerElement.appendChild(alertElement);


            }
            else {
                var containerElement = document.getElementById('aviso');
                var alertElement = document.createElement('div');
                alertElement.classList.add('alert', 'alert-danger');
                alertElement.textContent = 'CPF professor não cadastrado!';
                // Adicionar o elemento de alerta ao DOM
                var containerElement = document.getElementById('aviso');
                containerElement.appendChild(alertElement);

            }
        })
        .catch(error => {
            var containerElement = document.getElementById('aviso');
            var alertElement = document.createElement('div');
            alertElement.classList.add('alert', 'alert-danger');
            alertElement.textContent = 'CPF professor não cadastrado!';
            // Adicionar o elemento de alerta ao DOM
            var containerElement = document.getElementById('aviso');
            containerElement.appendChild(alertElement);
            console.error(error);
        });
}
