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






document.getElementById("formExperimento").addEventListener("submit", function (event) {
  event.preventDefault(); // Evita o envio do formulário

  // Obtém os valores dos campos do formulário
  var objetivo = document.getElementById("objetivo").value;
  var nome = document.getElementById("nome").value;
  var numeroExperimento = document.getElementById("numeroExperimento").value;
  var pdfFile = document.getElementById("pdf").files[0];
  var discussao = document.getElementById("discussao").value;
  var imagemFile = document.getElementById("imagem").files[0];
  var vezesRealizadas = document.getElementById("vezesRealizadas").value;

  // Cria um objeto JSON com os dados do formulário
  var jsonData = {
    objetivo: objetivo,
    nome: nome,
    numeroExperimento: numeroExperimento,
    discussao: discussao,
    vezesRealizadas: vezesRealizadas,
    arquivoIMG: "",
    arquivoPDF: ""
  };


  // Converte a imagem para Base64
  if (imagemFile) {
    var readerImagem = new FileReader();
    readerImagem.onloadend = function () {
      var base64Imagem = readerImagem.result;
      jsonData.arquivoIMG = base64Imagem;
    };
    readerImagem.readAsDataURL(imagemFile);
  }

  // Converte o arquivo PDF para Base64
  if (pdfFile) {
    var readerPDF = new FileReader();
    readerPDF.onloadend = function () {
      var base64PDF = readerPDF.result;
      jsonData.arquivoPDF = base64PDF;
    };
    readerPDF.readAsDataURL(pdfFile);

  }


  // Verifica se todos os campos estão preenchidos antes de enviar para a API
  if (validarCampos(jsonData)) {
    enviarDadosParaAPI(jsonData);
  }



});

//TESTE PARA VERIFICAÇÃO
function validarCampos(jsonData) {
  // Verifica se todos os campos obrigatórios foram preenchidos
  if (jsonData.objetivo && jsonData.nome && jsonData.numeroExperimento && jsonData.discussao) {
    return true;
  } else {
    console.log("Por favor, preencha todos os campos obrigatórios.");
    return false;
  }
}

function enviarDadosParaAPI(jsonData) {

  fetch('http://localhost/backEndBD/experimento.php', {
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
