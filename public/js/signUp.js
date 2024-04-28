function signUp() {
    let nameVar = document.getElementById('name').value;
    let emailVar = document.getElementById('email').value;
    let passwordVar = document.getElementById("password").value;

    if (passwordVar.length < 7) {
        alert("Sua senha deve ser maior que 7 caracteres");
    } else if (nameVar.length < 3 || nameVar.length > 40) {
        alert("Nome e sobrenome devem conter entre 3 e 40 caracteres");
    } else {
        const data = {
            nome: nameVar,
            email: emailVar,
            senha: passwordVar,
        };

        fetch('http://localhost:8080/api/signUp', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => {
                if (response.ok) {
                    window.location.href = "http://localhost:3333/signIn.html";
                }else {
                    alert('Erro ao realizar cadastro: ' + response.statusText);
                };
            })
            .catch(error => {
                console.error('Erro ao enviar dados para a API:', error.message);
            });
    };
}

