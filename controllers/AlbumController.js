var Album = require('../models/Album')
var Profile = require('../models/Profile')
var Promise = require('bluebird')
var bcrypt = require('bcryptjs')

module.exports = {

    find: function(params, isRaw){
        return new Promise(function(resolve, reject){
            Album.find(params, function(err, albums){
                if (err){
                    reject(err)
                    return
                }

                var summaries = []
                albums.forEach(function(album){
                    summaries.push(album.summary())
                })
                resolve(summaries)
            })
        })
    },

    findById: function(id){
        return new Promise(function(resolve, reject){
            Album.findById(id, function(err, album){
                if (err){
                    reject(err)
                    return
                }

                resolve(album.summary())
            })
        })
    },
    create: function(params){
        return new Promise(function(resolve, reject){

            // const profile = Profile.findById(id)
            Album.create(params, function(err, album){
                if (err){
                    reject(err)
                    return
                }

                resolve(album.summary())
            }).populate('user')
        })
    }
}
