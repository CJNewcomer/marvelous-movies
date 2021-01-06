const express = require('express');
const csrf = require('csurf');
const {Op} = require('sequelize')

const { Movie, Review } = require('../db/models')

const router = express.Router();
const csrfProtection = csrf({ cookie: true });

const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

router.get('/', asyncHandler( async (req,res,next) => {
    res.render('search')
}))

router.get('/results', asyncHandler( async (req,res,next) => {
    const moviesTop = await Movie.findAll({
        where:{
            title:{
                [Op.startsWith]: 'T'
            }
        },
        limit:10,
        offset:0
    })
    res.json({moviesTop})
}))
module.exports = router;