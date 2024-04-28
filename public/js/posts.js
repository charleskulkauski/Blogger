var undertakingMark = false;
var comunicatedMark = false;
var imageExists = false;

var comunicated = document.getElementById("comunicated-category");
var undertakingButton = document.getElementById("undertaking-category");

var imageDiv = document.getElementById("imageDiv");
var iconImage = document.getElementById("icon-image");

var postIndex = 0; //Receber do token aqui ouuu enviar pro banco

var blobData;
var imgElement;

var filter = false;

const idAdmin = sessionStorage.getItem("idAdmin");
var posts = [];

let qtdPost = 0;

window.onload = function loadPage() {
    //if (sessionStorage.getItem("login") !== "true") {
      //  alert('Efetuar login!');
        //window.location.href = "../index.html";
    //}

    if(qtdPost==0){
        const welcomeMessage = `<span>Faça sua primeira postagem!</span>`;
        const divId = document.getElementById("nothingHere");

        divId.innerHTML= "";
        divId.innerHTML= welcomeMessage;
        
    }else{
        const welcomeMessage = `<span>Carregando...</span>`;
        const divId = document.getElementById("nothingHere");

        divId.innerHTML= "";
        divId.innerHTML= welcomeMessage;
    }

    fetch(`http://localhost:8080/api/post/${idAdmin}`, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
    })
        .then(result => result.json())
        .then(data => {
            if (data && data.length > 0) {
                posts = data;

                let listStructurePosts = [];
                for (var i = 0; i < posts.length; i++) {
                    var post = {
                        id: posts[i].id,
                        category: posts[i].category,
                        title: posts[i].title,
                        text: posts[i].text,
                        date: posts[i].date,
                        blob: posts[i].blob,
                        authorName: posts[i].nameAdmin,
                    };

                    listStructurePosts.push(makePost(post.id, post.category, post.title, post.text, post.date, post.blob, post.authorName));
                }

                document.getElementById("nothingHere").style.display = "none";

                for (var i = posts.length - 1; i >= 0; i--) {
                    document.getElementById("content-feed").innerHTML += listStructurePosts[i];
                }
            } else {
                document.getElementById("feed").style.display = "flex";
            }
        })
        .catch(error => {
            console.error('Erro ao enviar dados para a API:', error);
        });
};

function optionsUser() {
    var modal = document.getElementById("modal");

    if (modal.style.display == "none") {
        modal.style.display = "flex";
    } else {
        modal.style.display = "none";
    }
}

const uploadInput = document.getElementById("uploadInput");
function animationButton(nameButton) {
    var name = nameButton.toString();

    if (name == 'empreendimento' && undertakingMark == false && comunicatedMark == false) {
        imageDiv.style.visibility = "visible";
        iconImage.style.visibility = "visible";

        undertakingButton.style.backgroundColor = "#000";
        undertakingButton.style.color = "#f5f5f5";

        undertakingMark = true;

    } else if (name == 'comunicado' && undertakingMark == false && comunicatedMark == false) {
        imageDiv.style.visibility = "hidden";
        iconImage.style.visibility = "hidden";

        comunicated.style.backgroundColor = "#000";
        comunicated.style.color = "#f5f5f5";

        undertakingButton.style.backgroundColor = "#f5f5f5";
        undertakingButton.style.color = "#000";

        imageDiv.style.visibility = "hidden";

        comunicatedMark = true;

    }
    else if (undertakingMark == true && comunicatedMark == false) {

        comunicated.style.backgroundColor = "#000";
        comunicated.style.color = "#f5f5f5";

        iconImage.style.visibility = "hidden";

        undertakingButton.style.backgroundColor = "#f5f5f5";
        undertakingButton.style.color = "#000";

        imageDiv.style.visibility = "hidden";
        iconImage.style.visibility = "hidden";

        undertakingMark = false;
        comunicatedMark = true;

    }
    else if (comunicatedMark == true && undertakingMark == false) {
        uploadInput.value = null;
        imageDiv.style.visibility = "visible";

        if(imageExists == true){
            iconImage.style.visibility = "hidden";   
        }else{
            iconImage.style.visibility = "visible";   
        }
             

        undertakingButton.style.backgroundColor = "#000";
        undertakingButton.style.color = "#f5f5f5";

        comunicated.style.backgroundColor = "#f5f5f5";
        comunicated.style.color = "#000";

        comunicatedMark = false;
        undertakingMark = true;

    }

}

function countText() {
    let text = document.getElementById("text_post_input").value;
    document.getElementById('countText').innerText = text.length + "/255";
}

function sendPost() {
    var titleInput = document.getElementById("title_input").value;
    var text_postInput = document.getElementById("text_post_input").value;

    qtdPost++;

    titleInput = titleInput.charAt(0).toUpperCase() + titleInput.slice(1);
    if (titleInput == '' || text_postInput == '') {
        alert('Por favor preencha todos os campos!')
    } else {

        function category() {
            if (comunicatedMark) { return "Comunicado" } else if (undertakingMark) { return "Imagem" } else { return undefined }
        }

        var categorySelected = category();

        //Date
        var funcDate = new Date();
        var nameMonth = funcDate.toLocaleString("pt-BR", { month: "long" })
        var dateNow = ` ${funcDate.getDate()} de ${nameMonth.charAt(0).toUpperCase() + nameMonth.slice(1)} `;

        const emailAdminStorage = sessionStorage.getItem("email");
        const nameAdminStorage = sessionStorage.getItem("name");

        var blobEmpty = "#";

        switch (categorySelected) {
            case ("Comunicado"):

                const dataComunicated = {
                    title: titleInput,
                    text: text_postInput,
                    date: dateNow,
                    category: categorySelected,
                    blob : blobEmpty,
                    emailAdmin: emailAdminStorage,
                    nameAdmin: nameAdminStorage,
                };

                fetch(`http://localhost:8080/api/post`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dataComunicated)
                })
                    .then(result => {
                        var image = "#";

                        return result.json();
                    })

                    .then(data =>{

                        if(data && data.length > 0){
                            const jsonPost = {
                                id: result.id,
                                title: titleInput,
                                text: text_postInput,
                                date: dateNow,
                                category: categorySelected,
                                blob : blobEmpty,
                                emailAdmin: emailAdminStorage,
                                nameAdmin: nameAdminStorage,
                            };
    
                            console.log('POST RETORNADO: ', jsonPost);
    
                            makePost(jsonPost.id, jsonPost.category, jsonPost.title, jsonPost.text, jsonPost.date, jsonPost.blob, jsonPost.nameAdmin);
    
                            alert('Dados enviados com sucesso!');

                        }

                    })
                    .catch(error => {
                        console.error('Erro ao enviar dados para a API:', error.message);
                    });

                 location.reload();
                break;

            case ("Imagem"):
                if (blobData == undefined) {
                    alert('Imagem não pode estar vazia para esta categoria');
                } else {

                    const dataUndertaking = {
                        title: titleInput,
                        text: text_postInput,
                        date: dateNow,
                        category: categorySelected,
                        blob: blobData,                        
                        emailAdmin: emailAdminStorage,
                        nameAdmin: nameAdminStorage,
                    };


                    fetch(`http://localhost:8080/api/post`, {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(dataUndertaking)
                    })
                        .then(result => {
                            var image = "#";
    
                            return result.json();
                        })
    
                        .then(data =>{
    
                            if(data && data.length > 0){
                                const jsonPost = {
                                    id: result.id,
                                    title: titleInput,
                                    text: text_postInput,
                                    date: dateNow,
                                    category: categorySelected,
                                    blob : blobEmpty,
                                    emailAdmin: emailAdminStorage,
                                    nameAdmin: nameAdminStorage,
                                };
        
                                console.log('POST RETORNADO: ', jsonPost);
        
                                makePost(jsonPost.id, jsonPost.category, jsonPost.title, jsonPost.text, jsonPost.date, jsonPost.blob, jsonPost.nameAdmin);
        
                                alert('Dados enviados com sucesso!');
    
                            }
    
                        })
                        .catch(error => {
                            console.error('Erro ao enviar dados para a API:', error);
                        });

                    location.reload();
                    break;
                }

            default:
                alert('Por favor selecione uma categoria')
                break;

        }


    }
}

function loadImage() {

    const loadedImage = document.getElementById("loadedImage");

    if (imageExists == true) {
        loadedImage.innerHTML = "";
        loadedImage.style.display = "none"
        iconImage.style.visibility = "visible"
        uploadInput.value = null;
        imageExists = false;

    } else if (imageExists == false) {

        uploadInput.click();
        uploadInput.addEventListener("change", function () {
            const selectedImage = uploadInput.files[0];

            if (selectedImage) {
                iconImage.style.visibility = "hidden";
                loadedImage.style.display = "flex";

                var blob = new Blob([selectedImage], { type: selectedImage.type });

                var reader = new FileReader();
                reader.readAsDataURL(blob);

                reader.onloadend = function () {
                    blobData = reader.result;
                }

                const imageURL = URL.createObjectURL(selectedImage);

                imgElement = document.createElement("img");
                imgElement.src = imageURL;

                loadedImage.innerHTML = "";

                imgElement.style.width = "100%";
                imgElement.style.height = "100%";

                loadedImage.appendChild(imgElement);
            }
        });


        return blobData;
    }

}

function makePost(idPost, categorySelected, titleInput, text_postInput, dateNow, blob) {
    var imgHtml = "";

    if (categorySelected === "Imagem" && blob) {
        imgHtml = `<div class="post-img"><img src="${blob}"></div>`;
    }

    var newPostHtml = `
        <div class="post" id="${idPost}">
            <hr class="line">
            <div class="inner-post">
                <div class="title">
                    <span class="title-post">${titleInput}</span>
                    <div class="delete-post" data-post-id="${idPost}" onclick="deletePost(this)">
                    <?xml version="1.0" encoding="UTF-8"?>
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"  width="15" height="15" fill="#000">
                        <g>
                            <path d="M448,85.333h-66.133C371.66,35.703,328.002,0.064,277.333,0h-42.667c-50.669,0.064-94.327,35.703-104.533,85.333H64   c-11.782,0-21.333,9.551-21.333,21.333S52.218,128,64,128h21.333v277.333C85.404,464.214,133.119,511.93,192,512h128   c58.881-0.07,106.596-47.786,106.667-106.667V128H448c11.782,0,21.333-9.551,21.333-21.333S459.782,85.333,448,85.333z    M234.667,362.667c0,11.782-9.551,21.333-21.333,21.333C201.551,384,192,374.449,192,362.667v-128   c0-11.782,9.551-21.333,21.333-21.333c11.782,0,21.333,9.551,21.333,21.333V362.667z M320,362.667   c0,11.782-9.551,21.333-21.333,21.333c-11.782,0-21.333-9.551-21.333-21.333v-128c0-11.782,9.551-21.333,21.333-21.333   c11.782,0,21.333,9.551,21.333,21.333V362.667z M174.315,85.333c9.074-25.551,33.238-42.634,60.352-42.667h42.667   c27.114,0.033,51.278,17.116,60.352,42.667H174.315z"/>
                        </g>
                        
                        </svg>
                    </div>
                </div>
                ${imgHtml}
                <div class="post-text">${text_postInput}</div>
                <div class="inform-category">
                    <div class="date">
                        <span>${dateNow}</span>
                    </div>
                    <div class="category-selected">
                        <span>${categorySelected}</span>
                    </div>
                </div>
            </div>
        </div>
    `;

    qtdPost++;
    return newPostHtml;
}

function getComunicated() {
    fetch(`http://localhost:8080/api/post/${idAdmin}/Comunicado`, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
    })
        .then(result => {
            return result.json();
        })
        .then(data => {
            posts = data;
            let listStructurePostsComunicated = [];

            if (!(posts.length == 0 || posts == undefined)) {

                for (var i = 0; i < posts.length; i++) {
                    if (posts[i].category == 'Comunicado') {
                        var post = {
                            id: posts[i].id,
                            category: posts[i].category,
                            title: posts[i].title,
                            text: posts[i].text,
                            date: posts[i].date,
                            authorName: posts[i].nameAdmin,
                        };

                        listStructurePostsComunicated.push(makePost(post.id, post.category, post.title, post.text, post.date, post.authorName));
                    }
                }

                document.getElementById('content-feed').innerHTML = "";
                filter = true;
                for (var i = listStructurePostsComunicated.length-1; i >= 0; i--) {
                    document.getElementById("content-feed").innerHTML += listStructurePostsComunicated[i];
                }
            }
            
        })
        .catch(error => {
            console.error('Erro ao enviar dados para a API:', error.message);
        });

    filter = false;
}

function getUndertaking() {
    fetch(`http://localhost:8080/api/post/${idAdmin}/Imagem`, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
    })
        .then(result => {
            return result.json();
        })
        .then(data => {
            posts = data;
            let listStructurePostsComunicated = [];

            if (!(posts.length == 0 || posts == undefined)) {
                for (var i = 0; i < posts.length; i++) {
                    if (posts[i].category == 'Imagem') {
                        var post = {
                            id: posts[i].id,
                            blob: posts[i].blob,
                            category: posts[i].category,
                            title: posts[i].title,
                            text: posts[i].text,
                            date: posts[i].date,
                            authorName: posts[i].nameAdmin,
                        };

                        listStructurePostsComunicated.push(makePost(post.id, post.category, post.title, post.text, post.date, post.blob, post.authorName));
                    }
                }

                document.getElementById('content-feed').innerHTML = "";
                filter = true;
                for (var i = listStructurePostsComunicated.length-1; i >= 0; i--) {
                    document.getElementById("content-feed").innerHTML += listStructurePostsComunicated[i];

                }
            }
        })
        .catch(error => {
            console.error('Erro ao enviar dados para a API:', error.message);
        });

    filter = false;
}

function deletePost(element) {
    var postId = element.getAttribute("data-post-id");

    fetch(`http://localhost:8080/api/post/${postId}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(result => {
            if (result.ok) {
                alert("Post excluido com sucesso!");
                location.reload();
            } else {
                alert("POST AINDA NÃO FOI EXCLUIDO!")
            }

        })
        .catch(error => {
            console.error('Erro ao excluir dados para a API:', error);
        });

}

function signOut() {
    sessionStorage.setItem("login", false);
    sessionStorage.removeItem("idAdmin");
    sessionStorage.removeItem("email");
    window.location.href = "http://localhost:3333/index.html";
}


