const express = require('express');
const router = express.Router();
const { Spot, SpotImage, Review } = require('../../db/models');
const sequelize = require('sequelize');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

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



//Get all spots
router.get('/', async(req,res)=>{
    const spots = await Spot.findAll();

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
        }).then(preview => preview.toJSON());

        const spotRatings = await Review.findOne({
            where:{
                spotId: spot.id
            },
            attributes:[[sequelize.fn('AVG', sequelize.col('stars')),'AvgRating']]
        }).then(spotRatings => spotRatings.toJSON());


        spot.previewImage = preview.url;
        spot.avgRating = spotRatings.AvgRating;

        allSpots.push(spot);
        if(spot === spotsList[spotsList.length-1]) {
            res.json({Spots:allSpots})
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


    const newImage = await SpotImage.scope("defaultScope").findByPk(newSpotImage.id);
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
        }).then(preview => preview.toJSON());

        const spotRatings = await Review.findOne({
            where:{
                spotId: spot.id
            },
            attributes:[[sequelize.fn('AVG', sequelize.col('stars')),'AvgRating']]
        }).then(spotRatings => spotRatings.toJSON());


        spot.previewImage = preview.url;
        spot.avgRating = spotRatings.AvgRating;

        allSpots.push(spot);
        if(spot === spotsList[spotsList.length-1]) {
            res.json({Spots:allSpots})
        }

    });
})


module.exports = router;
