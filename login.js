document.getElementById("loginButton").onclick = function(event) {
    event.preventDefault();  // Prevent form submission

    let email = document.getElementById("loginEmail").value.trim();
    let password = document.getElementById("loginPassword").value.trim();
    let errorMessage = document.getElementById("error-message");

    let storedEmail = localStorage.getItem('userEmail');
    let storedPassword = localStorage.getItem('userPassword');

    if (email === storedEmail && password === storedPassword) {
        window.location.assign(`signed.html`);
    } 
    else {
        errorMessage.textContent = "Invalid email or password!";
        errorMessage.style.display = 'block';
    }
};
