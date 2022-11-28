const express = require('express');
const router = express.Router();
const { Spot, SpotImage, Review,User,ReviewImage, Booking } = require('../../db/models');
const sequelize = require('sequelize');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require("sequelize");


// get all current user's bookings

router.get('/current', requireAuth, async(req,res)=>{
    // get current user info.
    const currentUser = +req.user.id;

    // get all the bookings of current user.
    const Bookings = await Booking.findAll({
        where:{
            userId:currentUser
        },
        include: [
            {
                model:Spot,
                attributes: {exclude: ["description", "createdAt", "updatedAt"]}
            }
        ]
    });

    let previewImages = [];

    //iterate over Reviews
    // for each review, make it into an object-> conver to JSON.
    for(let booking of Bookings) {
    // Reviews.forEach(async(review)=>{
        // Review.Spot to get to the Spot info
        // then make query for spotImage. where spotId = Review.spot.id where previewImage = true.
        const myBooking = booking.toJSON();

        const previewImage = await SpotImage.findOne({
            where: {
             spotId:booking.Spot.id,
             preview:true
            }
        }).then(previewImage => previewImage.toJSON());

        // then set review.spot.preview = spotImage.url.
        myBooking.Spot.previewImage = previewImage.url;
        // push this into array, then return array.
        previewImages.push(myBooking);
    };
    res.json({Bookings:previewImages});


}); /* done */


module.exports = router;
