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

// edit booking
router.put('/:bookingId', requireAuth, async(req,res)=>{
    const myBooking = await Booking.findByPk(req.params.bookingId);
    const  {startDate, endDate } = req.body;
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();

    if(!myBooking){
        res.statusCode = 404;
        res.json({
            "message":"Booking couldn't be found",
            "statusCode":404
        })

    };
    if(start >= end) {
        res.status(400);
        return res.json({
            "message": "Validation error",
             "statusCode": 400,
            "errors": {
            "endDate": "endDate cannot be on or before startDate"
                }
        })
    };

    if(start <= Date.now()){
        res.status(403);
        return res.json({
            "message": "Past bookings can't be modified",
            "statusCode": 403
        })
    };
    const spotBookings = await Booking.findAll({
        where:{id:req.params.bookingId}
    });

    for (let booking of spotBookings) {
        const bookingStartDate = new Date(booking.startDate).getTime();
        const bookingEndDate = new Date(booking.endDate).getTime();

        if(start === bookingStartDate || start > bookingStartDate && start <= bookingEndDate
             || end === bookingStartDate || end > bookingStartDate && end <= bookingEndDate ){
            res.status(403);
            return res.json({
                "message": "Sorry, this spot is already booked for the specified dates",
                "statusCode": 403,
                "errors": {
                    "startDate": "Start date conflicts with an existing booking",
                    "endDate": "End date conflicts with an existing booking"
                }
            })
        }
    };

res.json(myBooking);
}); /* done */


module.exports = router;
