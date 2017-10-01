var mongoose = require('mongoose')
const Schema = mongoose.Schema;

var ImageSchema = new mongoose.Schema({
    url: {type:String},
    location: {
        type:[Number],
        index: '2d'}
})

var AlbumSchema = new mongoose.Schema({
    name: {type:String, trim:true, default:''},
    description: {type:String, trim:true, default:''},
    images: [ImageSchema],
    albumTimestamp: {type:Date, default:Date.now}
})

var ProfileSchema = new Schema({
    userName: {type:String, trim:true, default:''},
    email: {type:String, trim:true, lowercase: true, default:''},
    password: {type:String, default:''},
    albums: [AlbumSchema],
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

const Profile = mongoose.model('Profile', ProfileSchema)

module.exports = Profile
