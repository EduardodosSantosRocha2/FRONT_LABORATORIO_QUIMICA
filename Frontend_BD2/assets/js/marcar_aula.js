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




document.getElementById('formAula').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita o envio do formulário

    // Captura os valores dos campos do formulário
    var cpf = document.getElementById('cpf').value;
    var topico = document.getElementById('topico').value;
    var nome = document.getElementById('nome').value;
    var topicos_abordado = document.getElementById('temas').value;

    // Cria o objeto com os valores capturados
    let aula = {
        cpf: cpf,
        topico: topico,
        nome: nome,
        topicos_abordado: topicos_abordado
    };

    
    addAula(aula);

    
});

function addAula(aula) {
    // Converte o objeto em JSON
    

    let url = "http://localhost/backEndBD/aula.php";

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(aula)
    })
        .then(response => response.json())
        .then(data => {
            
            console.log(data)
                      
            if (data.status === true) {
                var containerElement = document.getElementById('aviso');
        
                var alertElement = document.createElement('div');
                alertElement.classList.add('alert', 'alert-success');
                alertElement.textContent = 'Aula cadastrada com sucesso!';
                // Adicionar o elemento de alerta ao DOM
        
                containerElement.appendChild(alertElement);
        
        
              }
              else {
                var containerElement = document.getElementById('aviso');
                var alertElement = document.createElement('div');
                alertElement.classList.add('alert', 'alert-danger');
                alertElement.textContent = 'CPF do professor não cadastrado!';
                // Adicionar o elemento de alerta ao DOM
                var containerElement = document.getElementById('aviso');
                containerElement.appendChild(alertElement);
        
              }
        })
        .catch(error => {
                var containerElement = document.getElementById('aviso');
                var alertElement = document.createElement('div');
                alertElement.classList.add('alert', 'alert-danger');
                alertElement.textContent = 'CPF do professor não cadastrado!';
                // Adicionar o elemento de alerta ao DOM
                var containerElement = document.getElementById('aviso');
                containerElement.appendChild(alertElement);
            console.error(error);
        });
}


