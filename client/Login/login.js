const emailInput = document.querySelector('#email-input');
const passwordInput = document.querySelector('#password-input');
const loginBtn = document.querySelector('#login-btn');
const forgotPasswordBtn = document.getElementById('forgot-password-button');

function successalert(msg) {
    const alertDiv = document.getElementById('success-alert');
    alertDiv.classList.remove("d-none");
    alertDiv.innerText = msg
    setTimeout(() => {
        alertDiv.classList.add("d-none")
    }, 4000);

}

function failurealert(msg) {
    const errorAlertDiv = document.getElementById('failure-alert');
    errorAlertDiv.classList.remove("d-none");
    errorAlertDiv.innerText = msg;
    setTimeout(() => {
        errorAlertDiv.classList.add("d-none");
    }, 2000);
}


loginBtn.addEventListener('click',async (e) => {
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;

    const loginData = {
        email: email,
        password: password
    };

    if (email === '' || password === '') {
        failurealert("Enter all fields");
        // alert("Enter all fields");
    }
    else {
        try {
            const userDetails = await axios.post('http://localhost:3000/users/login', loginData);

            if (userDetails.data.success) {
                successalert(userDetails.data.message);
                localStorage.setItem("token", userDetails.data.token);
            }
            else {
                failurealert(userDetails.data.message);
                // alert();
            }
            
        }
        catch (err) {
            console.log(err);
            failurealert("An error occurred. Please try again.");
        }
    }
});