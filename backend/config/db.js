import mongoose from 'mongoose';

const connectDB = async function(mongo_url){
    try{
        await mongoose.connect(mongo_url)
    }
    catch(err){
        console.log(err.message)
    }
}


export {connectDB}