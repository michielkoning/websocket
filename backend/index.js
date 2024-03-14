import WebSocket, { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", function connection(ws) {
  console.log("connection");
  ws.on("error", console.error);

  ws.on("message", function message(data) {
    console.log("received: %s", data);
    ws.send("tes22");

    ws.on("message", function message(data) {
      console.log(data);
      wss.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(data.toString());
        }
      });
    });
  });
});
