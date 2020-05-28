const express =require('express')
const router =express.Router()

const {makepayment}=require('../controllers/makePayment')



router.post("/stripepayment",makepayment)








module.exports= router