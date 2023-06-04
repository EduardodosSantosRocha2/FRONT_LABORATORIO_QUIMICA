// window.onload = function() {

//     // logado?
//     var intervalo = 2000; // Executar a cada 2 segundos
    
//     // Iniciar o intervalo
//     var intervalID = setInterval(verificarLogin, intervalo);
    
//     function verificarLogin() {
        
//         fetch('http://localhost/backEndBD/auth.php', {
//             method: 'GET',
//             //headers: {
//             //    'Content-Type': 'application/json'
//            // },
//             //body: JSON.stringify(dadosFormatados)
//         })
//             .then(response => response.json())
//             .then(data => {
//                 // Aqui você pode lidar com a resposta da API
//                 if (data.status === false) {
//                     window.location.href = "index.html";
//                 }
//                 else{
//                     console.log('logado');
//                 }
//                 console.log(data);
//             })
//             .catch(error => {
//                 // Aqui você pode lidar com erros na requisição
//                 console.error(error);
//             });
//     }
    
//     };