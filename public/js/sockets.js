

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
      buildOutChatArea(data.username) // located in DomBuilding.js
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
   };


   socket.on('newmsg', function (data) {
      if (user) {
         if($("#message").val("") === ''){
            /* nothing */
         }
         send_AppendMessage(data.user, data.message);
         var objDiv = $("#message-container");
         objDiv.scrollTop = objDiv.scrollHeight;
      }
   });


   socket.on('newclientconnect', function (data) {

      $("#inRoom").html(`<p> ${data.description} </p>`);

   });


   socket.on('clientDisconnect', function (data) {

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