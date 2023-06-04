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
var cpf = document.getElementById("cpf");
var email = document.getElementById("email");
var nome = document.getElementById("nome");
var telefone = document.getElementById("telefone");
cpf.disabled = true;
/////////
var tipoUsuarioSelect = document.getElementById("tipo"); //seletor tipo de usuario
var tecnicoFields = document.getElementById("tecnico-fields"); //bloco de campos de tecnico
var certificado = document.getElementById("certificado");//campo de tecnico
var numeroCRQ = document.getElementById("crq");//campo de tecnico
var cargaHoraria = document.getElementById("carga_horaria"); //campo de tecnico
/////////
var professorFields = document.getElementById("professor-fields"); //bloco de campos de professor
var cursosMinistrados = document.getElementById("curso_ministrados"); //campo de professor
var experienciaEnsino = document.getElementById("experiencia_ensino"); //campo de professor
var areaEspecializacao = document.getElementById("area_especializacao");//campo de professor
var numAulas = document.getElementById("NumerodeAulas");

var usuario = {};

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


//Função de busca:
document.getElementById("btnBuscar").addEventListener("click", function () {
    const cpfBusca = document.getElementById("inputCpf").value;
    const tipo = tipoUsuarioSelect.value;
    //console.log(tipo);   
    mostrar(cpfBusca, tipo);
});

//Função de deletar
document.getElementById("btnDeletar").addEventListener("click", function () {
    event.preventDefault();
    const cpfBusca = document.getElementById("inputCpf").value;
    const tipo = tipoUsuarioSelect.value;
    deletar(cpfBusca, tipo);
});

//Função de alterar:
document.getElementById("btnAlterar").addEventListener("click", function () {
    event.preventDefault();
    console.log("Alterou");
    const cpfBusca = document.getElementById("inputCpf").value;
    const tipo = tipoUsuarioSelect.value;

    var cpf = document.getElementById("cpf").value;
    var email = document.getElementById("email").value;
    var nome = document.getElementById("nome").value;
    var telefone = document.getElementById("telefone").value;

    if (tipo === "professor") {
        var cursosMinistrados = document.getElementById("curso_ministrados").value;
        var experienciaEnsino = document.getElementById("experiencia_ensino").value;
        var areaEspecializacao = document.getElementById("area_especializacao").value;
        var numAulas = document.getElementById("NumerodeAulas").value;



        usuario = {
            cpf: cpf,
            nome: nome,
            email: email,
            telefone: telefone,
            cursoMinistrados: cursosMinistrados,
            experienciaEnsino: experienciaEnsino,
            areaEspecializacao: areaEspecializacao,
            numAulas: numAulas

        };
    } else {

        var certificado = document.getElementById("certificado").value;
        var numeroCRQ = document.getElementById("crq").value;
        var cargaHoraria = document.getElementById("carga_horaria").value;

        usuario = {
            cpf: cpf,
            nome: nome,
            email: email,
            telefone: telefone,
            certificado: certificado,
            numeroCRQ: numeroCRQ,
            cargaHoraria: cargaHoraria
        };

    }


    update(tipo, usuario);

});



function mostrar(cpfBusca, tipo) {
    let url = "";

    if (tipo === "professor") {
        url = 'http://localhost/backEndBD/professor.php?cpf=' + cpfBusca;
    } else {
        url = 'http://localhost/backEndBD/tecnico.php?cpf=' + cpfBusca;
    }

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
            // Aqui você pode lidar com os dados JSON recebidos
            console.log(data);

            if (data.status != true) {



                var containerElement = document.getElementById('aviso');
                var alertElement = document.createElement('div');
                alertElement.classList.add('alert', 'alert-success');
                alertElement.textContent = 'Usuario encontrado com sucesso!';
                // Adicionar o elemento de alerta ao DOM

                containerElement.appendChild(alertElement);
                
                if (tipo === "professor") {
                    cpf.value = data.fk_usuario_cpf;
                    email.value = data.email;
                    nome.value = data.nome;
                    telefone.value = data.telefone;
                    cursosMinistrados.value = data.curso_ministrados;
                    experienciaEnsino.value = data.experiencia_de_ensino;
                    areaEspecializacao.value = data.area_de_especializacao;
                    numAulas.value = data.num_aulas;
                } else {
                    cpf.value = data.fk_usuario_cpf;
                    email.value = data.email;
                    nome.value = data.nome;
                    telefone.value = data.telefone;
                    certificado.value = data.certificado;
                    crq.value = data.numero_do_crq;
                    cargaHoraria.value = data.carga_horaria;
                }


            }
            else {
                var containerElement = document.getElementById('aviso');
                var alertElement = document.createElement('div');
                alertElement.classList.add('alert', 'alert-danger');
                alertElement.textContent = 'Usuario não encontrado!';
                // Adicionar o elemento de alerta ao DOM
                var containerElement = document.getElementById('aviso');
                containerElement.appendChild(alertElement);

            }


        })
        .catch(error => {
            // Aqui você pode lidar com erros na requisição
            console.error(error);
        });

}


function deletar(cpf, tipo) {

    let url = "";

    if (tipo === "professor") {
        url = 'http://localhost/backEndBD/professor.php';
    } else {
        url = 'http://localhost/backEndBD/tecnico.php';
    }

    fetch(url, {
        method: 'DELETE',
        body: JSON.stringify({ cpf: cpf }),
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
            alertElement.classList.add('alert', 'alert-danger');
            alertElement.textContent = 'Usuario deletado!';
            // Adicionar o elemento de alerta ao DOM
            var containerElement = document.getElementById('aviso');
            containerElement.appendChild(alertElement);
            console.log(data);
        })
        .catch(error => {
            // Aqui você pode lidar com erros na requisição
            console.error(error);
        });

}


function update(tipo, usuario) {

    //console.log(JSON.stringify(usuario));

    let url = "";

    if (tipo === "professor") {
        url = 'http://localhost/backEndBD/professor.php';
    } else {
        url = 'http://localhost/backEndBD/tecnico.php';
    }

    fetch(url, {
        method: 'PUT',
        body: JSON.stringify(usuario),
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
            alertElement.textContent = 'Usuario Alterado!';
            // Adicionar o elemento de alerta ao DOM
            var containerElement = document.getElementById('aviso');
            containerElement.appendChild(alertElement);
            console.log(data);
        })
        .catch(error => {
            // Aqui você pode lidar com erros na requisição
            console.error(error);
        });

}


