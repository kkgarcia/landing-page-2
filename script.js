///  MENU TOGGLE ////

const openMenuBtn = document.querySelector('.header__burger-menu-btn');
const closeMenuBtn = document.querySelector('.hidden-menu__close-btn');
const hiddenMenu = document.querySelector('.header__hidden-menu');
const blurBackground = document.querySelector('.blur-bg');

openMenuBtn.addEventListener('click', () => {
  hiddenMenu.classList.toggle('hidden-menu_visible');
  blurBackground.classList.toggle('blur-bg_visible');
});

closeMenuBtn.addEventListener('click', () => {
  hiddenMenu.classList.remove('hidden-menu_visible');
  blurBackground.classList.remove('blur-bg_visible');
});

blurBackground.addEventListener('click', () => {
  hiddenMenu.classList.remove('hidden-menu_visible');
  blurBackground.classList.remove('blur-bg_visible');
});

/// FORM VALIDATION ///

const submitFormBtn = document.querySelector('.contact-me__submit-btn');
const nameInput = document.querySelector('.contact-me__name-input');
const emailInput = document.querySelector('.contact-me__email-input');
const policyChekbox = document.querySelector('.contact-me__policy-chekbox');
const textInput = document.querySelector('.contact-me__text-input');
const nameLabel = document.querySelector('.contact-me__custom-label-name');
const emailLabel = document.querySelector('.contact-me__custom-label-email');

// Remove error massages on input
[nameInput, emailInput].forEach((input) => {
  input.addEventListener('input', () => {
    nameLabel.classList.remove('input-error');
    emailLabel.classList.remove('input-error');
  });
});

// Validate on submit
submitFormBtn.addEventListener('click', () => {
  if (!nameInput.value) {
    nameLabel.classList.add('input-error');
    nameInput.focus();
    return;
  }

  if (!emailInput.value) {
    emailLabel.classList.add('input-error');
    emailInput.focus();
    return;
  }
  const name = nameInput.value;
  const email = emailInput.value;
  const text = textInput.value;

  // clear inputs
  nameInput.value = '';
  emailInput.value = '';
  textInput.value = '';
  policyChekbox.checked = false;

  // submit if all validations passed

  // submitToServerWithQuery(name, email, text)
  // submitToServerWithJSON(name, email, text)
  // submitToServerWithForm(name, email, text)
});

// sumbit method 1
async function submitToServerWithQuery(name, email, text = '') {
  try {
    const response = await fetch(
      `https://myserver.com/contact?name=${name}&email=${email}&text=${text}`,
      {
        method: 'POST',
      }
    );
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

// submit method 2
async function submitToServerWithJSON(name, email, text = '') {
  try {
    const form = { name, email, text };
    const jsonData = JSON.stringify(form);

    const response = await fetch('https://myserver.com/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonData,
    });

    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

// submit method 3
async function submitToServerWithForm(name, email, text = '') {
  try {
    const form = new FormData();
    form.append('name', name);
    form.append('email', email);
    form.append('text', text);

    const response = await fetch('https://myserver.com/contact', {
      method: 'POST',
      body: form,
    });

    const result = response.json();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}
