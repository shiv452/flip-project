// Get the input elements and the face element from the HTML
let usernameInput = document.querySelector('.username');
let passwordInput = document.querySelector('.password');
let showPasswordButton = document.querySelector('.password-button');
let face = document.querySelector('.face');
let loginButton = document.querySelector('.login-button');

// Add event listener for when password input is focused
passwordInput.addEventListener('focus', event => {
  // Hide both hands
  document.querySelectorAll('.hand').forEach(hand => {
    hand.classList.add('hide');
  });
  // Remove breath animation from the tongue
  document.querySelector('.tongue').classList.remove('breath');
});

// Add event listener for when password input is blurred
passwordInput.addEventListener('blur', event => {
  // Show both hands and remove peek animation
  document.querySelectorAll('.hand').forEach(hand => {
    hand.classList.remove('hide');
    hand.classList.remove('peek');
  });
  // Add breath animation to the tongue
  document.querySelector('.tongue').classList.add('breath');
});

// Add event listener for when username input is focused
usernameInput.addEventListener('focus', event => {
  // Calculate the length of the username and adjust the head rotation accordingly
  let length = Math.min(usernameInput.value.length - 16, 19);
  document.querySelectorAll('.hand').forEach(hand => {
    hand.classList.remove('hide');
    hand.classList.remove('peek');
  });
  face.style.setProperty('--rotate-head', `${-length}deg`);
});

// Add event listener for when username input is blurred
usernameInput.addEventListener('blur', event => {
  // Reset the head rotation to 0 degrees
  face.style.setProperty('--rotate-head', '0deg');
});

// Add event listener for when text is inputted into the username input
usernameInput.addEventListener('input', _.throttle(event => {
  // Calculate the length of the username and adjust the head rotation accordingly
  let length = Math.min(event.target.value.length - 16, 19);
  face.style.setProperty('--rotate-head', `${-length}deg`);
}, 100));

// Add event listener for when the login button is clicked
loginButton.addEventListener('click', event => {
  const email = usernameInput.value;
  const password = passwordInput.value;

  // Make a request to the server to validate the email and password
  fetch('/validate-login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    if (data.isValid) {
      // If the email and password are correct, redirect to flip.html
      window.location.href = 'flip.html';
    } else {
      // If the email and password are incorrect, show an error message
      alert('Incorrect email or password.');
    }
  })
  .catch(error => {
    // Handle any errors that occurred during the request
    console.error(error);
    alert('An error occurred. Please try again later.');
  });
});

// Add event listener for when the show password button is clicked
showPasswordButton.addEventListener('click', event => {
  if (passwordInput.type === 'text') {
    // If password is currently visible, hide it and both hands, and remove peek animation from hands
    passwordInput.type = 'password';
    document.querySelectorAll('.hand').forEach(hand => {
      hand.classList.remove('peek');
      hand.classList.add('hide');
    });
  } else {
    // If password is current // If password is currently hidden, show it and animate hands
    passwordInput.type = 'text';
    document.querySelectorAll('.hand').forEach(hand => {
      hand.classList.remove('hide');
      hand.classList.add('peek');
    });
  }
});

