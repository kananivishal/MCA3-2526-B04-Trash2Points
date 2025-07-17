const mongoose = require('mongoose')

function conectDB(){
    mongoose.connect('mongodb://127.0.0.1:27017/Trush2Points')
    .then(()=>{
        console.log('Db is connected!')
    }).catch((error)=>{
        console.log(error)
        console.log("DB is not connected!")
    })
}

module.exports = conectDB