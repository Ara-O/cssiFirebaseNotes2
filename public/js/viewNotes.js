
let googleUser;
let googleUserName;
let id;
let no = 'i';

window.onload = (event) => {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log(user)
            googleUser = user;
            googleUserName = googleUser.displayName
            id = user.uid;
            getNotes(user.uid)
        }
    })
}

function getNotes(userID) {
    console.log(userID);
    const notesRef = firebase.database().ref('users/' + userID);
    notesRef.on("value", (db) => {
    
        const data = db.val();
        renderData(data)
        console.log(data)
    })
}


function renderData(data) {
    let html = '';
    let note2 = ''
    for (const dataKey in data) {
        const note = data[dataKey];
            no+='i';
        note2 = note;
        const cardhtml = renderCard(note);
        html += cardhtml;
    }

    document.querySelector("#app").innerHTML = html;
    document.querySelector(".maximize").addEventListener("click", maximize)

}

function generateRandomColor() {
    return Math.floor(Math.random() * 225) + 1
}

function renderCard(note) {
    // document.querySelector(".is-one-quarter").style.backgroundColor = ""
    let color1 = generateRandomColor();
    let color2 = generateRandomColor();
    let color3 = generateRandomColor();
    console.log(note)
    let rgb = ` rgba(${color1}, ${color2}, ${color3}, 0.4), rgb(${color1}, ${color2}, ${color3}) `;
    return `<div class="column is-one-quarter" id='${no}' >
         <div class="card" style='background: linear-gradient(${rgb})'>
         <div class="imgalign">
         <img src="${googleUser.photoURL}"></img>
           <header class="card-header">
             <p class="card-header-title">${note.title}</p>
           </header>
         </div>
             <p  class="card-header-title">${googleUserName}</p>
           <div class="card-content">
             <div class="content">${note.text}</div>
           </div>
           <button class="maximize" onclick="maximize(${no})">Maximize</button>
          </div>
       </div>`;


}


function maximize(no){
    // console.log(document.querySelector(`#${no}`))
     const id = no.id
     const modal = document.querySelector(".modal1").style.display ='block';
     const overlay = document.querySelector(".overlay").style.display ='block';
     console.log( document.querySelector(`#${id}`))
     modal.innerHTML = document.querySelector(`#${id}`);
 }
