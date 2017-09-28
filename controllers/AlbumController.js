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

    findById: function(params, id){
        return new Promise(function(resolve, reject){

            let idToSearch = mongoose.Types.ObjectId(id)

            if (params.limit == undefined) {
                Profile.aggregate( [
                    {$project: {"albums": 1, _id: 0}},
                    {$unwind:"$albums"},
                    {$match: {"albums._id": idToSearch}},
                    {$unwind:"$albums.images"},
                ], function(err, albums){
                    if (err){
                        reject(err)
                        return
                    }
                    resolve(albums)
                })
            }
            else {
                Profile.aggregate( [
                    {$project: {"albums": 1, _id: 0}},
                    {$unwind:"$albums"},
                    {$match: {"albums._id": idToSearch}},
                    {$unwind:"$albums.images"},
                    {$limit: parseInt(params.limit)}
                ], function(err, albums){
                    if (err){
                        reject(err)
                        return
                    }
                    resolve(albums)
                })
            }


        })
    }
};
