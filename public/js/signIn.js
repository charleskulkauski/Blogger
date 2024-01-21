function signIn() {

    var emailVar = document.getElementById('email').value;
    var passwordVar = document.getElementById('password').value;

    if(!(emailVar == undefined || passwordVar == undefined || emailVar == "" || passwordVar == "" )){
        const data = {
            email: emailVar,
            senha: passwordVar
        };
    
        fetch('http://localhost:8080/api/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then(result => {

                if(result.ok){
                    sessionStorage.setItem("login", true);
                    window.location.href="http://localhost:3333/posts.html"
                }else{
                    alert('Algo deu errado!')
                }
    
                
    
            })
            .catch(error => {
    
                alert("Dados incorretos!")
                console.error('Erro ao enviar dados para a API:', error);
            });
    }else{
        alert('Insira as informações')
    }
    

}

