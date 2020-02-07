const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const nodemailer = require('nodemailer');
const crypto = require('crypto');
var _ = require('lodash');
var handlebars = require('handlebars');
const fs = require('fs')

// Load User model
const User = require("../model/User");

const NewUser = require("../model/NewUser");
// Load input validation
const validateRegisterInput = require("../validation/register");

var readHTMLFile = function (path, callback) {
    fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
        if (err) {
            throw err;
            callback(err);
        }
        else {
            callback(null, html);
        }
    });
};

// @route POST api/users/register
// @desc Register user
// @access Public
const signUp = (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    NewUser.findOne({ email: req.body.email }).then(async (newUser) => {
        if (newUser) {
            return res.status(400).json({ email: "Request already sent from this email" });
        }
        else {
            User.findOne({ email: req.body.email }).then(user => {
                if (user) {
                    return res.status(400).json({ email: "Email already exists" });
                } else {
                    const newUser = new NewUser({
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: req.body.password,
                        contactNo: req.body.contactNo,
                        medicalCertification: req.body.medicalCertification,
                        enforcementOfficer: req.body.enforcementOfficer
                    });
                    // Hash password before saving in database
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(user => res.json(user))
                                .catch(err => console.log(err));
                        });
                    });
                }
            });
        }
    })
};

module.exports.signUp = signUp

const acceptUser = (req, res) => {
    NewUser.findOne({ _id: req.body.params.id }).then(async (newUser) => {
                console.log('entered')
                const insertUser = new User({
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    email: newUser.email,
                    password: newUser.password,
                    contactNo: newUser.contactNo,
                    medicalCertification: newUser.medicalCertification,
                    enforcementOfficer: newUser.enforcementOfficer
                });
                console.log('entered')
                await insertUser
                    .save()
                    .then(async (user) => {
                        const data = await removeUser(req.body.params.id)
                        return res.json(data)
                    })
                    .catch(err => {
                        return res.json({ code: 400, message: err })
                    });
            
        });

};
module.exports.acceptUser = acceptUser

const pendingRequests = (req, res) => {
    NewUser.find()
        .then(newUsers => {
            res.json(newUsers);
            //console.log(incidents)
        })
        .catch(err => res.status(400).json('Error: ' + err));
};
module.exports.pendingRequests = pendingRequests

const rejectUser = async (req, res) => {
    const data = await removeUser(req.body.params.id)
    return res.json(data)
};
module.exports.rejectUser = rejectUser

async function removeUser(id) {
    console.log('entered removeUser')
    await NewUser.remove({ _id: id })
        .then((error) => {
            if (error) {
                return { code: 400, message: err }
                //res.json("Something went wrong");
            }
            //console.log(incidents)
        })
        .catch(err => { return { code: 400, message: err } });
    return { code: 200, message: "User accepted" }
}


// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
const login = (req, res) => {
    //var loginDetails = JSON.parse(req.body);
    //req.body
    const email = req.body.email;
    const password = req.body.password;
    // Find user by email
    User.findOne({ email }).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ emailnotfound: "Email not found" });
        }
        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User matched
                // Create JWT Payload
                const payload = {
                    id: user.id,
                    name: user.name
                };
                // Sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect" });
            }
        });
    });
};

module.exports.login = login;


const forgotPassword = (req, res) => {

    if (req.body.email == "") {
        return res.status(400).json({ email: "Email required" });
    }
    const body = _.pick(req.body, ['email'])
    
    User.findOne({ email: body.email.toLowerCase() }, (error, user) => {
        if (error) {
            return res.status(400).json({ email: "Email required" });
        }

        if (user) {
            const token = crypto.randomBytes(20).toString('hex');
            User.updateOne({ email: body.email },
                {
                    $set: {
                        resetPasswordToken: token,
                        resetPasswordExpires: Date.now() + 360000
                    }
                }, (error, updatedUser) => {
                    if (error) {
                        return res.json({ code: 400, message: 'Something went wrong' });
                    }
                    readHTMLFile(__dirname + '/resetPassword.html', function (err, html) {

                        var template = handlebars.compile(html);
                        var replacements = {
                            username: user.firstName + ' ' + user.lastName,
                            url: 'http://localhost:3000/resetPassword/' + token,
                            type: 'Reset Password',
                            message1: 'There was a request to change your password!',
                            message2: 'If did not make this request, just ignore this email. Otherwise, please click the button below to change your password:'
                        };
                        const transporter = nodemailer.createTransport({
                            service: 'Gmail',
                            auth: {
                                user: 'byreddypavan.tr@gmail.com',
                                pass: 'Lkjhg@07'
                            }
                        });

                        const mailoptions = {
                            from: 'byreddypavan.tr@gmail.com',
                            to: body.email,
                            subject: "Link To Reset Password",
                            text: 'Hi, \n\n' +
                                'You are receiving this because you(or someone else) have requested the reset' +
                                'of the password for your account.\n\nPlease click on the following link,' +
                                'or paste this into your browser to complete the process within one hour of' +
                                ' receiving it:\n\n' + 'http://localhost:3000/resetPassword/' + token + '\n\n' +
                                'If you did not request this, please ignore this email and your password will remain unchanged.\n\n' +
                                'Thank you!\n',
                            html: template(replacements)
                        }

                        transporter.sendMail(mailoptions, function (err, response) {
                            if (err) {
                                return res.json({ code: 400, message: err });
                            } else {

                                return res.json({ code: 200, message: 'Recovery email sent' });
                            }
                        })
                    })
                })

        } else {    
            return res.json({ code: 404, message: 'User is not registered' });
        }

    })

}

module.exports.forgotPassword = forgotPassword

const resetPassword = (req, res) => {
    let body = _.pick(req.body, ['resetToken', 'password'])
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(body.password, salt, (err, hash) => {

            if (err) {
                return res.json({ code: 400, message: 'Something went wrong' })
            }

            User.findOne({
                resetPasswordToken: body.resetToken,
                resetPasswordExpires: { $gt: Date.now() }
            },
                (error, user) => {
                    if (error) {
                        return res.json({ code: 400, message: 'Something went wrong' })
                    }

                    if (!user) {
                        return res.json({ code: 404, message: 'This link is not valid or has already expired.' })
                    }

                    bcrypt.compare(body.password, user.password, (err, match) => {

                        console.log(match)
                        if (!match) {
                            User.findOneAndUpdate({
                                resetPasswordToken: body.resetToken,
                                resetPasswordExpires: { $gt: Date.now() }
                            },
                                {
                                    $set: {
                                        resetPasswordToken: null,
                                        resetPasswordExpires: null,
                                        password: hash
                                    }
                                },
                                (error, user) => {
                                    if (error) {
                                        return res.json({ code: 400, message: 'Something went wrong' })
                                    }
                                    if (user) {
                                        return res.json({ code: 200, message: 'Password Reset successfully. You can now login.' })
                                    } else {
                                        return res.json({ code: 404, message: 'This link is not valid or has already expired.' })
                                    }
                                })
                        } else {
                            return res.json({ code: 404, message: 'Cannot use previous passwords' })
                        }

                    })

                })

        })
    })

}

module.exports.resetPassword = resetPassword