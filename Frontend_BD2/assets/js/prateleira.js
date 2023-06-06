// window.onload = function() {

//   // logado?
//   var intervalo = 2000; // Executar a cada 2 segundos

//   // Iniciar o intervalo
//   var intervalID = setInterval(verificarLogin, intervalo);

//   function verificarLogin() {

//       fetch('http://localhost/backEndBD/auth.php', {
//           method: 'GET',
//           //headers: {
//           //    'Content-Type': 'application/json'
//          // },
//           //body: JSON.stringify(dadosFormatados)
//       })
//           .then(response => response.json())
//           .then(data => {
//               // Aqui você pode lidar com a resposta da API
//               if (data.status === false) {
//                   window.location.href = "index.html";
//               }
//               else{
//                   console.log('logado');
//               }
//               console.log(data);
//           })
//           .catch(error => {
//               // Aqui você pode lidar com erros na requisição
//               console.error(error);
//           });
//   }

//   };






document.getElementById("storageForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Evita o envio do formulário
  
    var numero =  document.getElementById('prateleira').value;
    var nome = document.getElementById('nome').value;
    var capacidade = document.getElementById('capacidade').value;

  
    var jsonData = {
          numero: numero,
          nome: nome,
          capacidade:capacidade
      };
  
  
  
  
    
        enviarDadosParaAPI(jsonData);
 
  
  
  
  
    // //
  
  
  
  
  
  
  
  
    // Verifica se todos os campos estão preenchidos antes de enviar para a API
    // if (validarCampos(jsonData)) {
    //   enviarDadosParaAPI(jsonData);
    // }
  
  
  
  });
  

  
  function enviarDadosParaAPI(jsonData) {
  
    fetch('http://localhost/backEndBD/prateleiras.php', {
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
          alertElement.textContent = 'Experimento cadastrado com sucesso!';
          // Adicionar o elemento de alerta ao DOM
  
          containerElement.appendChild(alertElement);
  
  
        }
        else {
          var containerElement = document.getElementById('aviso');
          var alertElement = document.createElement('div');
          alertElement.classList.add('alert', 'alert-danger');
          alertElement.textContent = 'Experimento não cadastrado!';
          // Adicionar o elemento de alerta ao DOM
          var containerElement = document.getElementById('aviso');
          containerElement.appendChild(alertElement);
  
        }
  
  

  
  
      })
      .catch(error => {
        var containerElement = document.getElementById('aviso');
        var alertElement = document.createElement('div');
        alertElement.classList.add('alert', 'alert-danger');
        alertElement.textContent = 'Experimento não cadastrado, pois numero do experiemnto já existe!';
        // Adicionar o elemento de alerta ao DOM
        var containerElement = document.getElementById('aviso');
        containerElement.appendChild(alertElement);
        console.error(error);
      });
  
  
    console.log(jsonData);
  
  }
  