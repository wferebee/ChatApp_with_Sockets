

const buildOutChatArea = (user) => {
    $('#row2').hide();
    $('#error-container').html(`<p>Username: ${user}</p>`)
    $('#chatText').html('<textarea type = "text" id = "message"></textarea>\
     <button id="textButton" type = "button" name = "button" onclick = "sendMessage()">Send</button>');

    $("#chatBoxCol").html('<div id = "message-container"></div>')
}

const send_AppendMessage = (user, message) => {
    $('#message-container').append('<p id="textSent"><span id="usernameText"><b>' +
    user + '</b></span>: ' + message + '</p>');
}