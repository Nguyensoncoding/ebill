
document.getElementById("mysubmit").onclick = function(event) {
    event.preventDefault();  // Prevent form submission

    let myemail = document.getElementById("myemail").value.trim();
    let mypassword = document.getElementById("mypassword").value.trim();
    let mypassword2 = document.getElementById("mypassword2").value.trim();
    let myterm = document.getElementById("myterm").checked;
    let signup = false;
    let errorMessage = document.getElementById("error-message");

    if (lengthcondition(myemail, mypassword, signup)) {
        if (passwordcheck(mypassword, mypassword2, signup)) {
            if (myterm) {
                // Store data in localStorage
                localStorage.setItem('userEmail', myemail);
                localStorage.setItem('userPassword', mypassword);
                window.location.assign(`index.html`);
            } 
            else {
                errorMessage.textContent = "You haven't agreed to our terms of service yet!";
                errorMessage.style.display = 'block';
            }
        }
    }

    function lengthcondition(a, b, c) {
        if (a.length < 8 || b.length < 8) {
            errorMessage.textContent = "Your Password or Username is too short!";
            errorMessage.style.display = 'block';
            c = false;
        } else {
            c = true;
        }
        return c;
    }

    function passwordcheck(a, b, c) {
        if (a === b) {
            c = true;
        } 
        else {
            errorMessage.textContent = "Your passwords do not match, please try again";
            errorMessage.style.display = 'block';
            c = false;
        }
        return c;
    }


};
