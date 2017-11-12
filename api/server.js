const app = require('express')(),
  http = require('http').Server(app),
  io = require('socket.io')(http),
  dateFormat = require('dateformat');


var users = [];
io.on('connection', (socket) => {
  var onesignal;
  socket.on('disconnect', function () {
    users.splice(users.indexOf(socket), 1);
    io.emit('users-changed', { user: socket.nickname, event: 'left', users_online: users });
  });

  socket.on('set-nickname', (data) => {
    socket.nickname = data.nickname;
    onesignal = data.onesignal;
    users.push({ id: socket.id, nickname: socket.nickname, onesignal_id: onesignal });
    io.emit('users-changed', { user: data.nickname, event: 'joined', users_online: users });
  });

  socket.on('add-message', (message) => {
    io.emit('message', { text: message.text, from: socket.nickname, created: dateFormat(new Date(), 'HH:MM') });
    var message = {
      app_id: "APP-ID",
      headings: { "en": socket.nickname + ":" },
      contents: { "en": message.text },
      included_segments: ["All"]
    };
    sendNotification(message);
  });
});

//Enviar notificação com onesignal
var sendNotification = function (data) {
  var headers = {
    "Content-Type": "application/json",
    "Authorization": "Basic [API AUTH TOKEN]" 
  };

  var options = {
    host: "onesignal.com",
    port: 443,
    path: "/api/v1/notifications",
    method: "POST",
    headers: headers
  };

  var https = require('https');
  var req = https.request(options, function (res) {
    res.on('data', function (data) {
      // console.log("Response:");
      // console.log(JSON.parse(data));
    });
  });

  req.on('error', function (e) {
    console.log("ERROR:");
    console.log(e);
  });

  req.write(JSON.stringify(data));
  req.end();
};


var port = process.env.PORT || 3001;

http.listen(port, function () {
  console.log('listening in http://localhost:' + port);
});