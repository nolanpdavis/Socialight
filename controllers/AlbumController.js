var Profile = require('../models/Profile')
var Promise = require('bluebird')
var mongoose = require('mongoose')

module.exports = {

    find: function(params, isRaw){
        return new Promise(function(resolve, reject){


            Profile.aggregate( [
                {$project: {"albums": 1}},
                {$unwind:"$albums"}
            ], function(err, albums){
                if (err){
                    reject(err)
                    return
                }
                resolve(albums)
            })

        })
    },

    findById: function(id){
        return new Promise(function(resolve, reject){

            let idToSearch = mongoose.Types.ObjectId(id)

            Profile.aggregate( [
                {$project: {"albums": 1, _id: 0}},
                {$unwind:"$albums"},
                {$match: {"albums._id": idToSearch}}
            ], function(err, albums){
                if (err){
                    reject(err)
                    return
                }

                resolve(albums)
            })

        })
    }
};
