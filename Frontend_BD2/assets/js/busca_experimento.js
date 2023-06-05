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



var aula = {};


//atributos de usuarios

document.getElementById("btnBuscar").addEventListener("click", function () {
    event.preventDefault();
    var id = document.getElementById('id').value;
    mostrar(id);
});


//Função de deletar
document.getElementById("btnDeletar").addEventListener("click", function () {
    event.preventDefault();
    let id = document.getElementById("id").value;
    deletar(id);
});

//Função de alterar:
document.getElementById("btnAlterar").addEventListener("click", function () {
    event.preventDefault();
    console.log("Alterou");
    
  // Obtém os valores dos campos do formulário
  let numeroExperimento = document.getElementById("id").value;
  let objetivo = document.getElementById("objetivo").value;
  let  nome = document.getElementById("nome").value;
  let  pdfFile = document.getElementById("pdf").files[0];
  let  discussao = document.getElementById("discussao").value;
  let  imagemFile = document.getElementById("imagem").files[0];
  let  vezesRealizadas = document.getElementById("vezesRealizadas").value;

  // Cria um objeto JSON com os dados do formulário
  var jsonData = {
    numeroExperimento:numeroExperimento,
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



    update(jsonData);

});


function mostrar(id) {
    let url = 'http://localhost/backEndBD/experimento.php?id=' + id;

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
                alertElement.textContent = 'Numero experimento encontrado com sucesso!';
                containerElement.appendChild(alertElement);

                let objetivo = document.getElementById("objetivo");
                let nome = document.getElementById("nome");
                let numeroExperimento = document.getElementById("numeroExperimento");
                let pdfFile = document.getElementById("pdf");
                let discussao = document.getElementById("discussao");
                let imagemFile = document.getElementById("imagem");
                let vezesRealizadas = document.getElementById("vezesRealizadas");
               
                objetivo.value = data.objetivo;
                nome.value = data.nome;
                numeroExperimento.value = data.numero_experimento;
                discussao.value = data.discussao;
                vezesRealizadas.value = data.vezes_realizadas;
                
            } else {
                var containerElement = document.getElementById('aviso');
                var alertElement = document.createElement('div');
                alertElement.classList.add('alert', 'alert-danger');
                alertElement.textContent = 'Numero experimento não encontrado!';
                containerElement.appendChild(alertElement);
                console.error(error);
            }


        })
        .catch(error => {
        });
}


function deletar(numeroExperimento) {

    let url = "";
    url = 'http://localhost/backEndBD/experimento.php';


    fetch(url, {
        method: 'DELETE',
        body: JSON.stringify({ numeroExperimento: numeroExperimento}),
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
            alertElement.textContent = 'Experimento deletado!';
            // Adicionar o elemento de alerta ao DOM
            var containerElement = document.getElementById('aviso');
            containerElement.appendChild(alertElement);
            console.log(data);
        })
        .catch(error => {
            var containerElement = document.getElementById('aviso');
            var alertElement = document.createElement('div');
            alertElement.classList.add('alert', 'alert-danger');
            alertElement.textContent = 'Experimento não deletada!';
            // Adicionar o elemento de alerta ao DOM
            var containerElement = document.getElementById('aviso');
            containerElement.appendChild(alertElement);
            console.error(error);
        });

}


function update(reserva) {

    //console.log(JSON.stringify(usuario));

    let url = "";
    url = 'http://localhost/backEndBD/experimento.php';

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
            alertElement.textContent = 'Experimento alterado!';
            // Adicionar o elemento de alerta ao DOM
            var containerElement = document.getElementById('aviso');
            containerElement.appendChild(alertElement);
            console.log(data);
        })
        .catch(error => {
            var containerElement = document.getElementById('aviso');
            var alertElement = document.createElement('div');
            alertElement.classList.add('alert', 'alert-danger');
            alertElement.textContent = 'Experimento não alterada!';
            // Adicionar o elemento de alerta ao DOM
            var containerElement = document.getElementById('aviso');
            containerElement.appendChild(alertElement);
            console.error(error);
        });

}


