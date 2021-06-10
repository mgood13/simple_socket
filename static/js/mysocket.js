$(document).ready(function(){

        var socket = io.connect('http://127.0.0.1:5000')

        socket.on('connect', function(){
            socket.emit('my event', {data: 'User Connected'})
        });

        socket.on('my response', function(msg){

        if (msg.data.hasOwnProperty('username')) {
            if (msg.data.username == $('#MyMessage').data('name')){
                var messages = d3.select('#chatlist')
                var list = messages.append('li')
                list.text(`${msg.data.username}: ${msg.data.message}`)
                list.attr('class', 'list-group-item list-group-item-info')
            }

            else {
                var messages = d3.select('#chatlist')
                var list = messages.append('li')
                list.text(`${msg.data.username}: ${msg.data.message}`)
                list.attr('class', 'list-group-item list-group-item-success')


            }




        }

        console.log('Received Message')
        });





        $('#inputname').on('click',function(){
            var username = $('#myname').val()
            socket.send();
            $('#myname').val('');
            $('#inputname').detach()
            $('#myname').detach()

            var body = d3.select('#bare')
            var myinput = body.append('input')
            myinput.attr('id', 'MyMessage')
            myinput.attr('data-name', username)

            var send = body.append('button')
            send.text('SEND')

            send.attr('id', 'sendbutton')


            send
            .on("click", () => {
                var information = {'username': $('#MyMessage').data('name'), 'message':$('#MyMessage').val()}
                socket.emit('my event', {data: information});
                $('#MyMessage').val('');


        });

        });








    });