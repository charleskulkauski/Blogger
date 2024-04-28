function signIn() {
    var emailVar = document.getElementById('email').value;
    var passwordVar = document.getElementById('password').value;

    if(!(emailVar == undefined || passwordVar == undefined || emailVar == "" || passwordVar == "" )){
        const data = {
            email: emailVar,
            senha: passwordVar,
        };
    
        fetch('http://localhost:8080/api/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }else {
                    throw new Error('Erro na requisição');
                }
            })
            .then(data => {
                    const idAdmin = data.idAdmin;
                    const name = data.nameAdmin;

                    console.log(data)

                    sessionStorage.setItem("login", true);
                    sessionStorage.setItem("email", emailVar);
                    sessionStorage.setItem("name", name);
                    sessionStorage.setItem("idAdmin", idAdmin);

                    window.location.href="http://localhost:3333/posts.html";
            })
            .catch(error => {
                alert("Algo deu errado ao fazer login!");
                console.error('Erro ao enviar dados para a API:', error);
            });
    }else{
        alert('Dados incorretos ou não suportados');
    }

}

