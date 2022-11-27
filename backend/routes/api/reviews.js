const express = require('express');
const router = express.Router();
const { Spot, SpotImage, Review,User, ReviewImage } = require('../../db/models');
const sequelize = require('sequelize');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateReview = [
    check('review')
    .notEmpty()
    .withMessage('Review text is required'),
    check('stars')
    .isInt({min:1, max:5})
    .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
];

// add image to review based on reviewId

router.post('/:reviewId/images', requireAuth, async(req,res)=>{
    //first get the review based on the review id.
    const { url } = req.body;
    const myReview = await Review.findByPk(req.params.reviewId);
    // get the reviewImages too??
    const myReviewImages = await ReviewImage.findByPk(req.params.reviewId);
    // then check to make sure that review exists.
    if(!myReview){
        res.statusCode = 404;
        res.json({
            "message":"Review couldn't be found",
            "statusCode": 404
        })
    }
    const reviewId = +req.params.reviewId;

    const newReviewImage = await ReviewImage.create({
        reviewId,
        url
    });
    const finalReviewImage = await ReviewImage.scope("defaultScope").findByPk(newReviewImage.id);
    return res.json(finalReviewImage);
    // check to make sure number of images is no more than 10. ->
    // probably check the length? if reviewImage thing . length is < 10, throw the error?
let imagesCount = await ReviewImage.findOne({
    where:{reviewId},
    attributes: [
        [sequelize.fn("COUNT", sequelize.col('ReviewImage.url')),"reviewImageCount"]
    ]
}).then(imagesCount => imagesCount.toJSON());

if(imagesCount > 10){
    res.statusCode = 403;
    res.json({
        "message":"RMaximum number of images for this resource was reached",
        "statusCode": 403
    })

};
});

// get all reviews of current user

// router.get('/current', requireAuth, async(req,res)=>{
//     //first get the current user info
//     const currentUser = +req.user.id;
//     //get all of the reviews of the current user.
//     const userReviews = await Review.findAll({currentUser}, {
//         include: [{
//             model: SpotImage,
//             attributes: ["id", "url", "preview"]
//         },
//         {
//             model:User,
//             as: "Owner",
//             attributes: ["id", "firstName", "lastName"]
//         }]
//     });
// });



module.exports = router;
