const express = require('express');
const router = express.Router();
const { Spot, SpotImage, Review } = require('../../db/models');
const sequelize = require('sequelize');


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



module.exports = router;
