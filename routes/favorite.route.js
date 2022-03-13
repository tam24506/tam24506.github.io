const express = require('express');
const favoriteRoute = express.Router();

let FavoriteModel = require('../models/Favorite')

favoriteRoute.route('/').get((req, res, next) => {
    FavoriteModel.find((error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

favoriteRoute.route('/create-favorite').post((req, res, next) => {
    FavoriteModel.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// Edit student data
favoriteRoute.route('/edit-favorite/:id').get((req, res, next) => {
    FavoriteModel.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data);
        }
    })
})

// Update student data
favoriteRoute.route('/update-favorite/:id').put((req, res, next) => {
    FavoriteModel.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
            console.log('Student successfully updated');
        }
    })
})

// Delete student data
favoriteRoute.route('/delete-favorite/:id').delete((req, res, next) => {
    FavoriteModel.findByIdAndDelete(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = favoriteRoute;