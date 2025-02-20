import { showAlert } from './alerts';

export const login = async function (email, password) {
  const data = {
    email,
    password,
  };

  try {
    const res = await fetch('/api/v1/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const resData = await res.json();

    if (resData.status === 'success') {
      showAlert('success', 'Logged in successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    } else {
      showAlert('error', resData.message);
    }
  } catch (err) {
    showAlert(err.message || 'Something went wrong');
  }
};

export const logout = async function () {
  try {
    const res = await fetch('http://127.0.0.1:3000/api/v1/users/logout');
    const data = await res.json();

    if (data.status === 'success') {
      location.reload(true);
    }
  } catch (err) {
    showAlert('error', 'Error logging out! Try again.');
  }
};
