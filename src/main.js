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
const savePost = (desciption) => 
  db.collection('posts').doc().set({
  description: description, 
})


  
document.getElementById("email").focus();
document.querySelector(".Wall").style.display='none'

const taskform = document.querySelector("#task-form")


taskform.addEventListener("submit", async (e) =>{
  e.preventDefault()
  description= taskform["task-post"].value
  console.log(description)
  await savePost(description)
  taskform.reset()
})

const info2 = document.getElementById("btnLogin")
function View1 () {
  document.querySelector(".Wall").style.display='block'
  document.querySelector(".FormLogin").style.display='none'
}

function login(event){
  event.preventDefault();
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  console.log(email,password)
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(function(){View1()
  
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
