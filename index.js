const http = require("http")
const fs = require("fs")
const path = require("path")
require("dotenv").config()
const {getAllproducts, getProductById, updateProduct, addProduct, filePath} = require("./routes")

const port = process.env.PORT 

function requestHandler(req, res){
    const url = new URL(req.url, `http://${req.headers.host}`);
    const id = url.searchParams.get('id');
    // serve home page
    
    if(req.url ==="/"){
        fs.readFile(path.join(__dirname, "index.html"), (err, data)=>{
            if(err){
                res.writeHead(500, {"content-type":"text/plain"})
                console.log(err)
                return res.end("an unexpected server error occurred")
            }
            res.writeHead(200, {"content-type":"text/html"})
            return res.end(data)
            
        })
        return
    }


    // get all product
    if(req.url === "/products" && req.method === "GET"){
        return getAllproducts(req,res)
    }

    // get single product
    if(req.method === "GET" && url.pathname === "/products"  && id){
        let products = fs.readFileSync(filePath, 'utf8')
        products = JSON.parse(products)

        const productIndex = getProductById(products, id)
        const product = products[productIndex]
        if(product){
            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify(product));
        } else {
        
            res.writeHead(404, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ message: 'Product not found' }));
        }
        
    }
    
    // add new product
    if(req.url === "/products" && req.method === "POST"){
        return addProduct(req, res)
    }

    // edit product
    if(req.url === "/products" && req.method === "PUT"){
        return updateProduct(req, res)
    }

    // delete product
    if(req.method === "DELETE" && url.pathname === "/products"  && id){
        let products = fs.readFileSync(filePath, 'utf8')
        products = JSON.parse(products)

        const productIndex = getProductById(products, id) 
        if(productIndex == -1){
            res.writeHead(404, {"content-type": "application/json"})
            return res.end(JSON.stringify({message:"product not found"}))
        }else{
            products.splice(productIndex, 1)
            fs.writeFile(filePath, JSON.stringify(products), (err)=>{
                if(err){
                    res.writeHead(500, {"content-type":"application/json"})
                    console.log(err)
                    return res.end(JSON.stringify({message:"unable to write to file"}))
                }
                
                res.writeHead(200, {"content-type": "application.json"})
                return res.end("product successfully deleted")  
            })
        }
        return
    
    }
   
    // serve 404 page
    fs.readFile(path.join(__dirname, "404.html"), (err, data)=>{
        if(err){
            res.writeHead(500, {"content-type":"text/plain"})
            console.log(err)
            return res.end("an unexpected server error occurred")
        }
        res.writeHead(404, {"content-type":"text/html"})
        return res.end(data)
        
    })
    



}

const server = http.createServer(requestHandler)


server.listen(port, ()=>{
    console.log(`server is running on http://localhost:${port}`)

})