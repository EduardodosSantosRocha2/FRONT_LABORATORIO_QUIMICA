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




//atributos de usuarios

document.getElementById("btnBuscar").addEventListener("click", function () {
    console.log('ola');
   
    event.preventDefault();
    var NumeroExperimentos = document.getElementById('NumeroExperimentos').value;
    console.log(NumeroExperimentos);
   mostrar(NumeroExperimentos);
});


function mostrar(id) {
    let url = 'http://localhost/backEndBD/img.php?id=' + id;

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

                var base64Input = data.arquivo_img;

                console.log('1');
                console.log(base64Input);

                base64Input = convertHexToBase64();
                
                function convertHexToBase64() {
                    var decodedData = atob(base64Input);
                    return decodedData;
                }
                console.log('2');
                console.log(base64Input);


                convertToPDF();
                function convertToPDF() {
                    var decodedData = atob(base64Input);
                    var pdfViewer = document.getElementById('pdf-viewer');
                    pdfViewer.innerHTML = '<embed src="data:application/pdf;base64,' + btoa(decodedData) + '" type="application/pdf" width="100%" height="100%">';
                }


            } else {
                var containerElement = document.getElementById('aviso');
                var alertElement = document.createElement('div');
                alertElement.classList.add('alert', 'alert-danger');
                alertElement.textContent = 'Imagem não encontrada!';
                containerElement.appendChild(alertElement);
                console.error(error);
            }


        })
        .catch(error => {
        });
}




