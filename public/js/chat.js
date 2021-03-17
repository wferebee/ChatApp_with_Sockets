
 module.exports = function (io) {
   var clients = 0;
   const users = [];


   io.on('connection', function (socket) {
      console.log('A user connected');

      socket.on('setUsername', function (data) {
         //console.log(data);

         if (users.indexOf(data) > -1) {
            socket.emit('userExists', data + ' username is taken! Try some other username.');
            console.log("attempted " + data);
         } else {
            console.log(data);
            users.push(data);
            socket.emit('userSet', {
               username: data
            });
            clients++;
            socket.emit('newclientconnect', {
               description: 'Hey, welcome!'
            });
            socket.broadcast.emit('newclientconnect', {
               description: clients + ' clients connected!'
            })

         }


         socket.on('disconnect', function () {
  
            clients--;
            console.log('A user disconnected');

            socket.broadcast.emit('clientDisconnect', {
               description: clients + ' clients connected!'
            });
            
            console.log(data + " just disconnected")
           let index = users.indexOf(data);
            if (index > -1) {
              users.splice(index, 1);
            }
         });

         socket.on('msg', function (data) {
            //Send message to everyone
            io.sockets.emit('newmsg', data);
         })
      })


   })
}