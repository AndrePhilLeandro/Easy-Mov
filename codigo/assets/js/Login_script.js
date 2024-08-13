document.getElementById('loginButton').addEventListener('click', fazerLogin);

async function fazerLogin() {
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;

    try {
        // Carregar credenciais do arquivo JSON
        const response = await fetch('/codigo/assets/json/testelogin.json');
        if (!response.ok) {
            throw new Error('Erro ao carregar o arquivo JSON');
        }
        const credenciais = await response.json();

        // Verificar as credenciais
        var loginValido = false;
        var isAdmin = false;
        for (var i = 0; i < credenciais.length; i++) {
            if (credenciais[i].email === email && credenciais[i].senha === senha) {
                loginValido = true;
                isAdmin = credenciais[i].isAdmin || false;
                break;
            }
        }

        if (loginValido) {
            if (email === 'administrador@adm.com' && senha === 'Admin123') {
                window.location.href = '/codigo/pages/Adm_Logado.html';
            } else {
                if (isAdmin) {
                    window.location.href = '/codigo/pages/Adm_Logado.html';
                } else {
                    window.location.href = '/codigo/pages/Usuario_Login.html'; 
                }
            }
        } else {
            alert('Email ou senha incorretos. Por favor, tente novamente.');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao tentar fazer login. Por favor, tente novamente mais tarde.');
    }
}
