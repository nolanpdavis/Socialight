var Profile = require('../models/Profile')
var Promise = require('bluebird')
var mongoose = require('mongoose')

module.exports = {

    find: function(params, isRaw){
        return new Promise(function(resolve, reject){


            Profile.aggregate( [
                {$project: {"albums.images": 1, _id: 0}},
                {$unwind:"$albums"},
                {$unwind:"$albums.images"}
            ], function(err, images){
                if (err){
                    reject(err)
                    return
                }
                resolve(images)
            })

        })
    }
};
