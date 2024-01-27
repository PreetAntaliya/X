const showPassword = (inputId, iconId) => {
    let inputPassword = document.getElementById(inputId);
    let eyeIcon = document.getElementById(iconId);

    if (inputPassword.type === 'password') {
        inputPassword.type = 'text';
        eyeIcon.src = '/public/img/eye-unhide.svg';
    } else {
        inputPassword.type = 'password';
        eyeIcon.src = '/public/img/Eye.svg';
    }
};