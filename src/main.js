//import { myFunction } from './lib/index.js';
/* TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->*/

var firebaseConfig = {
    apiKey: "AIzaSyC2UfxFH61_n2e9a2B2ZjZJSQiU2PLo0ac",
    authDomain: "agro-ff2b1.firebaseapp.com",
    databaseURL: "https://agro-ff2b1.firebaseio.com",
    projectId: "agro-ff2b1",
    storageBucket: "agro-ff2b1.appspot.com",
    messagingSenderId: "953858022925",
    appId: "1:953858022925:web:b91b98e5ddabb9799dbf44"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
  
//myFunction();
document.getElementById("email").focus();

const info = document.getElementById("btnSend")
const info2 = document.getElementById("btnlogin")
function register1(event){
    event.preventDefault();
    
    //var email = info.email.value
    //var password = info.password.value
    //
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    console.log(email,password)
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
      }).then(function(){
        var user = firebase.auth().currentUser;
        user.sendEmailVerification().then(function() {
          // Email sent.
        }).catch(function(error) {
          // An error happened.
        });
        
        console.log("created user")});
}
//console.log(info.email.value)
function login(event){
  event.preventDefault();
  
  //var email = info.email.value
  //var password = info.password.value
  //
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  console.log(email,password)
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode == 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
      // [END_EXCLUDE]
    });
}

info.addEventListener('click', register1 )
//info2.addEventListener('click', login )
