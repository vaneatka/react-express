const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')

//app.get('/', (req, res) => res.send('Hello World!'))

// restful routing/  resource routing

const productIndex = ( req, res )=> {
    fs.readFile('./database/products.json', (err,data)=>{
        if(!err){
            // console.log(data.toString());
            res.append('Content-type', 'application/json')
            res.send(data.toString());
        }
    });
}
const productDetails = ( req, res )=> {
    console.log(req.params.productid)
    fs.readFile('./database/products.json', (err,data)=>{
        if(!err){
            let products = JSON.parse(data);
            let product = products.find(el=> el.id == req.params.productid);            
            // res.append('Content-type', 'application/json')
            // res.send(product);
            res.jsonp(product)
        }
    });
}

const productDelete = ( req, res )=> {
    console.log(req.params.productid)
    fs.readFile('./database/products.json', (err,data)=>{
        if(!err){
            let products = JSON.parse(data);
            let product = products.filter(el=> el.id != req.params.productid);            
            // res.append('Content-type', 'application/json')
            // res.send(product);
            res.jsonp(product)
        }
    });
}

app.get('/product', productIndex)
app.get('/product/:productid', productDetails)
app.delete('/product/:productid', productDelete)


app.listen(port, () => console.log(`Example app listening on port ${port}!`))

