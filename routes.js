const path = require("path")
const fs = require("fs")

const filePath = path.join(__dirname, "db", "products.json")

// GET ALL PRODUCTS
function getAllproducts(req,res){
    fs.readFile(filePath, 'utf8', (err, products)=>{
        if(err){
            res.writeHead(500, {"content-type":"text"})
            console.log(err)
            res.end(JSON.stringify({"message": "unable to read file"}))
        }
        res.writeHead(200, {"content-type": "application/json"})
        res.end(products)
        
    
    })

}

// GET SINGLE PRODUCT BY ID
function getProductById(products, id){ 
    return products.findIndex(prod => prod.id == id)
}

// UPDATE A PRODUCT
function updateProduct(req, res){
    let body = [];
    req.on("data", (chunk)=>{
        body.push(chunk)
    })
    req.on('end', ()=>{
        let parsedBody = Buffer.concat(body).toString()
        let productUpdate = JSON.parse(parsedBody)
        let id = productUpdate.id

        fs.readFile(filePath, 'utf8', (err, data)=>{
            if(err){
                res.writeHead(500, {"content-type": "application/json"})
                console.log(err)
                res.end(JSON.stringify({message:"unexpected server error"}))
            }
            const products = JSON.parse(data)
            let productIndex = products.findIndex((prod)=> prod.id == id)

            if(productIndex == -1){
                res.writeHead(404, {"content-type": "application/json"})
                console.log(err)
                res.end(JSON.stringify({message:"product not found"}))
            }
            products[productIndex] = {...products[productIndex], ...productUpdate}
            fs.writeFile(filePath, JSON.stringify(products), (err)=>{
                if(err){
                    res.writeHead(500, {"content-type":"application/json"})
                    console.log(err)
                    res.end(JSON.stringify({message:"unable to write to file"}))
                }

                res.writeHead(200, {"content-type":"application/json"})
                res.end(JSON.stringify(products))
    
            })
        })
    })
}

// POST A PRODUCT
function addProduct(req, res){
   let body = []
   req.on("data", (chunk)=>{
        body.push(chunk)
   })
   req.on("end", ()=>{
        const parsedBody = Buffer.concat(body).toString()
        if(!parsedBody){
            res.writeHead(422)
            res.end("no product data was added")
        } else{
            let newProduct = JSON.parse(parsedBody)
        
            fs.readFile(filePath, "utf8", (err, data)=>{
                if(err){
                    res.writeHead(500, {"content-type":"text/plain"} )
                    res.end(JSON.stringify(err))
                }
                const products = JSON.parse(data)

                let lastProductId = products[products.length-1].id
                let newProductId = lastProductId + 1
                newProduct = {...newProduct, id:newProductId}
                products.push(newProduct)

                fs.writeFile(filePath, JSON.stringify(products), (err)=>{
                    if(err){
                        res.writeHead(500, {"content-type":"application/type"})
                        res.end(JSON.stringify({message:"unable to write to file"}))
                    }
                    res.writeHead(201, {"content-type":"application/json"})
                    res.end("product was successfully added")
                })
            }) 
        }   
   })
       
}

module.exports = {
    getAllproducts,
    getProductById,
    updateProduct,
    addProduct,
    filePath
}