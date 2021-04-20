const express = require("express");
const router = express.Router()
const controllers=require('../controllers').productSugestion
const other=require('../controllers').other

router.get('/getSugestions',other.checkNotAuth,controllers.getSugestions)
router.get('/seeSentSugestions',other.checkNotAuth,controllers.seeSentSugestions)
router.patch('/editNote',other.checkNotAuth,controllers.editNote)

module.exports=router
