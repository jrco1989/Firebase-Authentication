var firebaseConfig = {
    apiKey: "AIzaSyC2UfxFH61_n2e9a2B2ZjZJSQiU2PLo0ac",
    authDomain: "agro-ff2b1.firebaseapp.com",
    databaseURL: "https://agro-ff2b1.firebaseio.com",
    projectId: "agro-ff2b1",
    storageBucket: "agro-ff2b1.appspot.com",
    messagingSenderId: "953858022925",
    appId: "1:953858022925:web:b91b98e5ddabb9799dbf44"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const savePost = (description, userID) => 
  db.collection('posts').doc().set({
  description: description, 
  userID : userID,
})

document.getElementById("email").focus();
document.querySelector(".Wall").style.display='none'

const PostsContainer = document.getElementById('Posts')
const taskform = document.querySelector("#task-form")

const getTask = () => db.collection('posts').get();//es un evento asíncrono 
const onGetTask = (callback) => db.collection('posts').onSnapshot(callback)
const deletePost = id => db.collection('posts').doc(id).delete()

window.addEventListener('DOMContentLoaded', async(e)=>{
  //const querySnapshot = await getTask()
  
  onGetTask((querySnapshot)=>{
    PostsContainer.innerHTML=""
    querySnapshot.forEach(doc => {
      let post=doc.data()
      post.id=doc.id
      console.log(post.id)
      //console.log(post.id)
      PostsContainer.innerHTML += `<div class='card card-body mt-2 border-primary' data-user="${post.userID}" >
      <h3>${post.description}</h3>
      <div>
      <button class="btn btn-primary ">comment</button>
      <button class="btn btn-secundary btn-edith">Edith</button>
      <div class = "deleter" data-user="${post.userID}" >
      <button class="btn btn-secundary btn-delete" data-id="${post.id}" data-user="${post.userID}">Delete</button>
      </div>
      </div>
      </div>`;
      
      let divbtns = document.querySelectorAll('.deleter')
      let user = firebase.auth().currentUser;
      
      divbtns.forEach(div =>{
        console.log(user.uid, post.userID, div.dataset.user)
        if (user.uid != div.dataset.user){
        div.innerHTML=''}
      })
      
      const btnsDelete = document.querySelectorAll('.btn-delete')
            
      btnsDelete.forEach(btn =>{
        btn.addEventListener('click', async(e)=>{
          //console.log(e.target.dataset.id)
          let user = firebase.auth().currentUser;
          console.log(" User login ",user.uid)
          console.log("user that created button ", e.target.dataset.user)
          if( e.target.dataset.user === user.uid ){
          await deletePost(e.target.dataset.id)}
        })
      })
    })
  })
})

taskform.addEventListener("submit", async (e) =>{
  e.preventDefault()
  description= taskform["task-post"].value
  console.log(description)
  let user = firebase.auth().currentUser;
  console.log("user current ", user.uid)
  await savePost(description,user.uid)
  taskform.reset()
})

const info2 = document.getElementById("btnLogin")
function View1 () {
  document.querySelector(".Wall").style.display='block'
  document.querySelector(".FormLogin").style.display='none'
  let user = firebase.auth().currentUser;
  console.log("current user ", user.uid)
}

function login(event){
  event.preventDefault();
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  console.log(email,password)
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(function(){View1()
    //let user = firebase.auth().currentUser;
    //console.log(user.uid)
  
})
  .catch(function(error) {
      
      var errorCode = error.code;
      var errorMessage = error.message;
      
      if (errorCode == 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
}
info2.addEventListener('click', login )
