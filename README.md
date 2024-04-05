# SDI-Project
Silver: if the internet is down or the backend is down, store the entities in a global state management lib like Redux and keep an "unsaved" flag on it. Implement an interceptor and retry mechanism (Axios recommended).

Gold: Create a cronjob that creates a new entity every 10-15 seconds and connect the backend and frontend via a WebSocket (socket.io recommended) and display the newly created entity live.
