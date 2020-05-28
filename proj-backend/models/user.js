var mongoose =require('mongoose')
var crypto =require('crypto')
const uuidv1=require('uuid/v1')
var Schema= mongoose.Schema

var userSchema = new Schema({

    name:{
        type:String,
        trim:true,
        required:true,
        maxlength:32
    },
    lastName:{
        type:String,
        trim:true,
        maxlength:32
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    purchases:{
        type:Array,
        default:[]
    },
    userinfo:{
        type:String,
        trim:true
    },
    //TODO: come back here
    encry_password:{
        type:String,
        required:true
    },
    salt:String,
    role:{
        type:Number,
        default:0
    }


},
    {timestamps:true}
)
userSchema
.virtual("password")
.set( function(password){
    this._password=password
    this.salt=uuidv1()
    this.encry_password=this.securePassword(password)
})
.get(function(){
     return this._password  
})
userSchema.methods = {
    authenticate:function(plainPassword){
        return this.securePassword(plainPassword)=== this.encry_password
    },
    securePassword: function(plainPassword){
        if(!plainPassword) return "";
        try{
            return crypto
        .createHmac("sha256", this.salt)
        .update(plainPassword)
        .digest("hex");
        }catch(err)
        {
            return ""
        }
    }
}
module.exports=mongoose.model("User",userSchema)