$(function () {
    
    var socket = io();
     setUsername =()=>{
       socket.emit('setUsername', $("#name").val());
       
    };
    var user;
    socket.on('userExists', function(data) {
      $('#error-container').html(data);
    });
    socket.on('userSet', function(data) {
       user = data.username;
       $('body').html('<input type = "text" id = "message">\
       <button type = "button" name = "button" onclick = "sendMessage()">Send</button>\
       <div id = "message-container"></div>');
    });
    sendMessage = () => {
       var msg = $('#message').val();
       if(msg) {
          socket.emit('msg', {message: msg, user: user});
       }
    }
    socket.on('newmsg', function(data) {
       if(user) {
          $('#message-container').append('<div><b>' + 
          data.user + '</b>: ' + data.message + '</div>');
       }
    })
    
    
      });