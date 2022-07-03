//const LOGIN_URL = "index.html";
var db_usuarios = {};
var usuarioCorrente = {};

//função do exemplo do rommel que cria um código aleatório para o usuário
function generateUUID() {
    var d = new Date().getTime();
    var d2 = (performance && performance.now && (performance.now() * 1000)) || 0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;
        if (d > 0) {
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else {
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}


//usuários "placeholder"
const dadosIniciais = {
    usuarios: [
        { "id": generateUUID(), "login": "Adm", "senha": "123", "nome": "Administrador", "email": "adm@abc.com" },
        { "id": generateUUID(), "login": "Luis", "senha": "123", "nome": "Amanda Barros", "email": "AMbarros@abc.com" },
        { "id": generateUUID(), "login": "Xeyla", "senha": "123", "nome": "Xeyla Texeira", "email": "xeylaT@abc.com" },
        { "id": generateUUID(), "login": "João", "senha": "123", "nome": "João Andrade", "email": "jAndrade@abc.com" },
    ]
};

function initLoginApp() {

    usuarioCorrenteJSON = sessionStorage.getItem('usuarioCorrente');
    if (usuarioCorrenteJSON) {
        usuarioCorrente = JSON.parse(usuarioCorrenteJSON);
    }


    var usuariosJSON = localStorage.getItem('db_usuarios');

    if (!usuariosJSON) {

        alert('Dados de usuários não encontrados no localStorage. \n -----> Fazendo carga inicial.');
        db_usuarios = dadosIniciais;
        localStorage.setItem('db_usuarios', JSON.stringify(dadosIniciais));
    } else {

        db_usuarios = JSON.parse(usuariosJSON);
    }
};



function loginUser(login, senha) {

    for (var i = 0; i < db_usuarios.usuarios.length; i++) {
        var usuario = db_usuarios.usuarios[i];

        if (login == usuario.login && senha == usuario.senha) {
            usuarioCorrente.id = usuario.id;
            usuarioCorrente.login = usuario.login;
            usuarioCorrente.email = usuario.email;
            usuarioCorrente.nome = usuario.nome;

            sessionStorage.setItem('usuarioCorrente', JSON.stringify(usuarioCorrente));

            return true;
        }
    }

    return false;
}

// function logoutUser() {
//     usuarioCorrente = {};
//     sessionStorage.setItem('usuarioCorrente', JSON.stringify(usuarioCorrente));
//     window.location = LOGIN_URL;
// }


function addUser(nome, login, senha, email) {
    let newId = generateUUID();
    let usuario = { "id": newId, "login": login, "senha": senha, "nome": nome, "email": email };
    db_usuarios.usuarios.push(usuario);
    localStorage.setItem('db_usuarios', JSON.stringify(db_usuarios));
}

function setUserPass() {

}

initLoginApp();

function processaFormLogin(event) {

    event.preventDefault();

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    resultadoLogin = loginUser(username, password);
    if (resultadoLogin) {
        window.location.href = 'index.html';
    } else { //se login falhar
        alert('Usuário ou senha incorretos');
    }
}

function salvaLogin(event) {
    event.preventDefault();

    let login = document.getElementById('txt_login').value;
    let nome = document.getElementById('txt_nome').value;
    let email = document.getElementById('txt_email').value;
    let senha = document.getElementById('txt_senha').value;
    let senha2 = document.getElementById('txt_senha2').value;
    if (senha != senha2) {
        alert('As senhas são diferentes');
        return
    }
    addUser(nome, login, senha, email);
    alert('Usuário salvo com sucesso');

    $('#loginModal').modal('hide');
}

document.getElementById('login-form').addEventListener('submit', processaFormLogin);

document.getElementById('btn_salvar').addEventListener('click', salvaLogin);

if (!usuarioCorrente.login) {
    window.location.href = LOGIN_URL;
}

function exibeUsuarios() {

    let listaUsuarios = '';
    for (i = 0; i < db_usuarios.usuarios.length; i++) {
        let usuario = db_usuarios.usuarios[i];
        listaUsuarios += `<tr><td scope="row">${usuario.nome}</td><td>${usuario.login}</td><td>${usuario.email}</td></tr>`;
    }

    document.getElementById("table-usuarios").innerHTML = listaUsuarios

}

function initPage() {

    document.getElementById('btn_logout').addEventListener('click', logoutUser);

    document.getElementById('nomeUsuario').innerHTML = usuarioCorrente.nome;

    exibeUsuarios();
}

window.addEventListener('load', initPage);