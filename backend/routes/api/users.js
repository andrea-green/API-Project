const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [

  check('username')
  .exists({ checkFalsy: true })
  .isLength({ min: 4 })
  .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
  .not()
  .isEmail()
  .withMessage('Username cannot be an email.'),
check('email')
.exists({ checkFalsy: true })
.isEmail()
.withMessage('Please provide a valid email.'),
check('password')
.exists({ checkFalsy: true })
.isLength({ min: 6 })
.withMessage('Password must be 6 characters or more.'),
handleValidationErrors
];

// Sign up
router.post(
  '/',
  validateSignup,
  async (req, res) => {
    const { email,firstName,lastName, password, username } = req.body;

    const myUserName = await User.findOne({where:{username}})
    if(myUserName){
      res.status(403);
      return res.json({
        "message": "User already exists",
        "statusCode": 403,
        "errors": {
          "username": "User with that username already exists"
        }
      })
    }

    const myEmail = await User.findOne({where:{email}})
    if(myEmail){
      res.status(403);
      return res.json({
        "message": "User already exists",
        "statusCode": 403,
        "errors": {
          "email": "User with that email already exists"
        }
      })
    }
      const user = await User.signup({ email,firstName,lastName, username, password });


      await setTokenCookie(res, user);

      return res.json({
        user: user
      });
    }
  );



module.exports = router;
