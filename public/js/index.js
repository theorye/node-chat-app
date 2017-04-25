console.log(window)
var socket = io();
socket.on('connect', () => {
  console.log('Connected to server');

  // socket.emit('createEmail', {
  //   to: 'jen@example.com',
  //   text: 'hey this is andrew',
  // })
  // socket.emit('createMessage', {
  //   from: 'Andrew',
  //   text: 'yup work for me',
  // })
});

socket.on('disconnect', function() {
  console.log('Disconnected from server')
});

// socket.on('newEmail', function(email) {
//   console.log('new email', email);
// });

socket.on('newMessage', function (message) {
  console.log('newMessage', message);
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
})

// socket.emit('createMessage', {
//   from: 'Frank',
//   text: 'Hi',
// }, function() {
//   console.log('Got it');
// })

jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function () {

  })
})
