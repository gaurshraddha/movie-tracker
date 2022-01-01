const express = require('express');
const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/', adminController.getIndex);

router.get('/add-movie', adminController.getAddMovie);

router.get('/edit-movie/:movieId', adminController.getEditMovie);

router.post('/add-movie', adminController.postMovie);

router.post('/edit-movie', adminController.postEditMovie);

router.get('/:movieId', adminController.getMovie);

router.post('/delete', adminController.postDelete);

module.exports = router;