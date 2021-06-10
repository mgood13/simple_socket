$(document).ready(function(){

        // Connect to the port used by the Flask application
        var socket = io.connect('http://127.0.0.1:5000')

        // When a connection is registered pass along this message
        socket.on('connect', function(){
            socket.emit('my event', {data: 'User Connected'})
        });

        // Final serving of the results of the message to the HTML page
        // We don't log the User connected message, only the messages themselves
        socket.on('my response', function(msg){

        if (msg.data.hasOwnProperty('username')) {

            // If the message is from the current user then the list group item is a "info" or blue bar
            if (msg.data.username == $('#MyMessage').data('name')){
                var messages = d3.select('#chatlist')
                var list = messages.append('li')
                list.text(`${msg.data.username}: ${msg.data.message}`)
                list.attr('class', 'list-group-item list-group-item-info')
            }

            // If the message is from any other user it is a "success" or green bar
            else {
                var messages = d3.select('#chatlist')
                var list = messages.append('li')
                list.text(`${msg.data.username}: ${msg.data.message}`)
                list.attr('class', 'list-group-item list-group-item-success')

            }


        }

        console.log('Received Message')
        });




        // When the user enters a username and presses submit this function runs to create the chat page
        $('#inputname').on('click',function(){

            // Grab the username the user entered
            var username = $('#myname').val()
            socket.send();

            // Remove the username entry field and submit button
            $('#myname').val('');
            $('#inputname').detach()
            $('#myname').detach()

            // Add in the message entry field and store the username in the data property of the input field
            var body = d3.select('#bare')
            var myinput = body.append('input')

            myinput.attr('id', 'MyMessage')
            myinput.attr('data-name', username)

            // Add the send button
            var send = body.append('button')
            send.text('SEND')
            send.attr('id', 'sendbutton')

            // Capture the relevant information from the sent message
            // Package the information into an object and send to the server
            send.on("click", () => {
                var information = {'username': $('#MyMessage').data('name'), 'message':$('#MyMessage').val()}

                // Pass the object "information" to the flask route "my event" (see app.py)
                socket.emit('my event', {data: information});

                // Clear the message box
                $('#MyMessage').val('');

        });

        });


    });