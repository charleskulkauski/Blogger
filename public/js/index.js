var valueBox = 1;

document.addEventListener("DOMContentLoaded", function () {
  const nav = document.getElementById("content-nav");
  const undertakingSection = document.querySelector('.undertaking');
  const startOffset = undertakingSection.offsetTop;
  const endOffset = startOffset + undertakingSection.offsetHeight;

  function updateNavColor() {
    if (window.scrollY >= startOffset && window.scrollY <= endOffset) {
      nav.classList.add('nav-white-text');
    } else {
      nav.classList.remove('nav-white-text');
    }
  }

  updateNavColor();

  window.addEventListener('scroll', updateNavColor);
});

window.onload = function loadPage() {
  if (sessionStorage.getItem("login") == "true") {
    var optionsLoginTrue = `<a href="http://localhost:3333/index.html">
    <span>
        Inicio
    </span>
</a>

<a href="http://localhost:3333/blog.html">
    <span>
        Blog Incorp
    </span>
</a>


<a href="http://localhost:3333/posts.html" id="link-entrar">
    <span id="entrar">
        Meus posts
    </span>
</a>`;

    document.getElementById("options").innerHTML = "";
    document.getElementById("options").innerHTML = optionsLoginTrue;



    document.getElementById("link-cadastro").innerHTML = "";
  }

  fetch('http://localhost:8080/api/post/last', {
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
      if (!(posts.length == 0 || posts == undefined)) {
        for (var i = 0; i < posts.length; i++) {
          makePost(posts[i].category, posts[i].title, posts[i].text, posts[i].date, posts[i].blob, posts[i].nameAdmin,);
        }
      }
    })
    .catch(error => {
      console.error('Erro ao consumir dados para a API:', error);
    });

}

function makePost(categorySelected, titleInput, text_postInput, dateNow, blob, authorName) {

  titleInput = titleInput.charAt(0).toUpperCase() + titleInput.slice(1);

  let text_format = "";
  if (text_postInput.length > 100) {
    for (i = 0; i < 70; i++) {
      text_format += text_postInput.charAt(i);

    }
    text_format = text_format += `...`
  } else {
    text_format = text_postInput;
  }

  console.log('TEXT FORMAT: ' + text_format);

  if (categorySelected == "Comunicado") {
    var newPostHtml = `
        <div class="post">
            <div class="inner-post">
                <div class="title">
                    <span class="title-post">${titleInput}</span>
                </div>
                <div class="post-text">${text_format}</div>


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
        </div>
        `

    box = document.getElementById(`box-${valueBox}`);
    box.innerHTML = newPostHtml;

    valueBox++;
    if (valueBox > 2) {
      valueBox = 1;
    }

  } else if (categorySelected == "Imagem") {
    var img = document.createElement('img');
    img.src = "data:image/png;base64," + blob;


    var newPostHtml = `
              <div class="post">
                  <div class="inner-post">
                      <div class="title">
                          <span class="title-post">${titleInput}</span>
                      </div>
                      </div>

                      <div class="post-img">
                          <img src="${blob}">
                      </div>
                      <div class="post-text">${text_format}</div>
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
              </div>
              `

    box = document.getElementById(`box-${valueBox}`);
    box.innerHTML = newPostHtml;

    valueBox++;
    if (valueBox > 2) {
      valueBox = 1;
    }

  }

}

function redirectToBlog() {
  window.location.href = "http://localhost:3333/blog.html"
}

function send() {
  var nameTest = document.getElementById('name').value
  var lastNameTest = document.getElementById('lastName').value
  var emailTest = document.getElementById('email').value
  var messageTest = document.getElementById('message').value

  if (nameTest == null || lastNameTest == null || emailTest == null || messageTest == null) {
    alert("Preencha todos os campos!")
  } else if (nameTest.length < 3) {
    alert("Nome inválido")
  } else if (lastNameTest < 3) {
    alert("Sobrenome inválido")
  } else if (emailTest.search("@") == -1) {
    alert("Email inválido")
  } else if (messageTest.search(".") == -1) {
    alert("Email inválido")
  } else {
    const data = {
      name: nameTest,
      lastName: lastNameTest,
      email: emailTest,
      message: messageTest
    };

    fetch('http://localhost:8080/api/message', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
      .then(result => {
        alert("Dados enviados com sucesso!");
        location.reload();
      })
      .catch(error => {
        console.error('Erro ao enviar dados para a API:', error);
      });

  }
}
