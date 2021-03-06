'use strict';

var router = require('express').Router();

var auth = require('./middlewares/auth');

var home = require('./controllers/http/home');
var post = require('./controllers/http/post');

router.get('/', home.index);
router.get('/about', home.about);
router.get('/login', home.loginView);
router.post('/login', home.login);
router.get('/logout', home.logout);

router.get('/l', post.list);
router.get('/l/:page', post.list);

router.get('/p:id', post.view);
router.get('/p/:id', post.view);
router.post('/p/create', post.create);
router.post('/p/like', post.like);
router.post('/p/unlike', post.unlike);
router.get('/p/comments/:postId', post.commentsInfo);
router.get('/p/comments/:postId/:page', post.comments);
router.post('/p/comment', post.comment);

module.exports = router;