# Common Room

A room-based real-time chat app built with Express and Socket.io.

## Run locally

```powershell
npm install
npm start
```

Open http://localhost:3000 in more than one browser tab to test live chat. Enter a username, then choose a room. The room list includes `lobby`, `study-hall`, and `break-room`; use the field in the sidebar to join another room.

## Features

- Live messages, room switching, and active-user lists
- Username selection and validation
- In-page alerts and browser notifications for incoming messages
- Last 100 messages per room kept in server memory while the server runs
- Responsive layout and accessible message announcements