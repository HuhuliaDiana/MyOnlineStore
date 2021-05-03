const express = require("express");
const router = express.Router()
const controllers=require('../controllers').productSugestion
const other=require('../controllers').other

router.get('/getSugestions',other.checkNotAuth,controllers.getSugestions)
router.get('/seeSentSugestions',other.checkNotAuth,controllers.seeSentSugestions)
router.patch('/editNote',other.checkNotAuth,controllers.editNote)
router.get('/seeUsersWhoSuggestedProducts',other.checkNotAuth,controllers.seeUsersWhoSuggestedProducts)
router.get('/seeSuggestionsFromUser/:id',other.checkNotAuth,controllers.seeSuggestionsFromUser)
router.delete('/removeSuggestion/:productId/:userId',controllers.removeSuggestion)


module.exports=router
