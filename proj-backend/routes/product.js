const express =require('express')
const router =express.Router()


const {getProductById,createProduct,getProduct,photo,deleteProduct,updateProduct,getAllProducts,getAllUniqueCategory} = require("../controllers/product")
const {isAuthenticated,isAdmin,isSignedIn} = require("../controllers/auth")
const {getUserById} = require("../controllers/user")

//All Params
router.param("userId",getUserById)
router.param("productId",getProductById)

//All Actual Router

//create Route
router.post("/product/create/:userId",isSignedIn,isAuthenticated,isAdmin,createProduct)

//Read Route
router.get("/product/:productId",getProduct)
router.get("/product/photo/:productId",photo)

//delete Route
router.delete("/product/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,deleteProduct)


//update Route
router.put("/product/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,updateProduct)


//Listing Route
router.get("/products",getAllProducts)
router.get("/products/categories",getAllUniqueCategory)



module.exports= router