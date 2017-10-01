var Profile = require('../models/Profile')
var Promise = require('bluebird')
var mongoose = require('mongoose')

module.exports = {

    find: function(params, isRaw){
        return new Promise(function(resolve, reject){

            if (params.limit == undefined ) {
                Profile.aggregate( [
                    {$project: {"albums.images": 1, "albums._id": 1, "albums.albumTimestamp": 1}},
                    {$unwind:"$albums"},
                    {$unwind:"$albums.images"},
                    {$sort: {'albums.albumTimestamp': -1}},
                ], function(err, images){
                    if (err){
                        console.log(err)
                        reject(err)
                        return
                    }
                    resolve(images)
                })
            }
            else {
                Profile.aggregate( [
                    {$project: {"albums.images": 1, "albums._id": 1, "albums.albumTimestamp": 1}},
                    {$unwind:"$albums"},
                    {$unwind:"$albums.images"},
                    {$sort: {'albums.albumTimestamp': -1}},
                    {$limit: parseInt(params.limit)}
                ], function(err, images){
                    if (err){
                        console.log(err)
                        reject(err)
                        return
                    }
                    resolve(images)
                })
            }


        })
    }
};
