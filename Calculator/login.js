$(document).ready(() => {
    
    const checkFormValidity = () => {
        let isValid = true;
        $("#email, #username, #password, #confirmPassword").each(function() {
            const field = $(this);
            const value = field.val();
            if (!value) {
                isValid = false;
                return false;
            }
        });

        $("#loginButton").prop('disabled', !isValid);
    };

    const validateField = (input, errorSelector, regex, emptyMessage, errorMessage, lengthMessage = null, minLength = 0, maxLength = Infinity) => {
        const value = input.val();
        let isValid = true;

        if(!value) {
            $(errorSelector).text(emptyMessage);
            isValid = false;
        } else if(regex && !regex.test(value)) {
            $(errorSelector).text(errorMessage);
            isValid = false;
        } else if(value.length < minLength || value.length > maxLength) {
            if(lengthMessage) {
                $(errorSelector).text(lengthMessage);
                isValid = false;
            }
        } else {
            $(errorSelector).text('');
        }
        return isValid;
    };

    const updateLoginButtonState = () => {
        const isAllValid = $(".error").text() === '';
        $("#loginButton").prop('disabled', !isAllValid);
    }; 

    $("#email, #username, #password, #confirmPassword").on('input', () => {
        validateField($("#email"), "#emailError", /^[a-zA-Z0-9._%+-]+@northeastern.edu$/, "Email cannot be empty", "Must be a valid Northeastern email");
        validateField($("#username"), "#usernameError", /^[a-zA-Z0-9]+$/, "Username cannot be empty", 
        "Username cannot contain special characters", "Username must be between 6 and 20 characters", 6, 20);
        const passwordValid = validateField($("#password"), "#passwordError", null, "Password cannot be empty", "", "Password must be between 8 and 20 characters", 8, 20);
        
        const confirmPasswordValue  = $("#confirmPassword").val();
        if(passwordValid && confirmPasswordValue !== $("#password").val()) {
            $("#confirmPasswordError").text("Passwords do not match");
        } else {
            $("#confirmPasswordError").text('');
        }
        updateLoginButtonState();
    });

    $("#loginForm").on('submit', (event) => {
        let username = $('#username').val();
        event.preventDefault();
        if ($(".error").text() === '') {
            window.location.href = `calc.html?username=${username}`;
        }
    });
    checkFormValidity();
});