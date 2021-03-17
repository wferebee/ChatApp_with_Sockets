

const buildOutChatArea = (user) => {
    $('#username').hide();
    $('#error-container').html(`<p>Username: ${user}</p>`)
    $('#chatText').html('<textarea type = "text" id = "message"></textarea>\
     <button id="textButton" type = "button" name = "button" onclick = "sendMessage()">Send</button>');

    $("#textAreaCol").html('<div id = "message-container"></div>')
}

const send_AppendMessage = (user, message) => {
    $('#message-container').append('<p><b>' +
    user + '</b>: ' + message + '</p>');
}