var socket = io.connect('http://127.0.0.1:5000')

// Storage for the color options for the buttons
colors = {'red': '#FF0602', 'green': '#61FF33', 'blue': '#0502FF', 'black': '#000000'}
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

        // First check if this message is from the current user or someone else
        if (msg.data.hasOwnProperty('username')) {

            // Check if the message is being sent to the user's chat room
            if (msg.data.chatroom == $('#MyMessage').attr('data-chat')) {

                // 0 is the "base" chatroom and as such gets a unique coloring (blue/green)
                if ($('#MyMessage').attr('data-chat') == 0){
                    var class1 = 'list-group-item list-group-item-info'
                    var class2 = 'list-group-item list-group-item-success'

                }
                // Other chatrooms have a yellow/red coloring
                else{
                    var class1 = 'list-group-item list-group-item-warning'
                    var class2 = 'list-group-item list-group-item-danger'

                }


                // If the message is from the current user then we use the list group class1 which is "info" or blue if in chat room 0
                // and is "warning" or yellow if in any other chat room
                if (msg.data.username == $('#MyMessage').data('name')){
                    var messages = d3.select('#chatlist')
                    var list = messages.append('li')
                    list.text(`${msg.data.username}: ${msg.data.message}`)
                    list.attr('class', class1)
                }

                // If the message is from any other user then it will use list group class2 which is "success" or green if in
                // chat room 0 and is "danger" or red in any other chat room
                else {
                    var messages = d3.select('#chatlist')
                    var list = messages.append('li')
                    list.text(`${msg.data.username}: ${msg.data.message}`)
                    list.attr('class', class2)

                }


            }
            // Log to the console if a message comes in that is in another chat room (You should probably remove this if using
            // this in any real application because you probably don't want someone to be aware that people are talking behind
            // their back)
            else{
                console.log('This is not for me')
            }



        }
        // Handles selection of a colored button
        else if (msg.data.hasOwnProperty('selection')){
            console.log(msg)
            // Alert the room that a certain color has been selected
            var messages = d3.select('#chatlist')
                var list = messages.append('li')
                list.text(`${msg.data.user} has selected: ${msg.data.selection}`)

            // Grab the buttons of all the buttons currently on the page
            var body = d3.select('#bare')
            var names = []
            var buttons = d3.selectAll('button').each(function(){
                var buttonlocal = d3.select(this)
                names.push(buttonlocal.attr('value'))

            })


            // Cycle through the list of possible colors and grab the one that isn't currently on the screen
            // The screen displays 3 buttons and there are 4 in the list so we just grab the odd one out
            for (var k = 0; k < Object.keys(colors).length; k++){
                if ((names.includes(Object.keys(colors)[k]))) {
                }
                else{
                    console.log(Object.keys(colors))
                    var mybutton = d3.select(`#${msg.data.selection}_button`)
                    mybutton.style('background-color', colors[Object.keys(colors)[k]])
                    mybutton.text(Object.keys(colors)[k])

                    mybutton.attr('value', Object.keys(colors)[k])

                    mybutton.attr('id', `${Object.keys(colors)[k]}_button`)


                }


            }


        }



        console.log('Received Message')
        });




        // When the user enters a username and presses submit this function runs to create the chat page
        $('#inputname').on('click',function(){

            // Grab the username the user entered
            var username = $('#myname').val()
            socket.send();

            // This sets the chatroom feature for the user if they picked a chat room before they picked a name
            if ($('#myname').data('chat') == '0'){
                var chatroomval = '0'
            }
            else{
                var chatroomval = $('#myname').data('chat')

            }



            // Remove the username entry field and submit button
            $('#myname').val('');
            $('#inputname').detach()
            $('#myname').detach()

            // Add in the message entry field and store the username in the data property of the input field
            var body = d3.select('#bare')
            var myinput = body.append('input')

            // Store the username and chat room in the message field
            myinput.attr('id', 'MyMessage')
            myinput.attr('data-name', username)
            myinput.attr('data-chat', chatroomval)

            // Set the title of the page based upon the username entered
            var myusername = d3.select('#myusername')
            var myname = $('#MyMessage').data('name')
            myusername.text(`Hello ${myname} it is good to have you here.`)

            // Add the send button
            var send = body.append('button')
            send.text('SEND')
            send.attr('id', 'sendbutton')



            // Capture the relevant information from the sent message
            // Package the information into an object and send to the server
            send.on("click", () => {
                var information = {'username': $('#MyMessage').data('name'), 'message':$('#MyMessage').val(), 'chatroom': $('#MyMessage').attr('data-chat')}

                // Pass the object "information" to the flask route "my event" (see app.py)
                socket.emit('my event', {data: information});

                // Clear the message box
                $('#MyMessage').val('');

        });

        });


            // Implements the button selection section of the webpage
            // This section demonstrates to the user how to implement socket interaction with other elements of the page
            // instead of just a message. When a user selects a button a message will be sent to everyone stating that color
            // has been seleted by that person and then the button will be replaced by another from the overall dictionary.
            var body = d3.select('#bare')
            for (var i = 0; i < Object.keys(colors).length - 1; i++){
                var tempbutton = body.append('button')

                tempbutton.text(Object.keys(colors)[i])

                tempbutton.attr('value', Object.keys(colors)[i])

                tempbutton.style('background-color', colors[Object.keys(colors)[i]])

                tempbutton.attr('id', `${Object.keys(colors)[i]}_button`)


                // Adds a click function that is identical for all buttons
                tempbutton.on('click', myfunction)};

        // Handle the user's selection of a chat room
        $('#chatselect').on('click',function(){
            var chat = $('#chatroom').val()
            console.log(chat)
            console.log(d3.select('#myname')[0])

            // Because the chat room name is being stored in the input field we set it differently depending upon whether
            // the user has already picked a username or not
            if (d3.select('#myname')[0] == null){
                var mychat = d3.select('#MyMessage')
                mychat.attr('data-chat', chat)
            }
            else{
                var myinput = d3.select('#myname')
                myinput.attr('data-chat', chat)


            }



        });




    });




function myfunction(){
console.log(this)
    var selection = {'selection': this.value, 'user': $('#MyMessage').data('name')}

                    socket.emit('my event', {data: selection})
}