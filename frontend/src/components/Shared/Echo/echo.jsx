import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

const token = JSON.parse(localStorage.getItem('token'));

const echo = new Echo({
  broadcaster: 'pusher',
  key: 'fbf9a02e4e1aaa1ce63a',
  cluster: 'ap1',
  forceTLS: true,
  auth: {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  },
});

export default echo;