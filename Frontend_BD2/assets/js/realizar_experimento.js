
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




document.getElementById("formExperimento").addEventListener("submit", function (event) {
    event.preventDefault(); // Evita o envio do formulário
  
    // Obtém os valores dos campos do formulário
    var id = document.getElementById("ID_Aula").value;
    var numero = document.getElementById("NumeroExperimentos").value;
    var obs = document.getElementById("Observacao").value;

  
    // Cria um objeto JSON com os dados do formulário
    var jsonData = {
      id:id,
      numero:numero,
      obs:obs
    };
  
    enviarDadosParaAPI(jsonData);
  
  });
  

  
  function enviarDadosParaAPI(jsonData) {
  
    fetch('http://localhost/backEndBD/Realiza_experimento.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonData)
    })
      .then(response => response.json())
      .then(data => {
  
        if (data.status === true) {
          var containerElement = document.getElementById('aviso');
  
          var alertElement = document.createElement('div');
          alertElement.classList.add('alert', 'alert-success');
          alertElement.textContent = 'Realizar Experimento cadastrado com sucesso!';
          // Adicionar o elemento de alerta ao DOM
  
          containerElement.appendChild(alertElement);
  
  
        }
        else {
          var containerElement = document.getElementById('aviso');
          var alertElement = document.createElement('div');
          alertElement.classList.add('alert', 'alert-danger');
          alertElement.textContent = 'Erro: Realizar Experimento não cadastrado!';
          // Adicionar o elemento de alerta ao DOM
          var containerElement = document.getElementById('aviso');
          containerElement.appendChild(alertElement);
  
        }
   
  
      })
      .catch(error => {
          var containerElement = document.getElementById('aviso');
          var alertElement = document.createElement('div');
          alertElement.classList.add('alert', 'alert-danger');
          alertElement.textContent = 'Erro: Realizar Experimento não cadastrado!';
          // Adicionar o elemento de alerta ao DOM
          var containerElement = document.getElementById('aviso');
          containerElement.appendChild(alertElement);
        console.error(error);
      });
  
  
    console.log(jsonData);
  
  }
  