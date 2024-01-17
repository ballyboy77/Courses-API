const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://sushanslondhe1357:plmqaz%40123@cluster0.scyh4zm.mongodb.net/CousesAPI")

const AdminSchema = new mongoose.Schema({
    username: String,
    password: String
})


const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    purchasedCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]

})

const CourseSchema = new mongoose.Schema({
    title: String,
    description: String,
    Price: Number,
    imageLink: String

})

const Admin = mongoose.model('Admin',AdminSchema)
const User = mongoose.model('User',UserSchema)
const Course = mongoose.model('Course',CourseSchema)

module.exports ={
    Admin,
    User,
    Course
}