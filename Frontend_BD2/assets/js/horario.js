document.getElementById("formReserva").addEventListener("submit", function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Obter os valores dos campos
    var horario = document.getElementById("horarioReserva").value;
    var datar = document.getElementById("dataReserva").value;

 
    // Criar objeto JSON com os dados
    // Criar objeto JSON com os dados
    let jsonData = {
        "horario": horario,
        "datar":  datar
    };


    addReserva(jsonData);
});

function addReserva(reservalab) {
    // Converte o objeto em JSON
    let url = "http://localhost/backEndBD/VerificarDisLab.php";

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reservalab)
    })
        .then(response => response.json())
        .then(data => {

            if (data.valor === 1) {

                // Seleciona o formulário pelo ID


                // Itera sobre os campos de entrada e limpa seu valor


                var alertElement = document.createElement('div');
                alertElement.classList.add('alert', 'alert-danger');
                alertElement.textContent = 'Horario indisponivel!';
                // Adicionar o elemento de alerta ao DOM
                var containerElement = document.getElementById('aviso');
                containerElement.appendChild(alertElement);


            }
            else {
                var alertElement = document.createElement('div');
                alertElement.classList.add('alert', 'alert-success');
                alertElement.textContent = 'Horario disponivel!';
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
