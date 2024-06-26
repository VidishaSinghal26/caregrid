const mongoose=require('mongoose');
const validator=require('validator')
const bcrypt=require('bcryptjs')
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minlength:3,
        lowecase:true,
    },
    lastName:{
        type:String,
        required:true,
        minlength:3,
        lowecase:true
    },
    email:{
        type:String,
        required:true,
        lowecase:true,
        validate:{
            validator:function(value){
                const pass= /^[\w-\.]+@gmail.com$/;
                const res = pass.test(value);
                if(!res){
                    throw new Error('Enter correct email address');
                }
                return res;
            },
        },
        unique:true,
    },
    phone:{
        type:Number,
        required:true,
        minlength:10,
        maxlength:10,
        validate:{
            validator:function(value){
                const pass= /^[6-9]?[0-9]{9}$/;
                const res = pass.test(value);
                if(!res){
                    throw new Error('Phone number should be of 10 length');
                }
                return res;
            },
        }
    },
    password:{
        type:String,
        required:true,
        validate:{
            validator:function(value){
                const pass= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/
                const res = pass.test(value);
                if(!res){
                    throw new Error('password must be 8 to 56 characters long and contain at least one lowercase letter,one uppercase letter ,and a number, a special character');
                }
                return res;
            },
        }
    },
    confirmPassword:{
        type:String,
        required:true,
    }
})

userSchema.pre("save",async function(){
    //console.log(this.password);
    this.password=await bcrypt.hash(this.password,10)
    //console.log(this.password);
    this.confirmPassword=undefined;
})

module.exports=mongoose.model('users',userSchema)

