const stripe=require('stripe')("sk_test_3bxP4RwV3YadRUPFAI84xWoK00nSSCyvnW")
const uuid=require('uuid/v4')

exports.makepayment = (req,res) => {
    const {products,token} = req.body
    console.log(products)

    let amount=0
    products.map(p => {
        amount=amount+p.price
    })
   
    const idempotencyKey=uuid()
    return stripe.customers.create({
        email:token.email,
        source:token.id
    }).then(customer => {
        stripe.charges.create({
            amount:amount*100,
            currency:"usd",
            customer:customer.id,
            receipt_email:token.email,
            shipping:{
                name:token.card.name
            }
            },idempotencyKey)
    }).then(result => res.status(200).json(result))
    .catch(err => console.log(err))
}