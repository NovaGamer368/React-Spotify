# React Spotify

A small React.js project that connects to the spotify API and displays some stuff that I listen too

# Installation

1. Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)and log in with your Spotify account.
   - Click on Create an App, and fill in the required details (App Name, Description, etc.).
   - Make sure to have http://localhost:3000/callback in the Redirect URIs field.
   - Note down the Client ID and Client Secret that Spotify provides for your app.
2. Download the project
3. Create a .env file and fill it in with these variables

```
REACT_APP_CLIENT_ID=[client id from Step 1]
REACT_APP_REDIRECT_URI=http://localhost:3000/callback
REACT_APP_AUTH_ENDPOINT=https://accounts.spotify.com/authorize
REACT_APP_RESPONSE_TYPE=token
REACT_APP_SCOPE=user-top-read user-read-currently-playing user-read-playback-state user-top-read user-read-email user-modify-playback-state user-read-playback-state
```

4. Open a terminal and run the `npm install` command
5. Run the project by running the `npm start` command
