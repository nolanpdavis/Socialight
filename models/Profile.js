var mongoose = require('mongoose')
const Schema = mongoose.Schema;

var ProfileSchema = new mongoose.Schema({
    userName: {type:String, trim:true, default:''},
    email: {type:String, trim:true, lowercase: true, default:''},
    password: {type:String, default:''},
    albums: [{
        type: Schema.Types.ObjectId,
        ref: 'AlbumSchema'
    }],
    timestamp: {type:Date, default:Date.now}
})

ProfileSchema.methods.summary = function(){
    var summary = {
        id: this._id.toString(),
        userName: this.userName,
        email: this.email,
        albums: this.albums,
        timestamp: this.timestamp
    }

    return summary
}

module.exports = mongoose.model('ProfileSchema', ProfileSchema)
