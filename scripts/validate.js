const validationConfig = {
	formSelector: ".form",
	inputSelector: ".popup__input",
	submitButtonSelector: ".popup__submit",
    submitDisabled: ".popup__submit_invalid",
	inputErrorClass: "popup__input_error",
	inputErrorVisible: "popup__input_error-visible",
};

const openError = (form, input, errorMessege,config) => {
    const errorContainer = form.querySelector(`.${input.id}-error`);
    input.classList.add(config.inputErrorClass); 
    errorContainer.classList.add(config.inputErrorVisible);
    errorContainer.textContent = errorMessege;
};   

const hideError = (form, input , config) => {
    const errorContainer = form.querySelector(`.${input.id}-error`);
    console.log(errorContainer);
    input.classList.remove(config.inputErrorClass); 
    errorContainer.classList.remove(config.inputErrorVisible);
    errorContainer.textContent= '';
}



const inputValid = (form,input,config) => {
    if (!input.validity.valid) {
		openError(form, input, input.validation.errorMessege, inputErrorClass,inputErrorVisible);
	} else {
		hideError(form, input, config);
	}
}

const invalidInput = (inputList) => {
    return inputList.some((input) =>{
            return !input.validity.valid;
    });
}; 

const disableButton = (inputList,buttonElement,config) =>{
    if (invalidInput(inputList)) {
        buttonElement.classList.add(config.buttonInvalidClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(config.buttonInvalidClass);
        buttonElement.disabled = false;
    };
};

const setEventListener = (form, config) => {
     const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
     const buttonElement = form.querySelector(submitButtonSelector);
     disableButton(inputList,buttonElement,config);
     
     inputList.forEach((input) => {
 		input.addEventListener("input", function () {
 			inputValid(form, input, config);
 			disableButton(inputList, buttonElement, config);
 		});
 	});
 };


const enableValidation = (config) => {
	const formList = Array.from(document.querySelectorAll(config.formSelector));
 	formList.forEach((form) => {
 		form.addEventListener("submit", (evt) => {
 			evt.preventDefault();
 			console.log("отправка формы");
 		});
            setEventListener(form,config);
 	});
 };
