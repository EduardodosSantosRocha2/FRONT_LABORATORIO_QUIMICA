window.onload = function () {
    // logado?
    var intervalo = 2000; // Executar a cada 2 segundos
    verificarLogin();
    // Iniciar o intervalo
    var intervalID = setInterval(verificarLogin, intervalo);
  
    function verificarLogin() {
      fetch("http://localhost/backEndBD/auth.php", {
        method: "GET",
        //headers: {
        //    'Content-Type': 'application/json'
        // },
        //body: JSON.stringify(dadosFormatados)
      })
        .then((response) => response.json())
        .then((data) => {
          // Aqui você pode lidar com a resposta da API
          if (data.status === false) {
            window.location.href = "index.html";
          } else {
            verifyType(data.usuario.cpf);
          }
        })
        .catch((error) => {
          // Aqui você pode lidar com erros na requisição
          console.error(error);
        });
    }
  }
  
  function verifyType(cpf){
      fetch("http://localhost/backEndBD/info_usuario.php", {
        method: "POST",
        //headers: {
        //    'Content-Type': 'application/json'
        // },
        body: JSON.stringify({cpf: cpf})
      })
        .then((response) => response.json())
        .then((data) => {
          var x = document.getElementById("usuario");
          x.innerHTML = data.valor;
          if(data.valor == "Professor"){
              var tec = document.querySelectorAll('.tec');
              tec.forEach(element => {
                  element.hidden = true;
              });
          }
        })
        .catch((error) => {
          // Aqui você pode lidar com erros na requisição
          console.error(error);
        });
  }


  