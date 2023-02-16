"use strict";
// global variables
const password_input = document.getElementById("pass-input");
const copy_button = document.getElementById("copy-button");
const pass_length = document.getElementById("pass-length");
const lower_case_input = document.getElementById("lowercase");
const upper_case_input = document.getElementById("uppercase");
const numbers_input = document.getElementById("numbers");
const symbols_input = document.getElementById("symbols");
const generate_password_button = document.getElementById("generate-pass");
// letter symbols and numbers
const lower_case = "abcdefghijklmnopqrstuvwxyz";
const upper_case = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const symbols = "@#$%&^+-!";
let copy_state = true;
const randomLowerCaseLetters = () => {
    return lower_case[Math.floor(Math.random() * lower_case.length)];
};
const randomUpperCaseLetters = () => {
    return upper_case[Math.floor(Math.random() * upper_case.length)];
};
const randomNumbers = () => {
    return numbers[Math.floor(Math.random() * numbers.length)];
};
const randomSymbols = () => {
    return symbols[Math.floor(Math.random() * symbols.length)];
};
const checkBoxUnchecked = () => {
    return (!lower_case_input.checked &&
        !upper_case_input.checked &&
        !numbers_input.checked &&
        !symbols_input.checked);
};
const checkBoxHandler = () => {
    let password = [];
    copy_state = true;
    if (lower_case_input.checked) {
        password.push(randomLowerCaseLetters());
    }
    if (upper_case_input.checked) {
        password.push(randomUpperCaseLetters());
    }
    if (numbers_input.checked) {
        password.push(randomNumbers());
    }
    if (symbols_input.checked) {
        password.push(randomSymbols());
    }
    if (checkBoxUnchecked()) {
        password.push("");
        copy_state = false;
    }
    return password;
};
const passwordGenerateHandler = () => {
    let password = "";
    for (let i = 0; i < Number(pass_length.value); i++) {
        let shuffledPass = checkBoxHandler()[Math.floor(Math.random() * checkBoxHandler().length)];
        password += shuffledPass;
    }
    password_input.value = password;
};
const passwordCopyHandler = () => {
    if (copy_state) {
        password_input.focus();
        password_input.select();
        document.execCommand("copy");
    }
    else {
        return;
    }
};
generate_password_button.addEventListener("click", passwordGenerateHandler);
copy_button.addEventListener("click", passwordCopyHandler);
