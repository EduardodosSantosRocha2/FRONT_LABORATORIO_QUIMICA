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
                var codigoBase64 = data.arquivo_pdf;

                codigoBase64 = convertHexToBase64();

                function convertHexToBase64() {
                    var decodedData = atob(codigoBase64);
                    
                    return decodedData;
                }

                console.log(codigoBase64);
                
                converterBase64ParaImagem();

                function converterBase64ParaImagem() {

                    try {
                        var blob = base64ParaBlob(codigoBase64);
                        var urlImagem = URL.createObjectURL(blob);

                        var imagemElemento = document.getElementById('imagem');
                        imagemElemento.src = urlImagem;
                    } catch (error) {
                        console.error('Ocorreu um erro ao converter o código base64:', error);
                    }
                }

                function base64ParaBlob(codigoBase64) {
                    var partes = codigoBase64.split(';base64,');
                    var tipo = partes[0].split(':')[1];
                    var binario = atob(partes[1]);
                    var tamanho = binario.length;
                    var buffer = new ArrayBuffer(tamanho);
                    var view = new Uint8Array(buffer);

                    for (var i = 0; i < tamanho; i++) {
                        view[i] = binario.charCodeAt(i);
                    }

                    return new Blob([view], { type: tipo });
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




