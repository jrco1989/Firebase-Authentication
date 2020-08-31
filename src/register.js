
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
  
document.getElementById("email").focus();

const info = document.getElementById("btnSend")

function register1(event){
    event.preventDefault();
    
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function(){
      var user = firebase.auth().currentUser;
      user.sendEmailVerification().then(function() {
        console.log("created user and sent email")
      }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode == 'auth/weak-password') {
        alert('The password is too weak.');
      } else {alert(errorMessage);}
      console.log(error);

      })
        
    });
}
info.addEventListener('click', register1 )
