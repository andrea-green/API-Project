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
    const myReview = await Review.findOne({
        where:{
            id: req.params.reviewId,
            userId: req.user.id
        }
    });
    // get the reviewImages too??
    // const myReviewImages = await ReviewImage.findByPk(req.params.reviewId);
    // then check to make sure that review exists.
    if(!myReview){
        res.statusCode = 404;
        res.json({
            "message":"Review couldn't be found",
            "statusCode": 404
        })
    }
    const reviewId = +req.params.reviewId;

    // check to make sure number of images is no more than 10. ->
    // probably check the length? if reviewImage thing . length is < 10, throw the error?
    const imagesCount = await ReviewImage.findAll({
        where:{reviewId}
    });
    console.log(imagesCount);

    if(imagesCount.length >= 10){
        res.statusCode = 403;
        res.json({
            "message":"Maximum number of images for this resource was reached",
            "statusCode": 403
        })

    };
    const newReviewImage = await ReviewImage.create({
        reviewId,
        url
    });
    const finalReviewImage = await ReviewImage.findByPk(newReviewImage.id, {attributes: ["id", "url"]});
    return res.json(finalReviewImage);
});

// get all reviews of current user

router.get('/current', requireAuth, async(req,res)=>{
    //first get the current user info
    const currentUser = +req.user.id;
    //get all of the reviews of the current user.
    const Reviews = await Review.findAll({
        where:{
            userId:currentUser
        },
        include: [
            {
                model:User,
                attributes: ["id", "firstName", "lastName"]
            },
            {
            model: Spot,
            attributes: {exclude: ["description", "createdAt", "updatedAt"]}
        },
        {
            model:ReviewImage,
            attributes: ["id", "url"]
        }
    ]
    })
    let previewImages = [];

    //iterate over Reviews
    // for each review, make it into an object-> conver to JSON.
    for(let review of Reviews) {
    // Reviews.forEach(async(review)=>{
        // Review.Spot to get to the Spot info
        // then make query for spotImage. where spotId = Review.spot.id where previewImage = true.
        const myReview = review.toJSON();

        const previewImage = await SpotImage.findOne({
            where: {
             spotId:review.Spot.id,
             preview:true
            }
        });

        // then set review.spot.preview = spotImage.url.
        if(!previewImage){
            myReview.Spot.previewImage = "no preview image found"
        } else {
            myReview.Spot.previewImage = previewImage.url;
        };

        // push this into array, then return array.
        previewImages.push(myReview);
    };
    res.json({Reviews:previewImages});
});

// edit a review

router.put('/:reviewId', validateReview,requireAuth, async(req,res)=>{
    //find the review with the reviewId i want.
    const myReview = await Review.findByPk(req.params.reviewId);

    // check if myReview dne.
    if(!myReview){
        res.statusCode = 404;
        res.json({
            "message":"Review couldn't be found",
            "statusCode": 404
        })
        // if it does, do the thing.
        // check that review's user id is the same as the user id in the body
    } else if (myReview.userId === +req.user.id) {
        res.json(myReview)
    }

}); /*done*/

// delete review

router.delete('/:reviewId', requireAuth, async(req,res)=>{
    const myReview = await Review.findByPk(req.params.reviewId, {
        where:{
            userId:req.user.id
        }
    });

    if(!myReview){
        res.statusCode = 404;
        res.json({
            "message":"Review couldn't be found",
            "statusCode": 404
        })
    };

    await myReview.destroy();
    res.status(200);
    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    });
}); /*done*/

module.exports = router;
