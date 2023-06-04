document.getElementById("formReserva").addEventListener("submit", function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    attTurno();
});

function attTurno(reservalab) {
    // Converte o objeto em JSON
    let url = "http://localhost/backEndBD/attTurno.php";

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {

            if (data.valor === 1) {

                // Seleciona o formulário pelo ID


                // Itera sobre os campos de entrada e limpa seu valor


                var alertElement = document.createElement('div');
                alertElement.classList.add('alert', 'alert-success');
                alertElement.textContent = 'Turnos atualizados!';
                // Adicionar o elemento de alerta ao DOM
                var containerElement = document.getElementById('aviso');
                containerElement.appendChild(alertElement);


            }
            else {
                var alertElement = document.createElement('div');
                alertElement.classList.add('alert', 'alert-danger');
                alertElement.textContent = 'Turnos não atualizados!';
                // Adicionar o elemento de alerta ao DOM
                var containerElement = document.getElementById('aviso');
                containerElement.appendChild(alertElement);

            }




            console.log(data);
        })
        .catch(error => {
            // Aqui você pode lidar com erros na requisição
            console.error(error);
        });
}
