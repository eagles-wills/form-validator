const form = document.querySelector("#form");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirm-password");

const showError = (input, message) => {
	const formControl = input.parentElement;
	input.classList.add("error");
	const small = formControl.querySelector("small");
	small.innerText = message;
};

const showSuccess = (input) => {
	input.classList.add("success");
};

const checkEmail = (input) => {
	const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (re.test(input.value.trim())) {
		showSuccess(input);
	} else {
		showError(input, "Please Enter a Valid Email");
	}
};

const checkPassword = (password, confirmPassword) => {
	if (password.value !== confirmPassword.value) {
		showError(confirmPassword, "Password do not match");
	}
};

const getFieldName = (input) =>
	`${input.id.charAt(0).toUpperCase()}${input.id.slice(1)}`;

const checkRequired = (inputArr) => {
	inputArr.forEach((input) => {
		if (input.value.trim() === "") {
			showError(input, `${getFieldName(input)} is required`);
		}
	});
};

const checkLength = (input, min, max) => {
	if (input.value.length < min) {
		showError(
			input,
			`${getFieldName(input)} must not be less than the ${min} character`,
		);
	} else if (input.value.length > max) {
		showError(
			input,
			`${getFieldName(input)} must not be greater than the ${max}`,
		);
	} else {
		showSuccess(input);
	}
};
form.addEventListener("submit", (e) => {
	e.preventDefault();
	checkEmail(email);
	checkRequired([username, email, password, confirmPassword]);
	checkLength(username, 3, 10);
	checkLength(password, 6, 25);
	checkPassword(password, confirmPassword);
	console.log("form good to submit");
});
