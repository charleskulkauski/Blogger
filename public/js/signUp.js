function signUp() {
    var nameVar = document.getElementById('name').value;
    var emailVar = document.getElementById('email').value;
    var passwordVar = document.getElementById('password').value;


    const data = {
        nome: nameVar,
        email: emailVar,
        senha: passwordVar
    };


    fetch('http://localhost:8080/api', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
        .then(result => {
            if(result.status == 201){
                window.location.href="http://localhost:3333/signIn.html"
            }else{
                alert('Erro ao realizar cadastro!')
            }
        })
        .catch(error => {
            alert("Dados incorretos!")
            console.error('Erro ao enviar dados para a API:', error);
        });

    document.getElementById("details-modal").style.display = "flex";

}

