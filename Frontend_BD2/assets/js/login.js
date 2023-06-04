document.addEventListener('DOMContentLoaded', function () {
    var loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Impede o envio do formulário

        // Obter os valores dos campos do formulário
        var login = document.getElementById('login').value;
        var senha = document.getElementById('senha').value;

        // Formatar os valores para envio à API
        var dadosFormatados = {
            login: login,
            senha: senha
        };

        console.log(dadosFormatados);


        fetch('http://localhost/backEndBD/auth.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosFormatados)
        })
            .then(response => response.json())
            .then(data => {
                // Aqui você pode lidar com a resposta da API
                if (data.status === true) {
                    window.location.href = "home.html";
                }
                else {         
                    var alertElement = document.createElement('div'); 
                    alertElement.classList.add('alert', 'alert-danger');
                    alertElement.textContent = 'Senha ou usuario invalido!';
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


    });
});