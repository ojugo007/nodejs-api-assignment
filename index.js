const http = require("http")
const fs = require("fs")
const path = require("path")
require("dotenv").config()
const {getAllproducts, getProductById, updateProduct, filePath} = require("./routes")

const port = process.env.PORT

function requestHandler(req, res){
    const url = new URL(req.url, `http://${req.headers.host}`);
    const id = url.searchParams.get('id');
    // SERVE HOME ROUTE
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
    // GET ALL PRODUCTS 
    if(req.url == "/products" && req.method == "GET"){
        getAllproducts(req,res)
    }

    // GET SINGLE PRODUCT
    if(req.method == "GET" && url.pathname == "/products"  && id){
        let products = fs.readFileSync(filePath, 'utf8')
        products = JSON.parse(products)

        const product = getProductById(products, id)
        if(product){
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(product));
        } else {
        
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Product not found' }));
        }
        
    }
 
    if(req.url == "/products" && req.method == "PUT"){
        updateProduct(req, res)
    }

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