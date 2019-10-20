const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

// Load User model
const User = require("../model/User");
// Load input validation
const validateRegisterInput = require("../validation/register");

// @route POST api/users/register
// @desc Register user
// @access Public
const signUp = (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
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
};

module.exports.signUp = signUp

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
const login= (req, res) => {
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
    console.log(body)
    UserModel.findOne({email_id: body.email.toLowerCase()}, (error, user)=>{
        if(error){
            res.json({code: 400, message:'Some went wrong'});
        }

        if(user){

            const token = crypto.randomBytes(20).toString('hex'); 
            console.log(token); 
            UserModel.updateOne({email_id: body.email},
                {$set: { 
                        resetPasswordToken: token,
                        resetPasswordExpires: Date.now() + 360000
                        }
                }, (error, updatedUser) =>{
                    if(error){
                        res.json({code: 400, message:'Something went wrong'});
                    }
                    readHTMLFile(__dirname + '/resetPassword.html', function(err, html) {

                        console.log( __dirname+'/images/forget_password.png')
                        var template = handlebars.compile(html);
                        var replacements = {
                            username: user.first_name + ' ' + user.last_name,
                            image1: 'https://i.ibb.co/HF4ZQBF/codeword-favi.png',
                            url:'https://codeword-group03.herokuapp.com/resetPassword/'+token,
                            type: 'Reset Password',
                            message1: 'There was a request to change your password!',
                            message2: 'If did not make this request, just ignore this email. Otherwise, please click the button below to change your password:'
                       };
                    const transporter = nodemailer.createTransport({
                        service: 'gmail', 
                        auth: {
                                user: 'codeword.group03@gmail.com',
                                pass: 'Aug@2019'
                             }
                    });

                const mailoptions = {
                    from: 'codeword.group03@gmail.com', 
                    to: body.email, 
                    subject: "Link To Reset Password", 
                    text:'Hi, \n\n'+
                        'You are receiving this because you(or someone else) have requested the reset'+ 
                        'of the password for your account.\n\nPlease click on the following link,'+
                        'or paste this into your browser to complete the process within one hour of' +
                        ' receiving it:\n\n' + 'https://codeword-group03.herokuapp.com/resetPassword/'+token+'\n\n' + 
                        'If you did not request this, please ignore this email and your password will remain unchanged.\n\n'+
                        'Thank you!\n'+
                        'Team codeword group03',
                    html: template(replacements)
                }
            console.log('sending mail')

                    transporter.sendMail(mailoptions, function (err, response) {
                        if (err) {
                            res.json({code: 400, message:err});
                        } else {
            
                            res.json({code: 200, message:'Recovery email sent'});
                        }
                })
            })
            })

        }else{
        res.json({code: 404, message:'User is not registered'});
        }
        
    })

}

module.exports.forgotPassword = forgotPassword