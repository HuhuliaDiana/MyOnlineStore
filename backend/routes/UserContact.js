const express = require("express");
const router = express.Router()
const controllers=require('../controllers').userContact
const other=require('../controllers').other

router.post('/setUserContact',other.checkNotAuth,controllers.setUserContact)
router.get('/getCurrentUserContacts',other.checkNotAuth, controllers.getCurrentUserContacts)
router.patch('/updateUserContact/:id',other.checkNotAuth,controllers.updateUserContact)

module.exports=router