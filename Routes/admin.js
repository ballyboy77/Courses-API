const express = require("express");
const { Admin, Course } = require("../dB");
const AdminMiddleware = require("../middleware/admin");

const router = express.Router();


router.post('/signup', async(req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    await Admin.create({
        username: username,
        password: password
    })
    res.json({
        msg: `Admin ${username} created in Database`
    })

});

router.post("/courses",AdminMiddleware,async (req,res)=>{
    const title = req.body.title;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    const Price = req.body.price;

    const newCourse = await Course.create({
        title,
        description,
        imageLink,
        Price
    })
    res.json({
        msg: `Course ${title} created by Admin successfully`,
        courseId: newCourse._id
    })

})

router.get('/courses',AdminMiddleware, async(req, res) => {
    
    const response = await Course.find({});

    if (response) {
        res.json({
            courses: response
        })
    }

    
});



module.exports = router;