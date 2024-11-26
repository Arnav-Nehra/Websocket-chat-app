import { WebSocket, WebSocketServer } from "ws";

const ws = new WebSocketServer({port:8080});


interface userReq{
  roomid:string,
  socket:WebSocket
}

let allSockets:userReq[] = [] 

ws.on("connection",(socket)=>{
  console.log("user connected")

  socket.on("message",(message)=>{
    //@ts-ignore
    let parsedMessage = JSON.parse(message);
    if(parsedMessage.type ==="join"){
      console.log("user joined room"+parsedMessage.payload.roomid)
      allSockets.push({
        roomid:parsedMessage.payload.roomid,
        socket
      })
    
    }

    if(parsedMessage.type === "chat"){
      console.log("user wants to chat")
      const currentUserRoom = allSockets.find((x)=>x.socket == socket )?.roomid
      for(let i = 0; i<allSockets.length;i++){
        if(allSockets[i].roomid == currentUserRoom){
          allSockets[i].socket.send(parsedMessage.payload.message)
        }
      }
    }
  })
})
