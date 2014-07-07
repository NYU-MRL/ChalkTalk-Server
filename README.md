# Chalktalk Mobile Server

## Purpose:
1. Copy interaction events from client devices (phone, tablet, wacom, kinect) to browser events on the display client
2. Store a state of chalktalk on the server, for every running session, share a state object with each display client.

## Implementation
The server accepts WebSocket connections from any device with a browser, sending all touch events from a device running `phone.html` to the server, to any device running `main.html`.

## Immediate goals
1. UDP connection hooks and forwarding for TUIO inputs on the server.
2. Serializable state object per session, SQLite running for storing the session state with a session ID.
3. Method for publishing the server's location from behind a firewall (universities etc.). Looking 
into [No-IP](http://www.no-ip.org).

## Running
Have node and npm installed and run`npm install` to fetch dependencies. 
To run, input `node index.js` followed by a port number. By default, the server will run on port 8080.
