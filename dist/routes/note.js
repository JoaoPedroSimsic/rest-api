"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _note = require('../controllers/note'); var _note2 = _interopRequireDefault(_note);
var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);

const router = new (0, _express.Router)();

router.get('/', _loginRequired2.default, _note2.default.index); // show all posts
router.get('/:id', _loginRequired2.default, _note2.default.show); // show a specific post
router.post('/post', _loginRequired2.default, _note2.default.store); // create a post
router.put('/:id', _loginRequired2.default, _note2.default.update); // update an existing post
router.delete('/:id', _loginRequired2.default, _note2.default.delete); // delete a post

exports. default = router;
