const express = require('express');
const router = express.Router();
const { Spot, SpotImage, Review,User,ReviewImage, Booking } = require('../../db/models');
const sequelize = require('sequelize');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require("sequelize");

//delete review image
router.delete('/:imageId', requireAuth, async(req,res)=>{
    const myReviewImage = await ReviewImage.findByPk(req.params.imageId);

    if(!myReviewImage){
        res.statusCode = 404;
        res.json({
            "message":"Review Image couldn't be found",
            "statusCode": 404
        })
    };
    const reviewImage = myReviewImage.toJSON();

    const myReview = await Review.findOne({
        where:{
            userId:req.user.id,
            id: reviewImage.reviewId
        }
    });

    if(!myReview){
        res.statusCode = 404;
        res.json({
            "message":"Review couldn't be found",
            "statusCode": 404
        })
    };

    await myReviewImage.destroy();
    res.status(200);
    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    });

}); /*done*/







module.exports = router;
