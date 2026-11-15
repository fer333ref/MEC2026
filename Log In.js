const email = document.getElementById("email");
const password = document.getElementById("password");
const status = document.getElementById("status");

const button1 = document.getElementById("physical");
const button2 = document.getElementById("mental");



document.getElementById("signUp").onclick = () =>
    createUserWithEmailAndPassword(auth, email.value, password.value).catch(e => status.textContent = e.message);

document.getElementById("signIn").onclick = () =>
    signInWithEmailAndPassword(auth, email.value, password.value).catch(e => status.textContent = e.message);

document.getElementById("signOut").onclick = () => signOut(auth);

onAuthStateChanged(auth, user => {
    status.textContent = user ? "Signed in as " + user.email : "Signed out";
    EmailSignedInAs = user ? user.email : null;

    if (auth.currentUser == null) {
        button1.hidden = true;
        button2.hidden = true;
    }
    else {
        button1.hidden = false;
        button2.hidden = false;
    }
});