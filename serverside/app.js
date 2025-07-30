//3rd
import express, { Router } from "express";
import connection from "./connection.js";
import env from 'dotenv'
import http from 'http'
import cors from 'cors'
import { error } from "console";
import router from "./router.js";
import { Server } from "socket.io";
import { Socket } from "dgram";

env.config()
const app = express()
const server = http.createServer(app)
// SOCKET.IO  connection
const io = new Server(server,{
    cors:{
        origin:'http://localhost:5173',
        methods:['GET','POST'],
    },
});
io.on('connection',(socket)=>{
    console.log("user connected:",socket.id);
    socket.on('sendMessage',(data)=>{
        io.emit("resiveMessage",data)
    })
    socket.on("disconnect",()=>{
        console.log("user disconnected:",socket.id);
        
    })
    
})
//ithu vare

app.use(cors());
app.use(express.json({limit:'50mb'}))
app.use('/api',router)

connection()
.then(()=>{
    server.listen(process.env.PORT,()=>{
        console.log(`server started at http://localhost:${process.env.PORT}`);
        
    })
}).catch((error)=>{
    console.log(error);
    
})
