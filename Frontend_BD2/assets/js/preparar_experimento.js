
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

    const prateleira_numero = document.getElementById('numeroPrateleira').value;
    const experimento_numero = document.getElementById('numeroExperimento').value;
    const tecnico_cpf = document.getElementById('cpfTecnico').value;
    const quantidade = document.getElementById('quantidade').value;
    


    var jsonData = {
        prateleira_numero: prateleira_numero,
        experimento_numero: experimento_numero,
        tecnico_cpf: tecnico_cpf,
        quantidade: quantidade
    };



    enviarDadosParaAPI(jsonData);





    // //








    // Verifica se todos os campos estão preenchidos antes de enviar para a API
    // if (validarCampos(jsonData)) {
    //   enviarDadosParaAPI(jsonData);
    // }



});



function enviarDadosParaAPI(jsonData) {

    fetch('http://localhost/backEndBD/prepara.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    })
        .then(response => response.json())
        .then(data => {
            console.log('data: ');
            console.log(data)
            if (data.status === true) {
                var containerElement = document.getElementById('aviso');

                var alertElement = document.createElement('div');
                alertElement.classList.add('alert', 'alert-success');
                alertElement.textContent = 'Experimento preparado e cadastrado com sucesso!';
                // Adicionar o elemento de alerta ao DOM

                containerElement.appendChild(alertElement);


            }
            else {
                var containerElement = document.getElementById('aviso');
                var alertElement = document.createElement('div');
                alertElement.classList.add('alert', 'alert-danger');
                alertElement.textContent = 'Experimento preparado não cadastrado!';
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

