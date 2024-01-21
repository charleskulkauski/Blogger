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

      if (!(posts.length == 0 || posts == undefined)) {
        for (var i = 0; i <= posts.length; i++) {
          makePost(posts[i].category, posts[i].title, posts[i].text, posts[i].date, posts[i].category, posts[i].blob);
        }
      }
    })
    .catch(error => {
      console.error('Erro ao enviar dados para a API:', error);
    });

}

function makePost(categorySelected, titleInput, text_postInput, dateNow, categorySelected, blob) {

  titleInput = titleInput.charAt(0).toUpperCase() + titleInput.slice(1);

  var text_format = "";
  if (text_postInput.length > 100) {
    for (i = 0; i < 70; i++) {
      text_format += text_postInput.charAt(i);
      
    }

    text_format = text_format += `...`
  }else{
    text_format = text_postInput;
  }

  
  if (categorySelected == "Comunicado") {
    var newPostHtml = `
        <div class="post">
            <div class="inner-post">
                <div class="title">
                    <span class="title-post">${titleInput}</span>
                </div>
                <div class="post-text">${text_format}</div>
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
        </div>
        `

    box = document.getElementById(`box-${valueBox}`);
    box.innerHTML = newPostHtml;

    valueBox++;
    if (valueBox > 2) {
      valueBox = 1;
    }

  } else if (categorySelected == "Empreendimento") {
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
              </div>
              `


    var bigbox;

    bigbox = document.getElementById("big-box");

    bigbox.innerHTML = newPostHtml;
  }

}

function redirectToBlog(){
  window.location.href="http://localhost:3333/blog.html"
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
      })
      .catch(error => {
        console.error('Erro ao enviar dados para a API:', error);
      });

  }
}
