import { showAlert } from './alerts';

// type is either 'password' or 'data'
export const updateSettings = async function (data, type) {
  try {
    const url =
      type === 'password'
        ? 'http://127.0.0.1:3000/api/v1/users/updateMyPassword'
        : 'http://127.0.0.1:3000/api/v1/users/updateMe';

    const options = {
      method: 'PATCH',
      body: data,
    };

    if (!(data instanceof FormData)) {
      options.headers = { 'Content-Type': 'application/json' };
      options.body = JSON.stringify(data);
    }

    const res = await fetch(url, options);

    const resData = await res.json();

    if (resData.status === 'success') {
      showAlert('success', `${type.toUpperCase()} is successfully updated.`);
    }
  } catch (err) {
    showAlert(err.message || 'Something went wrong.');
  }
};
