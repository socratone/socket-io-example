const chattingList = document.querySelector('.chatting-list');
const button = document.querySelector('.button');
const input = document.querySelector('.input');

const socket = io();

const addOthersMessage = (message) => {
  chattingList.insertAdjacentHTML(
    'beforeend',
    `<li class="others-message">${message}</li>`
  );
};

const addMyMessage = (message) => {
  chattingList.insertAdjacentHTML(
    'beforeend',
    `<li class="my-message">${message}</li>`
  );
};

socket.on('others-message', (message) => {
  addOthersMessage(message.payload);
});

const handleSubmit = () => {
  socket.emit('my-message', { payload: input.value });
  addMyMessage(input.value);
  input.value = '';
};

button.addEventListener('click', handleSubmit);
input.addEventListener('keyup', (event) => {
  if (event.code === 'Enter') handleSubmit();
});
