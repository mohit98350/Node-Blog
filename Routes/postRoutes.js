const express =require("express")
const router = express.Router();
const {auth}= require("../middlewares/auth")
const {PostForm, storePost,posts,details,updateForm,
    deletePost,postUpdate,Allposts,postValidations} = require("../controllers/postsController")

router.get("/createPost",auth,PostForm)
router.post("/createPost",auth,storePost)
router.get("/posts/:page",auth,posts)
router.get("/details/:id",auth,details)
router.get("/update/:id",auth,updateForm);
router.post("/update",[postValidations,auth],postUpdate);
router.post('/delete',auth,deletePost)
router.get("/Allposts",auth,Allposts)
module.exports = router;
