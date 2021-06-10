from flask import Flask, render_template
from flask_socketio import SocketIO, send
from flask_cors import CORS, cross_origin


app = Flask(__name__)
CORS(app, cors_allowed_origins='https://localhost')

app.config['SECRET_KEY'] = 'simplesecret'

socketio = SocketIO(app, cors_allowed_origins='*')


@app.route('/')
@cross_origin()
def index():

    return render_template('index.html')



#@socketio.on('message')
#def handleMessage(msg):
#    print('Message: ' + msg)
#    send(msg, broadcast = True)


@socketio.on('my response')
def replytomessage(json):
    send(json, broadcast = True)


def messageReceived(methods = ['GET', 'POST']):
    print('Got your message')




@socketio.on('my event')
def handle_my_custom_event(json, methods = ['GET', 'POST']):
    print('Message my event: {}'.format(json))
    socketio.emit('my response', json, callback=messageReceived)



if __name__ == '__main__':
    socketio.run(app)