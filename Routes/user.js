const {Router} = require("express");
const router = Router();
const {default: mongoose} = require("mongoose");
const { Course, User } = require("../dB");
const userMiddleware = require("../middleware/user");

router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;

    await User.create({
        username,
        password
    })

    res.json({
        message:`User ${username} created successfully`
    })
});


router.get("/courses",async(req,res)=>{
    const response = await Course.find({});

    res.json({
        courses: response
    })

})

router.post('/courses/:courseId',userMiddleware, async(req, res) => {
    // Implement course purchase logic
    try {
        // Implement course purchase logic
        const courseId = req.params.ObjectId;
        const username = req.headers.username;

        await User.updateOne(
            { username: username },
            { "$push": { purchasedCourses: new mongoose.Types.ObjectId(courseId) } }
        );

        res.json({ message: "Purchase complete!" });
    } catch (error) {
        console.error("Error processing course purchase:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    // Implement fetching purchased courses logic
    const user = await User.findOne({
        username: req.headers.username
    });

    console.log(user.purchasedCourses);
    const courses = await Course.find({
        _id: {
            "$in": user.purchasedCourses
        }
    });
    res.json({
        courses: courses
    })
})




module.exports= router