const express = require('express')
const router = express.Router()

const userController= require("./controller/userController")
const bookController= require("./controller/bookController")
const{authentication,authorisation,authorisationbyBId}=require("./middleware/middle")

// ======================================USER API============================================//
router.post("/register",userController.createUser)
router.post("/login",userController.loginUser)
router.post("/logout",userController.logout)

// =====================================BOOK API============================================//
router.post("/books",bookController.createbook)
router.get("/books",bookController.getBook)

router.get("/books/:bookId",bookController.getById)
router.put("/books/:bookId",authentication,authorisationbyBId,bookController.updatebook)
router.delete("/books/:bookId",authentication,authorisationbyBId,bookController.deleteBooks)
// ==================================== REVIEW API ===========================================//
// router.post("/books/:bookId/review",reviewController.createReview)
// router.put("/books/:bookId/review/:reviewId",reviewController.updateReview)
// router.delete("/books/:bookId/review/:reviewId",reviewController.deleteReview)


router.all("/*", (req, res) => 
{ res.status(400).send({ status: false, message: "Endpoint is not correct" }) })

module.exports =router;