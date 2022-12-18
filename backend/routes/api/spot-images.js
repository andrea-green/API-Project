const express = require('express');
const router = express.Router();
const { Spot, SpotImage, Review,User,ReviewImage, Booking } = require('../../db/models');
const sequelize = require('sequelize');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require("sequelize");

// delete spot image

router.delete('/:imageId', requireAuth, async(req,res)=>{
    const myImage = await SpotImage.findByPk(req.params.imageId);
    if(!myImage){
        res.statusCode = 404;
        res.json({
            "message":"Spot Image couldn't be found",
            "statusCode": 404
        })
    };
    const image = myImage.toJSON();

    const mySpot = await Spot.findOne({
        where:{
            ownerId:req.user.id,
            id: image.spotId
        }
    });

    if(!mySpot){
        res.statusCode = 404;
        res.json({
            "message":"Spot couldn't be found",
            "statusCode": 404
        })
    };

    await myImage.destroy();
    res.status(200);
    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    });



}); /*done */

module.exports = router;
