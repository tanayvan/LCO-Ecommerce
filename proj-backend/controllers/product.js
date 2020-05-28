const Product =require("../models/product")
const formidabel =require("formidable")
const _=require("lodash")
const fs =require("fs")

exports.getProductById =(req,res,next,id)=>{
    Product.findById(id)
    .populate("category")//Not Understood But will Figure it Out Later
    .exec((err,product)=>{
        if(err)
        {
            return res.status(400).json({
                error:"Product Not Found"
            })
        }
        req.product=product
        next()
    })

}

exports.createProduct =(req,res) => {

    let form= new formidabel.IncomingForm()
    form.keepExtensions=true

    form.parse(req,(err,fields,file) => {
        if(err)
        {
            return res.status(400).json({
                error:"Problem With The Image" + err
            })
        }

          //destructuring of fields
          const {price,name,description,category,stock}= fields
          if( !name || !description || !price || !category || !stock ){
                return res.status(400).json({
                    error :" Please include all Fields"
                })

             }



        //TODO: restrictions on Field
        let product =new Product(fields)


        //handle file here
        if(file.photo){
            if(file.photo.size>4000000)
            {
                return res.status(400).json({
                    error:"File Size too big"
                })
            }
            product.photo.data =fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }

        //Save To the Database
        product.save((err,product) => {
            if(err)
          {
            return res.status(400).json({
                error:"Saving Tshirt In Db Failed" +err
            })
        
            }

            res.json(product)
        })
    })

}

exports.getProduct = ( req,res)=>{
    req.product.photo =undefined
    return res.json(req.product)
}


//MiddleWare
exports.photo =(req,res,next)=>{
    if(req.product.photo.data){
        res.set("Content-Type",req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next()
}

exports.deleteProduct = (req,res) => {
    let product = req.product
    product.remove((err,deletedProduct)=>{
        if(err){
            res.status(400).json({
                error : "Failed To Delete The Product"
            })
        }

        res.json({
            message:"Deletion was a Sucess",
            deletedProduct
        })
    })


}


exports.updateProduct = (req,res) => {

    let form= new formidabel.IncomingForm()
    form.keepExtensions=true

    form.parse(req,(err,fields,file) => {
        if(err)
        {
            return res.status(400).json({
                error:"Problem With The Image" + err
            })
        }

        //TODO: restrictions on Field
        let product = req.product
        product = _.extend(product,fields)

        //handle file here
        if(file.photo){
            if(file.photo.size>4000000)
            {
                return res.status(400).json({
                    error:"File Size too big"
                })
            }
            product.photo.data =fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }

        //Save To the Database
        product.save((err,product) => {
            if(err){
            return res.status(400).json({
                error:"Updation Tshirt In Db Failed" +err
            })
        
            }

            res.json(product)
        })
    })

}
exports.getAllProducts =(req,res) =>  {
    let limit= req.query.limit ? parseInt(req.query.limit): 8
    let sortBy =req.query.sortBy?req.query.sortBy :"_id"
    Product.find()
    .select("-photo")  // here - sign indicates Not to select the photo field
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err,products) => {
        if(err){
          return res.status(400).json({
              error:"No Product Found" +err
          })
      
          }
          res.json(products)
    })
}


exports.updateStock = (req,res,next) => {
    let myOperation  = req.body.order.products.map(product => {
        return {
            updateOne :{
                filter:{_id:product._id},
                update:{$inc:{stock:-product.count,sold:+product.count}}
            }
          
        }
    })
    Product.bulkWrite(myOperation,{},(err,products) => {
        if(err){
            res.status(400).json({
                error:"Bulk Operation Failed"
            })
        }
        next()
    })

}

exports.getAllUniqueCategory = (req,res) => {
    Product.distinct("category",{},(err,category) => {
        if(err){
            res.status(400).json({
                error: "No Category Found"
            })
        }
        res.json(category)
    })
}