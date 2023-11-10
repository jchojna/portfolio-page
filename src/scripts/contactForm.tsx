import { media } from './variables';

const userName = document.querySelector(
  '.form__input--js-name'
)! as HTMLInputElement;
const userEmail = document.querySelector(
  '.form__input--js-email'
)! as HTMLInputElement;
const userPhone = document.querySelector(
  '.form__input--js-phone'
)! as HTMLInputElement;
const userTitle = document.querySelector(
  '.form__input--js-title'
)! as HTMLInputElement;
const userMessage = document.querySelector(
  '.form__input--js-message'
)! as HTMLInputElement;
const formSubmitButton = document.querySelector(
  '.form__submit--js'
)! as HTMLInputElement;

export const validateEmail = (e: Event) => {
  const input = e.target as HTMLInputElement;
  input.value.match(/^\S+@\S+\.\S+$/)
    ? handleInputStyle(input, true)
    : handleInputStyle(input, false);
};

export const validatePhone = (e: Event) => {
  const input = e.target as HTMLInputElement;
  input.value.match(
    /^(\d[\s-]?)?[\(\[\s-]{0,2}?\d{3}[\)\]\s-]{0,2}?\d{3}[\s-]?\d{3}$/i
  ) || input.value.length === 0
    ? handleInputStyle(input, true)
    : handleInputStyle(input, false);
};

export const validateMessage = (e: Event) => {
  const input = e.target as HTMLInputElement;
  input.value.length > 0
    ? handleInputStyle(input, true)
    : handleInputStyle(input, false);
};

export const validateForm = (e: Event) => {
  e.preventDefault();
  const xhr = new XMLHttpRequest();
  const url = 'form.php';

  // backend validation => send form using ajax request
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      var jsonData = JSON.parse(xhr.response);
      if (xhr.status === 200) {
        handleAlerts(jsonData, false);
      } else {
        handleAlerts(jsonData, true);
      }
    }
  };

  const formSubmitVal = formSubmitButton.value;
  const userNameVal = userName.value;
  const userEmailVal = userEmail.value;
  const userPhoneVal = userPhone.value;
  const userTitleVal = userTitle.value;
  const userMessageVal = userMessage.value;
  const data = JSON.stringify({
    submit: formSubmitVal,
    userName: userNameVal,
    userEmail: userEmailVal,
    userPhone: userPhoneVal,
    userTitle: userTitleVal,
    userMessage: userMessageVal,
  });
  xhr.send(data);
};

const handleAlerts = (data: string, isFailed: boolean) => {
  const margin = window.innerWidth >= media.lg ? 20 : 5;
  let heightTotal = margin;
  let delay = 0;
  const delayInterval = 60;
  const alertTimeoutInterval = 5000;
  const transitionTime = 250;
  let visibleAlerts: Alert[] = [];

  // close alert box
  const quitAlertBox = (e: Event) => {
    const self: AlertButton = e.target ? e.target : e;
    const { parentNode, index } = self;

    // hide clicked alert box
    parentNode.style.top = `${parentNode.clientHeight * -1}px`;
    parentNode.classList.remove('alerts__box--visible');
    delay = index * delayInterval;
    parentNode.style.transition = `
      top ${transitionTime}ms ${delay + transitionTime}ms,
      visibility 0s ${delay + transitionTime * 2}ms,
      width ${transitionTime}ms ${delay}ms
    `;

    // update alert boxes below
    if (e.target) {
      visibleAlerts = visibleAlerts.filter(
        (alert) => alert.button.index !== index
      );
      visibleAlerts
        .filter((alert) => alert.button.index >= index)
        .forEach((alert) => {
          const { offsetTop, clientHeight } = alert.box;
          alert.box.style.top = `${offsetTop - clientHeight - margin}px`;
          alert.button.index--;
        });
    }

    // clear timeout and event listener
    clearTimeout(self.alertTimeoutId);
    self.alertTimeoutId = null;
    self.removeEventListener('click', quitAlertBox);
  };

  // handle active alerts
  const alerts = isFailed
    ? ['failure']
    : Object.keys(data).filter((key) => data[key]);
  [...alerts].forEach((alert, index) => {
    // select elements
    const alertBox = document.querySelector(
      `.alerts__box--js-${alert}`
    )! as HTMLElement;
    const alertButton: AlertButton = document.querySelector(
      `.alerts__button--js-${alert}`
    )!;

    // handle appearance of alert boxes
    const alertBoxHeight = alertBox.clientHeight;
    if (alertBox instanceof HTMLElement) {
      alertBox.style.top = `${heightTotal}px`;
      alertBox.style.transition = `
        top ${transitionTime}ms ${delay}ms,
        visibility 0s,
        width ${transitionTime}ms ${delay + transitionTime}ms
      `;
    }
    heightTotal += alertBoxHeight + margin;
    delay += delayInterval;
    alertBox.classList.add('alerts__box--visible');

    // clear timeout and event
    clearTimeout(alertButton.alertTimeoutId);
    alertButton.alertTimeoutId = null;
    alertButton.removeEventListener('click', quitAlertBox);

    // set timeout and event
    alertButton.alertTimeoutId = setTimeout(() => {
      quitAlertBox(alertButton);
    }, alertTimeoutInterval);
    alertButton.index = index;
    alertButton.addEventListener('click', quitAlertBox);

    // create array of alert objects
    visibleAlerts = [
      ...visibleAlerts,
      {
        box: alertBox,
        button: alertButton,
      },
    ];

    // handle inputs appearance
    switch (alert) {
      case 'emptyEmailError':
      case 'invalidEmailError':
        handleInputStyle(userEmail, false);
        break;
      case 'phoneError':
        handleInputStyle(userPhone, false);
        break;
      case 'messageError':
        handleInputStyle(userMessage, false);
        break;
      case 'success':
        handleInputStyle(userEmail, true);
        handleInputStyle(userPhone, true);
        handleInputStyle(userMessage, true);
        break;
      default:
        break;
    }
  });
};

const handleInputStyle = (input: HTMLInputElement, isValid: boolean) => {
  if (isValid) {
    if (input.classList.contains('form__input--invalid'))
      input.classList.remove('form__input--invalid');
  } else {
    if (!input.classList.contains('form__input--invalid'))
      input.classList.add('form__input--invalid');
  }
};

export const addFormEvents = () => {
  formSubmitButton.addEventListener('click', validateForm);
  userEmail.addEventListener('keyup', validateEmail);
  userPhone.addEventListener('keyup', validatePhone);
  userMessage.addEventListener('keyup', validateMessage);
};
