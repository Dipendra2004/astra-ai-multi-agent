import express from "express"
import dotenv from "dotenv"
import proxy from "express-http-proxy"
dotenv.config()
import cors from "cors"
import cookieParser from "cookie-parser"
import protect from "./middleware/auth.middleware.js"
import { getCurrentuser } from "./controllers/user.controller.js"
import { proxyWithHeader } from "./utils/proxyWithHeader.js"
import morgan from "morgan"
const port = process.env.PORT

const app = express()
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}))

app.use(morgan("dev"))
app.use(cookieParser())
app.use("/api/auth",proxy(process.env.AUTH_SERVICE))
app.use("/api/chat",proxyWithHeader(process.env.CHAT_SERVICE))
app.use("/api/agent",protect,proxy(process.env.AGENT_SERVICE))
app.get("/api/me",protect,getCurrentuser)
app.get("/", (req,res)=>{
    res.json({message:"Hello from gateway"})
})

app.listen(port, ()=>{
    console.log(`gateway started at ${port}`)
})