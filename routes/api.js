var express = require('express')
var router = express.Router()
var controllers = require('../controllers')

router.get('/:resource', function(req, res, next){

    var resource = req.params.resource

    var controller = controllers[resource]
    if (controller == null){
        res.json({
            confirmation: 'fail',
            message: 'Invalid Resource'
        })
        return
    }

    controller.find(req.query, false)
    .then(function(entities){
        res.json({
            confirmation: 'success',
            results: entities
        })
    })
    .catch(function(err){
        res.json({
            confirmation: 'fail',
            results: err
        })
    })

})

router.get('/:resource/:id', function(req, res, next){
    var resource = req.params.resource

    var controller = controllers[resource]
    if (controller == null){
        res.json({
            confirmation: 'fail',
            message: 'Invalid Resource'
        })
        return
    }

    var id = req.params.id
    controller.findById(id)
    .then(function(result){
        res.json({
            confirmation: 'success',
            result: result
        })
    })
    .catch(function(err){
        res.json({
            confirmation: 'fail',
            message: resource+' '+id+' not found'
        })
    })
})

router.post('/:resource', function(req, res, next){
    var resource = req.params.resource
    var controller = controllers[resource]
    if (controller == null){
        res.json({
            confirmation: 'fail',
            message: 'Invalid Resource'
        })
        return
    }
    controller.create(req.body)
    .then(function(result){
        res.json({
            confirmation: 'success',
            result: result
        })
    })
    .catch(function(err){
        res.json({
            confirmation: 'fail',
            message: err
        })
    })
})


module.exports = router
