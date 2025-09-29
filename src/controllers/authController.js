const { randomNum, timeGenerator, randomCharsGen } = require("../helpers/allGenerators");
const mailer = require("../helpers/mailer");
const { linkVerifyTemplates } = require("../helpers/mailTemplates");
const { phoneRegex, passwordRegex, emailRegex } = require("../helpers/regex");
const authModel = require("../models/authModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
// Configuration
cloudinary.config({ 
    cloud_name: 'dmlolndhy', 
    api_key: '816873167382752', 
    api_secret: 'V7XIaNjdZTnXY01_upPcfdDmN3g' // Click 'View API Keys' above to copy your API secret
})

// ======================= Register Controller
/**
 * Registers a new user.
 * Validates input, hashes password, saves user, and sends verification email.
 */
const register = async (req, res) => {
    try {
        const { username, email, phone, gender, password } = req.body;
        let avatar = '';
        const code = randomCharsGen();
        const otpTimeOut = timeGenerator(4);

        // Validate required fields
        if (!username || !email || !phone || !gender || !password)
            return res.status(404).send("items not found");

        // Validate formats
        if (!phoneRegex.test(phone) || !passwordRegex.test(password) || !emailRegex.test(email))
            return res.status(400).send("invalid items");

        // Check for existing user
        const checkUser = await authModel.findOne({ email: email });
        if (checkUser)
            return res.status(400).send("email already used");

        // Assign default avatar based on gender
        if (gender === 'male')
            avatar = "https://www.svgrepo.com/show/382109/male-avatar-boy-face-man-user-7.svg";
        if (gender === 'female')
            avatar = "https://www.clipartmax.com/png/middle/121-1214390_female-avatar-female-avatar.png";

        // Hash password
        const hashedPass = await bcrypt.hash(password, 10);

        // Create new user model
        const saveModel = new authModel({
            username,
            password: hashedPass,
            email,
            phone,
            gender,
            avatar,
            code,
            codeTimeOut: otpTimeOut
        });

        // Save user to database
        await saveModel.save();

        // Send verification email
        mailer(email, linkVerifyTemplates(username, email, `localhost:8000/auth/${code}`));
        res.status(201).send("account created");
    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).send("internal server error");
    }
};

// ======================= OTP verification Controller
/**
 * Verifies user's email using code from verification link.
 * If code is valid and not expired, activates account.
 */
const linkVerification = async (req, res) => {
    const { code } = req.params;

    // Find user by verification code
    const verified = await authModel.findOne({ code: code });

    // Check if code is valid and not expired
    if (verified?.codeTimeOut > Date.now()) {
        // Clear code and timeout to mark as verified
        verified.code = null;
        verified.codeTimeOut = null;
        verified.isVerified = true;
        await verified.save();

        // Send success HTML response
        res.status(200).send(`
        <html>
            <head>
            <title>Verification Success</title>
            <style>
                body { font-family: Arial, sans-serif; text-align: center; margin-top: 50px; background: #f0f4f8; }
                .container { background: #fff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); display: inline-block; }
                h1 { color: #4CAF50; }
                a.button { display: inline-block; margin-top: 20px; padding: 10px 20px; background: #4CAF50; color: white; text-decoration: none; border-radius: 5px; }
                a.button:hover { background: #45a049; }
            </style>
            </head>
            <body>
            <div class="container">
                <h1>✅ Email Verified!</h1>
                <p>Your account is now active.</p>
            </div>
            </body>
        </html>
        `);
    } else {
        // Send failure HTML response
        res.status(404).send(`
        <html>
            <head>
            <title>Verification Failed</title>
            <style>
                body { font-family: Arial, sans-serif; text-align: center; margin-top: 50px; background: #f0f4f8; }
                .container { background: #fff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); display: inline-block; }
                h1 { color: #f44336; }
                a.button { display: inline-block; margin-top: 20px; padding: 10px 20px; background: #f44336; color: white; text-decoration: none; border-radius: 5px; }
                a.button:hover { background: #e53935; }
            </style>
            </head>
            <body>
            <div class="container">
                <h1>❌ Verification Failed</h1>
                <p>Something went wrong. Please try again or contact support.</p>
            </div>
            </body>
        </html>
        `);
    }
};

const resendLink = async (req,res) => {
    const {email} = req.body;
    const code = randomCharsGen();
    const codeTimeOut = timeGenerator(4);

    if (!email || !emailRegex.test(email)) return res.status(400).send("invalid email");

    const user = await authModel.findOne({ email: email });

    if (!user) return res.status(404).send("user not found");

    user.code = code;
    user.codeTimeOut = codeTimeOut;
    user.isVerified = false;

    await user.save();
    // Send verification email
    mailer(email, linkVerifyTemplates(user.username, email, `localhost:8000/auth/${code}`));

    res.status(200).send("verification link sent");

}


const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).send("email and password required");
    if (!emailRegex.test(email) || !passwordRegex.test(password)) return res.status(400).send("invalid email or password");

    const user = await authModel.findOne({ email: email });

    if (!user) return res.status(404).send("user not found");

    const passwordMatched = await bcrypt.compare(password, user.password)

    if (!passwordMatched) return res.status(401).send("password is incorrect");
    if (!user.isVerified) return res.status(403).send("account not verified");

    const loginInfo = {
        username: user.username,
        email: user.email,
        phone: user.phone,
        gender: user.gender,
        avatar: user.avatar,
        id: user._id,
    }

    const token = jwt.sign({ data: email}, process.env.jwt_secret, { expiresIn: '3h' });


    res.status(200).send({msg:"login successful", loginInfo:loginInfo , token:token});
}

module.exports = { register, linkVerification, resendLink, login }