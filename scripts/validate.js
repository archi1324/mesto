const validationConfig = {
	formSelector: ".form",
	inputSelector: ".popup__input",
	submitButtonSelector: ".popup__submit",
    submitDisabled: "popup__submit_disabled",
	inputErrorClass: "popup__input_error",
	inputErrorVisible: "popup__input_error-visible",
};

const openError = (form, input, errorMessage,config ) => {
    const errorContainer = form.querySelector(`#${input.id}-error`);
    input.classList.add(config.inputErrorClass); 
    errorContainer.classList.add(config.inputErrorVisible);
    errorContainer.textContent = errorMessage;
};   

const hideError = (form, input , config) => {
    const errorContainer = form.querySelector(`#${input.id}-error`);
    input.classList.remove(config.inputErrorClass); 
    errorContainer.classList.remove(config.inputErrorVisible);
    errorContainer.textContent= '';
}

const validInput = (form,input,config) => {
    if (!input.validity.valid) {
		openError(form, input, input.validationMessage, config);
	} else {
		hideError(form, input, config);
	}
}

const invalidInput = (inputList) => {
    return inputList.some((input) =>{
            return !input.validity.valid;
        });
}; 

const disableButton = (inputList,buttonElement) =>{
    if (invalidInput(inputList)) {
        buttonElement.classList.add('popup__submit_disabled');
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove('popup__submit_disabled');
        buttonElement.disabled = false;
    };
};

const setEventListener = (form, config) => {
    const inputList = Array.from(form.querySelectorAll(config.inputSelector));
     const buttonElement = form.querySelector(config.submitButtonSelector);
     disableButton(inputList,buttonElement,config);
     inputList.forEach((input) => {
 		input.addEventListener("input", function () {
            validInput(form, input, config);
 			disableButton(inputList, buttonElement, config);
 		});
 	});
 };

const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
 	formList.forEach((form) => {
 		form.addEventListener("submit", (evt) => {
 			evt.preventDefault();
 		});
            setEventListener(form,config);
            
 	});
 };

 enableValidation(validationConfig);



