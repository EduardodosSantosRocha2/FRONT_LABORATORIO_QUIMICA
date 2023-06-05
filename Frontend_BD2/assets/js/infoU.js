

document.getElementById("formInfo_User").addEventListener("submit", function (event) {
    event.preventDefault(); // Evita o envio do formulário
  
    // Obtém os valores dos campos do formulário
    var cpf = document.getElementById("CPF").value;
   console.log(cpf);

  
    // Cria um objeto JSON com os dados do formulário
    var jsonData = {
      cpf:cpf
    };
  
    enviarDadosParaAPI(jsonData);
  
  });
  

  
  function enviarDadosParaAPI(jsonData) {
  
    fetch('http://localhost/backEndBD/info_usuario.php', {
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
          alertElement.textContent = data.valor+' '+data.nome+' encontrado com sucesso!!';
          // Adicionar o elemento de alerta ao DOM
  
          containerElement.appendChild(alertElement);
  
  
        }
        else {
          var containerElement = document.getElementById('aviso');
          var alertElement = document.createElement('div');
          alertElement.classList.add('alert', 'alert-danger');
          alertElement.textContent = 'Erro: Usuario não encontrado!';
          // Adicionar o elemento de alerta ao DOM
          var containerElement = document.getElementById('aviso');
          containerElement.appendChild(alertElement);
  
        }
   
  
      })
      .catch(error => {
          var containerElement = document.getElementById('aviso');
          var alertElement = document.createElement('div');
          alertElement.classList.add('alert', 'alert-danger');
          alertElement.textContent = 'Erro: Usuario não encontrado!';
          // Adicionar o elemento de alerta ao DOM
          var containerElement = document.getElementById('aviso');
          containerElement.appendChild(alertElement);
        console.error(error);
      });
  
  
    console.log(jsonData);
  
  }
  