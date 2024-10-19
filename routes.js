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
    return products.find(prod => prod.id == id)
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
// function getProduct(req, res){
//    let body = []
//    req.on("data", (chunk)=>{
//     body.push(chunk)
//    })
//    req.on("end", ()=>{
//     const parsedBody = Buffer.concat(body).toString()
//     const bodyObj = JSON.parse(parsedBody)
//     const id = bodyObj.id
//     fs.readFile(filePath, "utf8", (err, data)=>{
//         if(err){
//             res.writeHead(500, {"content-type":"text/plain"} )
//             res.end(JSON.stringify(err))
//         }
//         const products = JSON.parse(data)
//         const product = products.find(prod => prod.id == id)
//         if(!product){
//             res.writeHead(404, {"content-type":"text/plain"})
//             res.end("product not found")

//         }
//         res.writeHead(200, {"content-type":"application/json"})
//         res.end(product)
//     })    
//    })
// }

module.exports = {
    getAllproducts,
    getProductById,
    updateProduct,
    filePath
}