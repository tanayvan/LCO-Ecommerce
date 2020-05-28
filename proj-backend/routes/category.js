const express=require('express')
const router= express.Router()

//controllers   
const {getCategoryById,createCategory,getCategory,getAllCategory,updateCategory,deleteCategory} =require("../controllers/category")
const {isAdmin,isAuthenticated,isSignedIn} =require("../controllers/auth")
const {getUserById} =require("../controllers/user")

//Params
router.param("userId",getUserById)
router.param("categoryId",getCategoryById)

//Routes goes here

//Create Routes
router.post("/category/create/:userId",
                isSignedIn,
                isAuthenticated,
                isAdmin,
                createCategory)

//read
router.get("/category/all",getAllCategory)
router.get("/category/:categoryId",getCategory)


//update
router.put("/category/:categoryId/:userId",
            isSignedIn,
            isAuthenticated,
            isAdmin,
            updateCategory)

 router.delete("/category/:categoryId/:userId",
            isSignedIn,
            isAuthenticated,
            isAdmin,
            deleteCategory)


module.exports= router