const Movie = require('../models/Movie');

exports.getIndex = async (req, res) => {
    // res.status(200).render('index');
    const movie = await Movie.find((data) => data).clone();

    try {
        console.log(movie);
        res.status(200).render('index', { movie: movie });
    } catch (err) {
        console.log(err);
    }
};

exports.getMovie = async (req, res) => {
    const movieId = req.params.movieId;

    const movie = await Movie.findById(movieId, (movie) => movie).clone();

    try {
        console.log(movie);
        res.status(200).render('movie', { movie: movie });
    } catch (err) {
        console.log(err);
    }
};


exports.getAddMovie = (req, res) => {
    res.status(200).render('edit-movie');
};

exports.getEditMovie = async (req, res) => {
    const movieId = req.params.movieId;

    const editMode = req.query.edit;

    if (!editMode) {
        return res.redirect('/');
    }

    const movie = await Movie.findById(movieId);

    try {
        if (!movieId) {
            return res.redirect('/');
        }
        console.log(movie);
        res.status(200).render('edit-movie', { movie: movie, editing: editMode });
    } catch (err) {
        console.log(err);
    }
};

exports.postMovie = (req, res) => {
    const { name,  description } = req.body;

    const movie = new Movie({ name: name, description: description });
    movie.save();
    console.log('Movie Added to the database');
    res.status(201).redirect('/');
};

exports.postEditMovie = (req, res) => {
    const movieId = req.body.movieId;
    const { name,  description } = req.body;

    Movie.findById(movieId)
        .then((movie) => {
            movie.name = name;
           // movie.image = image;
            movie.description = description;

            return movie.save();
        })
        .then(() => {
            console.log('Item Updated');
            res.status(201).redirect('/');
        })
        .catch((err) => {
            console.log(err);
        });
};


exports.postDelete = async (req, res) => {
    const movieId = req.body.movieId;

    const movie = await Movie.findByIdAndRemove(movieId, (data) => data).clone();

    try {
        console.log(movie);
        console.log('Item Deleted');
        res.redirect('/');
    } catch (err) {
        console.log(err);
    }
};