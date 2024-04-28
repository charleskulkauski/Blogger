var idPost;
var posts = [];

var filter = false;
var posts = [];
window.onload = function loadPage() {
    const idAdmin = sessionStorage.getItem("idAdmin")
    fetch(`http://localhost:8080/api/post`, {
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

            for (var i= 0; i < posts.length; i++) {
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
            
            for(var i = posts.length - 1; i >= 0; i--){
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

function getComunicated(){
    fetch(`http://localhost:8080/api/post/category/Comunicado`, {
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
            console.log(posts);
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
                            blob: posts[i].blob,
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

function getUndertaking(){
    fetch(`http://localhost:8080/api/post/category/Imagem`, {
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

            console.log(posts);
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

function makePost(idPost, categorySelected, titleInput, text_postInput, dateNow, blob, authorName) {
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
                </div>
                ${imgHtml}
                <div class="post-text">${text_postInput}</div>

                
                <div class="info-post">
                <div class="inform-category">
                    <div class="date">
                        <span>${dateNow}</span>
                    </div>
                    <div class="category-selected">
                        <span>${categorySelected}</span>
                    </div>
                </div>

                <div class="author-name">
                    <span>${authorName}</span>
                </div>
                </div>
            </div>
        </div>
    `;

    return newPostHtml;
}


function optionsUser() {
    var modal = document.getElementById("modal");

    if (modal.style.display == "none") {
        modal.style.display = "flex";
    } else {
        modal.style.display = "none";
    }
}

function signOut() {
    sessionStorage.setItem("login", false);
    sessionStorage.removeItem("idAdmin");
    sessionStorage.removeItem("email");
    window.location.href = "http://localhost:3333/index.html";
}
