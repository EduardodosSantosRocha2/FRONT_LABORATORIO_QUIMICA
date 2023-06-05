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




// Função para exibir a tabela de aulas buscar da api e passar para a tela
function exibirTabelaInfoAulas() {
  var tabelaInfoAulas = document.getElementById("tabelaInfoAulas");
  var tabelaInfoPreparacoes = document.getElementById("tabelaInfoPreparacoes");

  tabelaInfoAulas.classList.remove("hidden");
  tabelaInfoPreparacoes.classList.add("hidden");
  gerartabelaInfoAulas();
}

// Função para exibir a tabela de informações de preparações buscar da api e passar para a tela
function exibirTabelaInfoPreparacoes() {
  var tabelaInfoAulas = document.getElementById("tabelaInfoAulas");
  var tabelaInfoPreparacoes = document.getElementById("tabelaInfoPreparacoes");

  tabelaInfoAulas.classList.add("hidden");
  tabelaInfoPreparacoes.classList.remove("hidden");
  gerartabelaInfoPreparacoes();
}



// Adicionar o evento de clique (click) no botão de busca
var btnBuscar = document.getElementById("btnBuscar");
btnBuscar.addEventListener("click", function (event) {
  event.preventDefault();

  var radioOption1 = document.getElementById("radioOption1");
  var radioOption2 = document.getElementById("radioOption2");

  if (radioOption1.checked) {
    exibirTabelaInfoAulas();
  } else if (radioOption2.checked) {
    exibirTabelaInfoPreparacoes();
  }


});



function gerartabelaInfoAulas() {

  var url = 'http://localhost/backEndBD/info_aulas.php';
  var arraysave;

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
      var arraysave = data.experimentos;
    
      var tabelaInfoAulas = document.getElementById("tabelaInfoAulas");
      var tbody = tabelaInfoAulas.querySelector("tbody");
      tbody.innerHTML = "";
    
      arraysave.forEach(data => {
        var tr = document.createElement("tr");
    
        var tdNome = document.createElement("td");
        tdNome.textContent = data.nome;
        tr.appendChild(tdNome);
    
        var tdTopico = document.createElement("td");
        tdTopico.textContent = data.topico;
        tr.appendChild(tdTopico);
    
        var tdHorario = document.createElement("td");
        tdHorario.textContent = data.horario_reserva;
        tr.appendChild(tdHorario);
    
        tbody.appendChild(tr);
      });
    })
    .catch(error => {
      // Aqui você pode lidar com erros na requisição
      console.error(error);
    });
}


function gerartabelaInfoPreparacoes() {

  var url = 'http://localhost/backEndBD/info_prepara.php';
  var arraysave;

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
      var arraysave = data.experimentos;
    
      var tabelaInfoAulas = document.getElementById("tabelaInfoPreparacoes");
      var tbody = tabelaInfoAulas.querySelector("tbody");
      tbody.innerHTML = "";
      
      arraysave.forEach(data => {

        console.log(data)

        var tr = document.createElement("tr");
    
        var tdNome = document.createElement("td");
        tdNome.textContent = data.nomeusuario;
        tr.appendChild(tdNome);
    
        var tdTopico = document.createElement("td");
        tdTopico.textContent = data.nomeprateleira;
        tr.appendChild(tdTopico);
    
        var tdHorario = document.createElement("td");
        tdHorario.textContent = data.nomeexperimento;
        tr.appendChild(tdHorario);
    
        tbody.appendChild(tr);
      });
    })
    .catch(error => {
      // Aqui você pode lidar com erros na requisição
      console.error(error);
    });

}

