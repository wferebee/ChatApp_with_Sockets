$(function () {

   var socket = io();
   setUsername = () => {
      socket.emit('setUsername', $("#name").val());

   };
   var user;
   socket.on('userExists', function (data) {
      $('#error-container').html(data);

   });
   socket.on('userSet', function (data) {
      user = data.username;
      $('#username').hide();
      $('#error-container').html(`<p>Username: ${user}</p>`)
      $('#chatText').html('<textarea type = "text" id = "message"></textarea>\
       <button id="textButton" type = "button" name = "button" onclick = "sendMessage()">Send</button>');

      $("#textAreaCol").html('<div id = "message-container"></div>')
   });
   sendMessage = () => {
      var msg = $('#message').val();
      if (msg) {
         socket.emit('msg', {
            message: msg,
            user: user
         });
         $('#message').val(" ");
      }
   }
   socket.on('newmsg', function (data) {
      if (user) {
         if($("#message").val("") === ''){
            /* nothing */
         }
         $('#message-container').append('<p><b>' +
            data.user + '</b>: ' + data.message + '</p>');
         var objDiv = $("#message-container");
         objDiv.scrollTop = objDiv.scrollHeight;
      }
   })

   socket.on('newclientconnect', function (data) {

      $("#inRoom").html(`<p> ${data.description} </p>`);

   });


   function setFocusOnDivWithId(elementId) {
      const scrollIntoViewOptions = {
         behavior: "smooth",
         block: "center"
      };
      document.getElementById(elementId).scrollIntoView(scrollIntoViewOptions);
   };
   setFocusOnDivWithId("#message-container");

});