const http = require("http")
const fs = require("fs")
const path = require("path")
require("dotenv").config()


const port = process.env.PORT

function requestHandler(req, res){
    if(req.url=="/"){
        fs.readFile(path.join(__dirname, "index.html"), (err, data)=>{
            if(err){
                res.writeHead(500, {"content-type":"text/plain"})
                console.log(err)
                res.end("an unexpected server error occurred")
            }
            res.writeHead(200, {"content-type":"text/html"})
            res.end(data)
        })
    }
    // if()
    else{
        fs.readFile(path.join(__dirname, "404.html"), (err, data)=>{
            if(err){
                res.writeHead(500, {"content-type":"text/plain"})
                console.log(err)
                res.end("an unexpected server error occurred")
            }
            res.writeHead(404, {"content-type":"text/html"})
            res.end(data)
        
        })
    }



}

const server = http.createServer(requestHandler)


server.listen(port, ()=>{
    console.log(`server is running on http://localhost:${port}`)

})