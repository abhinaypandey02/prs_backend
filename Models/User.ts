import mongoose from 'mongoose';

const UserModel=new mongoose.Schema({
    firstName: {type:String, required:true},
    lastName:String,
    password:{type:String, required:true},
    email: {type:String, unique:true,match:/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}])|(([a-zA-Z\-\d]+\.)+[a-zA-Z]{2,}))$/}
})
export default mongoose.model('User',UserModel);
export interface UserBaseType{
    firstName:string;
    lastName?:string;
    password:string;
    email:string;
}