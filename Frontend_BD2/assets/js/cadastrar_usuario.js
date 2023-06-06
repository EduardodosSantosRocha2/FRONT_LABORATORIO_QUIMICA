// window.onload = function() {

//     // logado?
//     var intervalo = 20000; // Executar a cada 2 segundos

//     // Iniciar o intervalo
//     //var intervalID = setInterval(verificarLogin, intervalo);

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
//                     //console.log('logado');
//                 }
//                 //console.log(data);
//             })
//             .catch(error => {
//                 // Aqui você pode lidar com erros na requisição
//                 console.error(error);
//             });
//     }

// };




var tipoUsuarioSelect = document.getElementById("tipo");
var tecnicoFields = document.getElementById("tecnico-fields");
var professorFields = document.getElementById("professor-fields");



tipoUsuarioSelect.addEventListener("change", function () {
    if (this.value === "tecnico") {
        tecnicoFields.style.display = "block";
        professorFields.style.display = "none";
    } else if (this.value === "professor") {
        tecnicoFields.style.display = "none";
        professorFields.style.display = "block";
    } else {
        tecnicoFields.style.display = "none";
        professorFields.style.display = "none";
    }
});

document.getElementById("userForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Impede o envio do formulário

    // Obtém os valores dos campos do formulário
    var cpf = document.getElementById("cpf").value;
    var email = document.getElementById("email").value;
    var nome = document.getElementById("nome").value;
    var telefone = document.getElementById("telefone").value;
    var tipo = document.getElementById("tipo").value;
    var numeroCRQ = document.getElementById("crq").value;
    var numAulas = document.getElementById("numAulas").value
    var senha = document.getElementById("senha").value
    var usuario = {

    };

    if (tipo === "tecnico") {
        var certificado = document.getElementById("certificado").value;
        var numeroCRQ = document.getElementById("crq").value;
        var cargaHoraria = document.getElementById("carga_horaria").value;
        usuario = {
            cpf: cpf,
            email: email,
            nome: nome,
            telefone: telefone,
            certificado: certificado,
            numeroCRQ: numeroCRQ,
            cargaHoraria: cargaHoraria,
            senha: senha

        };
        addTecnico();

    } else if (tipo === "professor") {
        var cursosMinistrados = document.getElementById("curso_ministrados").value;
        var experienciaEnsino = document.getElementById("experiencia_ensino").value;
        var areaEspecializacao = document.getElementById("area_especializacao").value;

        usuario = {
            cpf: cpf,
            email: email,
            nome: nome,
            telefone: telefone,
            cursoMinistrados: cursosMinistrados,
            experienciaEnsino: experienciaEnsino,
            areaEspecializacao: areaEspecializacao,
            numAulas: numAulas,
            senha: senha
        };

        addProfessor();

    }

    // Exibe o objeto JSON no console
    console.log(JSON.stringify(usuario));

    function addProfessor() {

        fetch('http://localhost/backEndBD/professor.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === true) {
                    var containerElement = document.getElementById('aviso');
                    // Seleciona o formulário pelo ID
                    var form = document.getElementById('userForm');

                    // Obtém todos os campos de entrada dentro do formulário
                    var inputs = form.querySelectorAll('input');

                    // Itera sobre os campos de entrada e limpa seu valor
                   

                    var alertElement = document.createElement('div');
                    alertElement.classList.add('alert', 'alert-success');
                    alertElement.textContent = 'Usuario cadastrado com sucesso!';
                    // Adicionar o elemento de alerta ao DOM
                    
                    containerElement.appendChild(alertElement);


                }
                else {
                    var containerElement = document.getElementById('aviso');
                    var alertElement = document.createElement('div');
                    alertElement.classList.add('alert', 'alert-danger');
                    alertElement.textContent = 'Usuario não cadastrado, devido a esse CPF já ser cadastrado!';
                    // Adicionar o elemento de alerta ao DOM
                    var containerElement = document.getElementById('aviso');
                    containerElement.appendChild(alertElement);

                }
                console.log(data);
            })
            .catch(error => {
                    var containerElement = document.getElementById('aviso');
                    var alertElement = document.createElement('div');
                    alertElement.classList.add('alert', 'alert-danger');
                    alertElement.textContent = 'Usuario não cadastrado, devido a esse CPF já ser cadastrado!';
                    // Adicionar o elemento de alerta ao DOM
                    var containerElement = document.getElementById('aviso');
                    containerElement.appendChild(alertElement);
                console.error(error);
            });

    }

    function addTecnico() {

        fetch('http://localhost/backEndBD/tecnico.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data.status);
                if (data.status === true) {

                    // Seleciona o formulário pelo ID
                    var form = document.getElementById('userForm');

                    // Obtém todos os campos de entrada dentro do formulário
                    var inputs = form.querySelectorAll('input');

                    // Itera sobre os campos de entrada e limpa seu valor


                    var alertElement = document.createElement('div');
                    alertElement.classList.add('alert', 'alert-success');
                    alertElement.textContent = 'Usuario cadastrado com sucesso!';
                    // Adicionar o elemento de alerta ao DOM
                    var containerElement = document.getElementById('aviso');
                    containerElement.appendChild(alertElement);


                }
                else {
                    var alertElement = document.createElement('div');
                    alertElement.classList.add('alert', 'alert-danger');
                    alertElement.textContent = 'Usuario não cadastrado!';
                    // Adicionar o elemento de alerta ao DOM
                    var containerElement = document.getElementById('aviso');
                    containerElement.appendChild(alertElement);

                }
                console.log(data);

            })
            .catch(error => {
                // Aqui você pode lidar com erros na requisição
                console.error(error);
            });
    }

    // Envie o objeto JSON para a API aqui



    //Mostrar mensagem de sucesso ou erro ao cadastrar




});
