const ProductDB=require("../models").Product
const CartProductDB=require('../models').CartProduct
const CartDB=require('../models').Cart
const OrderDB=require("../models").Order

const controllers={
    getAllOrders:async (req,res)=>{
        const orders=await OrderDB.findAll().then((result)=>{
            res.status(200).send(result)
        })
        
    },
    getOrder:async (req,res)=>{
        const order=await OrderDB.findByPk(req.params.id).then((result)=>{
            res.status(200).send(result)
        })
        
    }
}
module.exports=controllers

