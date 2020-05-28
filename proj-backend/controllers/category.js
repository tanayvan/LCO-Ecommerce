const Category=require("../models/category")



exports.getCategoryById=(req,res,next,id) => {
   
    Category.findById(id).exec((err,category)=>{
        if(err){
            return(
            res.status(400).json({
                error:"Category Not Found In Db" +err
            })
            )
        }
       
        req.category=category
        next()
    })     
   
}
exports.createCategory=(req,res)=>{
    const category=new Category(req.body)
    category.save((err,category)=>{
        if(err){
            return(
            res.status(400).json({
                error:"Not Able to Save Category In Db"
            })
            )
        }
        res.json({category})
    })
}

exports.getCategory=(req,res)=>{
    console.log(req.category)
    return res.json(req.category)
}

exports.getAllCategory=(req,res)=>{
    Category.find().exec((err,category)=>{
        if(err){
            return(
            res.status(400).json({
                error:"bhau"
            })
            )
        }
        res.json(category)
        console.log(category)
    })
}
exports.updateCategory =(req,res)=>{
    const category =req.category
    category.name=req.body.name

    category.save((err,updatedcategory)=>{

        if(err){
            res.status(400).json({
                error:"Failed to update category"
            })
        }
        res.json(updatedcategory)
    })

}

exports.deleteCategory =(req,res)=>{
    const category =req.category
   

    category.remove((err,category)=>{

        if(err){
            res.status(400).json({
                error:"Failed to delete category"
            })
        }
        res.json({
            message:`Successfully Deleted ${category}`
        })
    })

}

