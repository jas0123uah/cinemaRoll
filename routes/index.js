const express = require('express');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const db = require("../db/models");
const { asyncHandler, csurfProtection } = require("./utils");

const router = express.Router();


/* GET home page. */
router.get('/', csurfProtection, asyncHandler(async (req, res) => {
  req.session.redirectTo =req.originalUrl
  // the template expects genres in sub-arrays of size 5
  const csrfToken = req.csrfToken()
  const genres_ = await db.Genre.findAll().map(g => g.dataValues);
  const genres = [];
  while (genres_.length) genres.push(genres_.splice(0, 5));

  // the template expects top 10 movies
  const topMovies = await db.Movie.findAll({
      limit: 15,
      order: [["popularity", "DESC"]]
  }).map(m => m.dataValues);
  res.render('index', { genres, topMovies, csrfToken });
}));

router.post('/search', asyncHandler(async (req, res) => {
  const { search } = req.body;

  const results = await db.Movie.findAll({
    where: {
      title: {
        [Op.iLike]: `%${search}%`,
      },
    },
  });
  res.json({ results })

  // return res.render('searchResults', { results});
}));

module.exports = router;
