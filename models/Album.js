var mongoose = require('mongoose')
const Schema = mongoose.Schema;

var AlbumSchema = new mongoose.Schema({
    name: {type:String, trim:true, lowercase: true, default:''},
    description: {type:String, trim:true, lowercase: true, default:''},
    images: [String],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'ProfileSchema'
    },
    timestamp: {type:Date, default:Date.now}
})

AlbumSchema.methods.summary = function(){
    var summary = {
        id: this._id.toString(),
        name: this.name,
        description: this.description,
        images: this.images,
        user: this.user,
        timestamp: this.timestamp
    }

    return summary
}

module.exports = mongoose.model('AlbumSchema', AlbumSchema)
