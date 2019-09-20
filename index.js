const io = require('socket.io')();


io.on('connection', (socket) => {

  socket.join('main_room', () => {
   // console.debug('main join');
   // console.info(socket.rooms);
  });

  socket.join('test_room', () => {
   // console.debug('test join');
   // console.info(socket.rooms);
  });


  socket.on('disconnect', () => {
  //  console.debug('disconnect');
  //  console.debug(socket.id);
  });

  socket.on('join', (room_name) => {
   // console.debug(room_name);
    
    socket.join(room_name, (err) => {
    //  console.debug(socket.rooms);
     // console.error(err);
    });
  });

  // Client 쪽 코드
  /**
   * io.on('message', (data, fn) {
   *   fn('test');
   * });
   
  // 로 보냈을 경우 response 로 들어오는 값은 'test'
  socket.emit('message', 'test', (response) => {
    // ACK
    console.info('send test message');
    console.debug(response);
  });
  */
});

io.to('test_room').emit('testRoomMessage', 'test message');

io.to('main_room').emit('mainRoomMessage', 'main message');

io.listen(3200);

var value = 1;

var obj = {
  value: 100,
  foo: function() {
    console.log("foo's this: ",  this);  // obj
    console.log("foo's this.value: ",  this.value); // 100
    function bar() {
      console.log("bar's this: ",  this); // window
      console.log("bar's this.value: ", this.value); // 1
    }
    bar();
  }
};

obj.foo();