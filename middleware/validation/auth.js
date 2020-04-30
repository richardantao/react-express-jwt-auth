const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const User = require("../../models/Users");

exports.register = (req, res, next) => {
    const errors = validationResult(req);
    const { email } = req.body;

    body("first", "First Name received an invalid input")
        .exists().withMessage("First Name is a required field")
        .trim()
        .escape();

    body("last", "Last Name received an invalid input")
        .exists().withMessage("Last Name is a required field")
        .trim()
        .escape();

    body("email", "Email received an invalid input")
        .exists().withMessage("Email is a required field")
        .isEmail().withMessage("Email must be a valid email address")
        .trim()
        .escape()
        .normalizeEmail();

    body("password", "Password received an invalid input")
        .exists().withMessage("Password is a required field")
        .isLength({ min: 8, max: undefined }).withMessage("Password must be at least 8 characters")
        .escape();

    if(!errors.isEmpty()) return res.status(400).json({ message: errors.msg });

    User.findOne({ email }, { _id: 0, email: 1 })
    .then(email => {
        if(email) return res.status(400).json({ message: "This email is already associated with an active account" });

        return next();
    })
    .catch(err => {
        return res.status(500).json({ message: err.message });
    });
};

exports.login = (req, res, next) => {
    const errors = validationResult(req);
    const { email, password } = req.body;

    body("email")
        .trim()
        .escape();
    body("password")
        .trim()
        .escape();

    if(!errors.isEmpty()) return res.status(400).json({ message: errors.msg });

    User.findOne({ email }, {
        _id: 0,
        email: 1,
        password: 1
    })
    .then(user => {
        if(!user.email) return res.status(404).json({ message: "This email is not associated with an active account" });

        const passwordIsValid = bcrypt.compare(password, user.password);
        if(!passwordIsValid) return res.status(401).json({ message: "Incorrect password. Try again or click Forgot Password to reset it" });

        return next();
    })
    .catch(err => {
        return res.status(500).json({ message: err.message });
    });
};