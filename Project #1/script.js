let signup = document.getElementById('sign-up');
let login = document.getElementById('login');
let logout = document.getElementById('logout');
let form = document.querySelector('form');
let form2 = document.getElementById('form2');
let firstName = document.getElementById('firstName');
let lastName = document.getElementById('lastName');
let email = document.getElementById('email');
let password = document.getElementById('password');
let checkTerms = document.getElementById('checkTerms');
let dashboard = document.getElementById('dashboard');
let dashboardUser = document.getElementById('dashboard-user');
let dashboardEmail = document.getElementById('dashboard-email');
let loginEmail = document.getElementById('login-email');
let loginPassword = document.getElementById('login-password');
let createList = document.getElementById('createList');

let accountSettings = document.getElementById('account_settings');
let edit = document.getElementById('edit');
let editAccount = document.querySelectorAll('.edit_account');
let editContent = document.getElementById('editContent');
let saveEdited = document.getElementById('saveEditedContent');

let modalContent = document.getElementsByClassName('modal-content')[0];
let close = document.getElementById('close');


signup.addEventListener('click', function(event) {
    form.style.display = 'block';
});

let arrStore = [];
if(localStorage.getItem('users')) {
    let parsedUsers = JSON.parse(localStorage.getItem('users'));
    for(let i=0; i < parsedUsers.length; i++) {
        arrStore.push(parsedUsers[i])
    }
}
form.addEventListener('submit', function (event){
    event.preventDefault();
    function User(firstName, lastName, email, password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }
    let currentUser = new User(firstName.value, lastName.value, email.value, password.value);


    if(arrStore.length !== 0) {
        for(let i=0; i < arrStore.length; i++) {
            for(let key in arrStore[i]) {
                if(key === 'email' && currentUser.email === arrStore[i].email){
                        alert('Email is duplicated!');
                        return false;
                }
            }
        }
        /*
        It was totally unobvious, but to set a right condition I just had to set condition
        if(key === 'email' && currentUser.email === arrStore[i].email) and return false. That`s all!
        There is a whole array cycle that has inside an object cycle where I find a key 'email' and set a condition
        if an email is equal to a current email or not. If yes - return false and leave a cycle. And that`s all!
        If no - a code below will be executed anyway. It means that an 'else' statement isn`t necessary all the time.
        Sometimes it`s enough just 'return false' to leave a code block and a next code block wouldn`t be reached! Ha-ha...
        ATTENTION! It doesn`t work with forEach method!!!!!
         */
        arrStore.push(currentUser);
        localStorage.setItem('users', JSON.stringify(arrStore));
        form.style.display = 'none';
        alert('Your sign-up succeeded! in block 111');
        clearForm();
    } else {
        arrStore.push(currentUser);
        localStorage.setItem('users', JSON.stringify(arrStore));
        form.style.display = 'none';
        alert('Your sign-up succeeded!');
        clearForm();
    }
    function clearForm(){
        firstName.value = null;
        lastName.value = '';
        email.value = '';
        password.value = '';
        checkTerms.checked = false;
    }
});

login.addEventListener('click', function(){
    form2.style.display = 'block';
});

form2.addEventListener('submit', function(event) {
    event.preventDefault();
    let currentUsers = JSON.parse(localStorage.getItem('users'));
    for(let i=0; i < currentUsers.length; i++) {
        for(key in currentUsers[i]) {
            if (loginEmail.value === currentUsers[i].email && loginPassword.value === currentUsers[i].password) {
                alert('Login action succeeded!');
                form2.style.display = 'none';
                signup.style.display = 'none';
                login.style.display = 'none';
                dashboard.style.display = 'block';
                logout.style.display = 'block';
                accountSettings.style.display = 'block';
                dashboardUser.innerHTML = currentUsers[i].firstName + ' ' + currentUsers[i].lastName;
                dashboardEmail.innerHTML = currentUsers[i].email;
                loginEmail.value = '';
                loginPassword.value = '';


                let currentUsersTasks = JSON.parse(localStorage.getItem(dashboardEmail.innerHTML));


                for(let j=0; j < currentUsersTasks.localLength; j++) {
                            let innerPart = `
                                <div class="status">
                                  <div class="delete">Delete</div>
                                  <div>
                                    Done<input type="checkbox" class="done">
                                  </div>
                                </div>
                                <h3 contentEditable="true" class="task_title">Enter a task name</h3>
                                <textarea cols="20" rows="10"></textarea>
                                <p>Deadline: <input type="date" value="2019-08-01" min="2019-08-01"</p>
                            `;
                            let lists = document.getElementById('lists');
                            let article = document.createElement('article');
                            lists.appendChild(article);
                            article.innerHTML += innerPart;

                            let articles = document.getElementsByTagName('article');

                            let h3 = articles[j].children[1];
                            h3.innerHTML = `${currentUsersTasks.titles[j]}`;

                            let textAreaContent = articles[j].children[2];
                            textAreaContent.value = `${currentUsersTasks.content[j]}`;

                            let deadline = articles[j].children[3].firstElementChild;
                            deadline.value = `${currentUsersTasks.deadlines[j]}`;
                }

                let deleteTask = document.getElementsByClassName('delete');
                for(let i=0; i < deleteTask.length; i++) {
                    let el = deleteTask[i].parentElement.previousSibling.parentNode;
                    deleteTask[i].addEventListener('click', function(){
                        el.remove();
                    });
                }
                let done = document.getElementsByClassName('done');
                for(let i=0; i < done.length; i++) {
                    done[i].addEventListener('click', function() {
                        if(this.checked === true) {
                            this.parentElement.parentElement.parentElement.style.backgroundColor = 'green';
                        } else {
                            this.parentElement.parentElement.parentElement.style.backgroundColor = '#cccfff';
                        }
                    })
                }
                return false;
            }
        }
    }
    alert('No');
    });




createList.addEventListener('click', function(){
    let lists = document.getElementById('lists');
    let article = document.createElement('article');
    lists.appendChild(article);
    let innerPart = `
    <div class="status">
      <div class="delete">Delete</div>
      <div>
        Done<input type="checkbox" class="done">
      </div>
    </div>
    <h3 contentEditable="true" class="task_title">Enter a task name</h3>
    <textarea cols="20" rows="10"></textarea>
    <p>Deadline: <input type="date" value="2019-08-01" min="2019-08-01"</p>
`;
    article.innerHTML = innerPart;


    let deleteTask = document.getElementsByClassName('delete');
    for(let i=0; i < deleteTask.length; i++) {
        let el = deleteTask[i].parentElement.previousSibling.parentNode;
        deleteTask[i].addEventListener('click', function(){
            el.remove();
        });
    }
    let done = document.getElementsByClassName('done');
    for(let i=0; i < done.length; i++) {
        done[i].addEventListener('click', function() {
            if(this.checked === true) {
                this.parentElement.parentElement.parentElement.style.backgroundColor = 'green';
            } else {
                this.parentElement.parentElement.parentElement.style.backgroundColor = '#cccfff';
            }
        })
    }
});

logout.addEventListener('click', function() {
    signup.style.display = 'block';
    login.style.display = 'inline-block';
    logout.style.display = 'none';
    dashboard.style.display = 'none';
    accountSettings.style.display = 'none';



    let lists = document.getElementById('lists');
    let articles = document.getElementsByTagName('article');
    let currentTasks = {
        localLength: articles.length,
        titles: [],
        content: [],
        deadlines: []
    };

    for(let i=0; i < articles.length; i++) {
        let h3 = articles[i].children[1].innerHTML;
        currentTasks.titles.push(h3);

        let textAreaContent = articles[i].children[2].value;
        currentTasks.content.push(textAreaContent);

        let deadline = articles[i].children[3].firstElementChild.value;
        currentTasks.deadlines.push(deadline);
    }

    localStorage.setItem(dashboardEmail.innerHTML, JSON.stringify(currentTasks));

    let deletedArticles = lists.children;
    for(let i=0; i < deletedArticles.length; i++) {
        deletedArticles[i].remove();
        //??????????????????? why code above doesn`t work???
    }

});

accountSettings.addEventListener('click', () => {
    modalContent.style.display = 'block';
    edit.style.display = 'block';
    let u = JSON.parse(localStorage.getItem('users'));
    for(let i=0; i < u.length; i++) {
        for(let key in u[i]) {
            if(u[i].email === dashboardEmail.innerHTML) {
                editAccount[0].value = u[i].firstName;
                editAccount[1].value = u[i].lastName;
                editAccount[2].value = u[i].email;
                editAccount[3].value = u[i].password;
            }
        }
    }

    editContent.addEventListener('click', () => {
        editAccount[0].removeAttribute('disabled');
        editAccount[1].removeAttribute('disabled');
        editAccount[2].removeAttribute('disabled');
        editAccount[3].removeAttribute('disabled');
    });
    saveEdited.addEventListener('click', () => {
        let users = JSON.parse(localStorage.getItem('users'));
        for(let i=0; i < users.length; i++) {
            for(let key in users[i]) {
                if(dashboardEmail.innerHTML === users[i].email) {
                    users.splice(i,1);
                    let editedUser = {
                      firstName: editAccount[0].value,
                      lastName: editAccount[1].value,
                      email: editAccount[2].value,
                      password: editAccount[3].value
                    };
                    users.push(editedUser);
                    break;
                }
            }
        }
        localStorage.clear();
        localStorage.setItem('users', JSON.stringify(users));
        editAccount[0].setAttribute('disabled', 'disabled');
        editAccount[1].setAttribute('disabled', 'disabled');
        editAccount[2].setAttribute('disabled', 'disabled');
        editAccount[3].setAttribute('disabled', 'disabled');
    });
});


close.onclick = function(){
    edit.style.display = 'none';
};
window.onclick = function(event) {
    if(event.target === edit) {
        edit.style.display = 'none';
    }
};

//---------------------------
// Basic AES example using the defaults.
// https://github.com/bitwiseshiftleft/sjcl

// let input = document.getElementById('input');
// let p = document.querySelector('#out');
// let passEnc;
// let passDecr;
// input.addEventListener('input', () => {
// 	let passEnc = sjcl.encrypt('password', input.value);
//   let pasDecr = sjcl.decrypt('password', passEnc);
// 	p.innerHTML = 'Ввод пароля ' + input.value + ' encrypted password: ' + pass + ' decrypted password: ' + plaintext;
// })

// var ciphertext = sjcl.encrypt("password", "Hello World!")
// var plaintext = sjcl.decrypt("password", ciphertext)

// let passEncrypt = sjcl.encrypt('password', localStorage.getItem('password'))
// let passDecrypt = sjcl.decrypt('password', passEncrypt);

// //console.dir(passEncrypt);
// console.dir(passDecrypt);
