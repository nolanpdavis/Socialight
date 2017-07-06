var mongoose = require('mongoose')

var ImageSchema = new mongoose.Schema({
    url: {type:String, trim:true, default:''},
    userName: {type:String, trim:true, lowercase: true, default:''},
    location: {type:String, default:''},
    timestamp: {type:Date, default:Date.now}
})

var ProfileSchema = new mongoose.Schema({
    userName: {type:String, trim:true, default:''},
    email: {type:String, trim:true, lowercase: true, default:''},
    password: {type:String, default:''},
    images: [ImageSchema],
    timestamp: {type:Date, default:Date.now}
})

ProfileSchema.methods.summary = function(){
    var summary = {
        id: this._id.toString(),
        userName: this.userName,
        email: this.email,
        images: this.images,
        timestamp: this.timestamp
    }

    return summary
}

module.exports = mongoose.model('ProfileSchema', ProfileSchema)
