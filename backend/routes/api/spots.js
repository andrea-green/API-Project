const express = require('express');
const router = express.Router();
const { Spot, SpotImage, Review,User,ReviewImage, Booking } = require('../../db/models');
const sequelize = require('sequelize');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require("sequelize");

const validateSpot = [
    check('address')
    .notEmpty()
    .withMessage('Street address is required'),
    check('city')
    .notEmpty()
    .withMessage('City is required'),
    check('state')
    .notEmpty()
    .withMessage('State is required'),
    check('country')
    .notEmpty()
    .withMessage('Country is required'),
    check('lat')
    .isDecimal()
    .withMessage('Latitude is not valid'),
    check('lng')
    .isDecimal()
    .withMessage('Longitude is not valid'),
    check('name')
    .isLength({max:50})
    .withMessage('Name must be less than 50 characters'),
    check('description')
    .notEmpty()
    .withMessage('Description is required'),
    check('price')
    .notEmpty()
    .isInt()
    .withMessage('Price per day is required'),
    handleValidationErrors
];


const validateReview = [
    check('review')
    .notEmpty()
    .withMessage('Review text is required'),
    check('stars')
    .isInt({min:1, max:5})
    .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
];




//Get all spots
router.get('/', async(req,res)=>{
    let { page, size, minLat,maxLat, minLng,maxLng,minPrice,maxPrice } = req.query;
    const errors = {};
    const pagination = {};
    const where = {};

    if(page){
        if(page <= 0 || isNaN(page) ){
            errors.page = 'Page must be greater than or equal to 1'
        }else if (page > 10) page = 10
    }else {page = 1};

    if(size){
        if(size <= 0 || isNaN(size)){
            errors.size = 'Size must be greater than or equal to 1'
        } else if (size > 20) size = 20
    }else {size = 20};


    if(minLat){
        if (isNaN(minLat)){errors.minLat = 'Minimum latitude is invalid'};
        if (!where.lat)where.lat = {};
        where.lat[Op.gte] = minLat;
    };
    if(maxLat){
        if (isNaN(maxLat)){
            errors.maxLat = 'Maximum latitude is invalid'
        }else if (minLat) {
            if (maxLat < minLat) {
                errors.maxLat = 'Maximum latitude is invalid'
            }
        }
        if (!where.lat)where.lat = {};
        where.lat[Op.lte] = maxLat;
    };


    if(minLng){
        if (isNaN(minLng)){errors.minLng = 'Minimum longitude is invalid'}
        if (!where.lng)where.lng = {};
        where.lng[Op.gte] = minLng;
    };
    if(maxLng){
        if (isNaN(maxLng)){
            errors.maxLng = 'Maximum longitude is invalid'
        }else if (minLng) {
            if (maxLng < minLng) {
                errors.maxLng = 'Maximum longitude is invalid'
            }
        }

        if (!where.lng)where.lng = {};
        where.lng[Op.lte] = maxLng;
    };


    if(minPrice){
        if (isNaN(minPrice) || minPrice < 0 ){
            errors.minPrice= 'Minimum price must be greater than or equal to 0'
        }
        if (!where.price)where.price = {};
        where.price[Op.gte] = minPrice;
    };
    if(maxPrice){
        if (isNaN(maxPrice) || maxPrice < 0 ){
            errors.maxPrice= 'Maximum price must be greater than or equal to 0'
        } else if (minPrice){
            if(minPrice > maxPrice) {
                errors.maxPrice= 'Maximum price must be greater than or equal to 0'
            }
        }
        if (!where.price)where.price = {};
        where.price[Op.lte] = maxPrice;
    };



    if(Object.keys(errors).length) {
        res.status(400)
        return res.json({
            "message": "Validation Error",
            "statusCode": 400,
            "errors":errors
        })
    };

    pagination.limit = +size;
    pagination.offset = +size * (+page - 1);

    const spots = await Spot.findAll({where,...pagination});



    let spotsList = [];
    spots.forEach(spot =>{
        spotsList.push(spot.toJSON())
    });


    if(!spots.length){
       return res.json({Spots:spots,page,size})
    }
    let allSpots = [];


    spotsList.forEach(async(spot) => {
        const preview = await SpotImage.findOne({
            where: {
                spotId:spot.id,
                preview:true
            }
        });

        const spotRatings = await Review.findAll({
            where:{
                spotId: spot.id
            },
            attributes:["stars"]
        });

        let stars = 0;
        spotRatings.forEach(rating=>{
            stars += rating.stars
        });

        const AvgRating = stars/spotRatings.length;
        // [sequelize.fn('AVG', sequelize.col('stars')),'AvgRating']


        if(!AvgRating){
            spot.avgRating= "New"
        }else {
            spot.avgRating = AvgRating;
        };

        if(!preview){
            spot.previewImage = "no preview image"
        } else {
            spot.previewImage = preview.url;
        };


         allSpots.push(spot);
        if(allSpots.length === spotsList.length) {
            return res.json({Spots:allSpots,page,size})
        }



    });
});

// Create a spot
router.post('/',validateSpot,requireAuth, async (req,res)=>{
const ownerId = req.user.id
// const {address,city,state,country,lat,lng,name,description,price} = req.body;

const newSpot = await Spot.create({ownerId,...req.body});
res.json(newSpot);

});


// Add image to spot based on spot id
router.post('/:spotId/images',requireAuth, async (req,res)=>{
    const { url,preview } = req.body;
    const spot = await Spot.findByPk(req.params.spotId)

    if(!spot){
        res.statusCode = 404;
        res.json({
            "message":"Spot couldn't be found",
            "statusCode": 404
        })
    };

    const spotId = +req.params.spotId;

    const newSpotImage = await SpotImage.create({
        spotId,
        url,
        preview
    })


    const newImage = await SpotImage.findByPk(newSpotImage.id,{attributes:["id","url", "preview"]});
    return res.json(newImage);
});

// get all spots owned by current user
router.get('/current', requireAuth, async (req,res) => {
    const ownerId = +req.user.id
    const spots = await Spot.findAll({where: {ownerId}});

    let spotsList = [];
    spots.forEach(spot =>{
        spotsList.push(spot.toJSON())
    });


    let allSpots = [];

    spotsList.forEach(async(spot) => {
        const preview = await SpotImage.findOne({
            where: {
                spotId:spot.id,
                preview:true
            }
        });

        const spotRatings = await Review.findAll({
            where:{
                spotId: spot.id
            },
            attributes:["stars"]
        });

        let stars = 0;
        spotRatings.forEach(rating=>{
            stars += rating.stars
        });

        const AvgRating = stars/spotRatings.length;
        // [sequelize.fn('AVG', sequelize.col('stars')),'AvgRating']


        if(!AvgRating){
            spot.avgRating= "no reviews"
        }else {
            spot.avgRating = AvgRating;
        };

        if(!preview){
            spot.previewImage = "no preview image"
        } else {
            spot.previewImage = preview.url;
        };


        allSpots.push(spot);
        if(spot === spotsList[spotsList.length-1]) {
            res.json({Spots:allSpots})
        }

    });
})

// Get details for spot from an id
router.get('/:spotId',async(req,res)=>{

    const mySpot = await Spot.findByPk (req.params.spotId,{
        include:[{
            model: SpotImage,
            attributes: ["id", "url", "preview"]
        },
        {
            model: User,
            as: "Owner",
            attributes: ["id", "firstName", "lastName"]
        }]
    });


    if(!mySpot){
        res.statusCode = 404;
        res.json({
            "message":"Spot couldn't be found",
            "statusCode": 404
        })
    } else {
    const numReviews = await Review.count({
      where: { spotId: mySpot.id}
    });
    // const avgStarRating = await Review.findOne({
    //     where:{
    //         spotId: mySpot.id
    //     },
    //     attributes:[[sequelize.fn('AVG', sequelize.col('stars')),'AvgRating']]
    // }).then(avgStarRating => avgStarRating.toJSON());
    const spotRatings = await Review.findAll({
        where:{
            spotId: mySpot.id
        },
        attributes:["stars"]
    });

    let stars = 0;
    spotRatings.forEach(rating=>{
        stars += rating.stars
    });

    const avgStarRating = stars/spotRatings.length;
    // [sequelize.fn('AVG', sequelize.col('stars')),'AvgRating']

    let avgRating = "no reviews";

    if(avgStarRating){
        avgRating = avgStarRating;
    };

    const data = {
        id: mySpot.id,
        ownerId: mySpot.ownerId,
        address: mySpot.address,
        city: mySpot.city,
        state: mySpot.state,
        country: mySpot.country,
        lat: mySpot.lat,
        lng: mySpot.lng,
        name: mySpot.name,
        description: mySpot.description,
        price: mySpot.price,
        createdAt: mySpot.createdAt,
        updatedAt: mySpot.updatedAt,
        numReviews: numReviews,
        avgStarRating: avgRating,
        SpotImages:mySpot.SpotImages,
        Owner: mySpot.Owner
    };

    res.json(data);
}
});



// Edit a spot

router.put('/:spotId', validateSpot,requireAuth, async(req,res)=>{
    // find the spot with the spotId
    const mySpot = await Spot.findByPk (req.params.spotId);
    // check to make sure the user is also the owner of the spot -> basically the user id === ownerId.
    // if the spot dne, return a 404 error with the message and statuscode in the readme.
    if(!mySpot){
        res.statusCode = 404;
        res.json({
            "message":"Spot couldn't be found",
            "statusCode": 404
        })
    } else if(mySpot.ownerId === +req.user.id ){
        // if thats good- update the spot record and return the data with all the attributes included in the readme.
        const { address,city,state,country,lat,lng,name,description,price } = req.body;
        if(address)mySpot.address = address;
        if(city)mySpot.city = city;
        if(state)mySpot.state = state;
        if(country)mySpot.country = country;
        if(lat)mySpot.lat = lat;
        if(lng)mySpot.lng = lng;
        if(name)mySpot.name = name;
        if(description)mySpot.description = description;
        if(price)mySpot.price = price;

        await mySpot.save();
        res.json(mySpot)
        // if validate spot is violated- return an error response with status code 400. -> thats validateSpot
    }else {
        res.statusCode = 403;
        res.json({
            "message":"You are not authorized",
            "statusCode": 403
        })
    }

});




// create a review for spot based on spot id


// first check to make sure user is authenticated
router.post('/:spotId/reviews', validateReview, requireAuth, async(req,res) =>{
    // then find the spot based on the spot id.-> make spot variable
    // make sure review is valid. -> make a new validReview variable, just like 90-38 in spots.js.
    const { review, stars } = req.body;
    const mySpot = await Spot.findByPk(req.params.spotId);

    // make sure the spot exists -> check if spot variable is falsey.
    if(!mySpot){
        res.statusCode = 404;
        res.json({
            "message":"Spot couldn't be found",
            "statusCode": 404
        })
    };

    const spotId = +req.params.spotId;
    const userId = req.user.id;
    // need to check if review from current user already exists.
    const myReview = await Review.findOne({
        where: {
            spotId,
            userId
        }
    });

    if(myReview){
        res.statusCode = 403;
        res.json({
            "message":"User already has a review for this spot",
            "statusCode": 403
        })
    }

    const newSpotReview = await Review.create({
        spotId,
        userId,
        review,
        stars
    });

    res.json(newSpotReview);
});

// get all reviews by spot's id
router.get('/:spotId/reviews',async(req,res)=>{
    // first get the spot with the spotId in url
    const mySpot = await Spot.findByPk(req.params.spotId);
    // check for 404 error if that review dne.
     if (!mySpot){
        res.statusCode = 404;
        res.json({
            "message":"Spot couldn't be found",
            "statusCode": 404
        })
     };
    // if it does, do the thing.

    const mySpotId = +req.params.spotId;
    const Reviews = await Review.findAll({
        where:{
            spotId:mySpotId
        },
        include: [
            {
                model:User,
                attributes: ["id", "firstName", "lastName"]
            },
            {
                model:ReviewImage,
                attributes: ["id", "url"]
            }
        ]
    });
    res.json({Reviews})
}); /*done*/

// create booking from spotId

router.post('/:spotId/bookings', requireAuth, async(req,res) =>{
    const {startDate,endDate} = req.body;
    const myStartDate = new Date(startDate).getTime();
    const myEndDate = new Date(endDate).getTime();

    const mySpot = await Spot.findOne({
        where:
        {id:req.params.spotId},
        // include: [{model:Booking}],
        [Op.not]: {ownerId:req.user.id}
    });

    if(!mySpot){
        res.status(404);
        res.json({
            "message":"Spot couldn't be found",
            "statusCode": 404
        })
    }
    if(myStartDate >= myEndDate) {
        res.status(400);
        return res.json({
            "message": "Validation error",
             "statusCode": 400,
            "errors": {
            "endDate": "endDate cannot be on or before startDate"
                }
        })
    };
    // now check to make sure dates dont conflict.
    const spotBookings = await Booking.findAll({
        where:{spotId:req.params.spotId}
    });

    for (let booking of spotBookings) {
        const bookingStartDate = new Date(booking.startDate).getTime();
        const bookingEndDate = new Date(booking.endDate).getTime();

        if(myStartDate === bookingStartDate || myStartDate > bookingStartDate && myStartDate <= bookingEndDate
             || myEndDate === bookingStartDate || myEndDate > bookingStartDate && myEndDate <= bookingEndDate ){
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
    const spotId = +req.params.spotId;
    const userId = req.user.id;

    const newBooking = await Booking.create({
        spotId,
        userId,
        startDate,
        endDate
    });
    return res.json(newBooking);
}); /* done */


// Get all bookings for spot based on spot id
router.get('/:spotId/bookings', requireAuth, async(req,res)=>{
    // get the spot i need.
    const mySpot = await Spot.findByPk (req.params.spotId);
    if(!mySpot){
        res.statusCode = 404;
        res.json({
            "message":"Spot couldn't be found",
            "statusCode": 404
        })
    };

    // check if the current user is also the spot owner.
    const mySpotId = +req.params.spotId;

    if(mySpot.ownerId === req.user.id){
        const Bookings = await Booking.findAll({
            where: {spotId:mySpotId},
            include:{
                    model: User,
                    attributes:["id", "firstName", "lastName"]
                }

        })
        res.json({Bookings})
    };

    if(mySpot.ownerId !== req.user.id){
        const Bookings = await Booking.findAll({
            where: {spotId:mySpotId},
            attributes: ["spotId", "startDate", "endDate"]

        });
        res.json({Bookings})
    };

}); /* done */

// delete a spot
router.delete('/:spotId', requireAuth, async(req,res) => {
    const mySpot = await Spot.findByPk(req.params.spotId, {
        where:{
            userId:req.user.id
        }
    });

    if(!mySpot){
        res.statusCode = 404;
        res.json({
            "message":"Spot couldn't be found",
            "statusCode": 404
        })
    }
    await mySpot.destroy();
    res.status(200);
    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    });

});


module.exports = router;
