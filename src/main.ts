// global variables
const password_input = document.getElementById(
  "pass-input"
) as HTMLInputElement;
const copy_button = document.getElementById("copy-button") as HTMLButtonElement;
const pass_length = document.getElementById("pass-length") as HTMLInputElement;
const lower_case_input = document.getElementById(
  "lowercase"
) as HTMLInputElement;
const upper_case_input = document.getElementById(
  "uppercase"
) as HTMLInputElement;
const numbers_input = document.getElementById("numbers") as HTMLInputElement;
const symbols_input = document.getElementById("symbols") as HTMLInputElement;
const generate_password_button = document.getElementById(
  "generate-pass"
) as HTMLButtonElement;

// letter symbols and numbers
const lower_case: string = "abcdefghijklmnopqrstuvwxyz";
const upper_case: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers: string = "0123456789";
const symbols: string = "@#$%&^+-!";

let copy_state: boolean = true;

type passwordType = () => string;

// returns randomLowercases
const randomLowerCaseLetters: passwordType = () => {
  return lower_case[Math.floor(Math.random() * lower_case.length)];
};

// returns randomUppercases
const randomUpperCaseLetters: passwordType = () => {
  return upper_case[Math.floor(Math.random() * upper_case.length)];
};

// returns randomNumbers
const randomNumbers: passwordType = () => {
  return numbers[Math.floor(Math.random() * numbers.length)];
};

// returns randomSymbols
const randomSymbols: passwordType = () => {
  return symbols[Math.floor(Math.random() * symbols.length)];
};

type checkBoxHandlerType = () => string[];

type checkBoxUncheckedType = () => boolean;

const checkBoxUnchecked: checkBoxUncheckedType = () => {
  return (
    !lower_case_input.checked &&
    !upper_case_input.checked &&
    !numbers_input.checked &&
    !symbols_input.checked
  );
};

const checkBoxHandler: checkBoxHandlerType = () => {
  let password: string[] = [];
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

  // if checkboxes is not checked

  if (checkBoxUnchecked()) {
    password.push("");
    copy_state = false;
  }

  return password;
};

const passwordGenerateHandler = () => {
  let password: string = "";

  for (let i = 0; i < Number(pass_length.value); i++) {
    let shuffledPass: string =
      checkBoxHandler()[Math.floor(Math.random() * checkBoxHandler().length)];

    password += shuffledPass;
  }

  password_input.value = password;
};

// password copy handler function

const passwordCopyHandler = () => {
  if (copy_state) {
    password_input.focus();
    password_input.select();
    document.execCommand("copy");
  } else {
    return;
  }
};

// event listeners
generate_password_button.addEventListener("click", passwordGenerateHandler);
copy_button.addEventListener("click", passwordCopyHandler);
