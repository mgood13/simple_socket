from flask import Flask, render_template
from flask_socketio import SocketIO, send
from flask_cors import CORS, cross_origin


app = Flask(__name__)
#CORS(app, cors_allowed_origins='https://localhost')

app.config['SECRET_KEY'] = 'simplesecret'

socketio = SocketIO(app)


# The main app that will run when the Flask server is run
@app.route('/')
@cross_origin()
def index():

    return render_template('index.html')


# What to do with the messages sent to the socket server
@socketio.on('my response')
def replytomessage(json):
    send(json, broadcast = True)

# Confirmation of the received message on the server side
def messageReceived(methods = ['GET', 'POST']):
    print('Got your message')


# Log the received message and pass it along to the socket.io server to broadcast to all connected users


@socketio.on('my event')
def handle_my_custom_event(json, methods = ['GET', 'POST']):
    print('Message my event: {}'.format(json))

    # pass to sql

    socketio.emit('my response', json, callback=messageReceived)



if __name__ == '__main__':
    socketio.run(app)