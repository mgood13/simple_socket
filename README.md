# simple_socket

After failing to find any tutorials on the internet that adequately explained
how to implement a simple socket.io based application. This repository is a 
combination of a few tutorials that I found to create a very simple chat 
application. It is currently designed to run on the local machine (hence all of
the cors policy wording in the Flask app). The final application allows users to
enter a username and then will create a list of sent messages. Messages from the
user will be shown in blue and messages from anyone else are shown in green.