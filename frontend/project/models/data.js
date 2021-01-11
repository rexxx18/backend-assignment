const mongoose=require('mongoose');
const Schema=new mongoose.Schema({

    author:{type:String,require:true},
    title:{type:String,require:true},
    ISBN:{type:String,require:true},
    releaseDate:{type:Date}

})


const BOOKS=mongoose.model('BOOKS',Schema);
module.exports=BOOKS;

