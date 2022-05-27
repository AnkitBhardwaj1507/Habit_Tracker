const User = require('../models/user'); // Import the user model

// register the user
module.exports.createUser = async(req, res) => {
    const { name, email, password, confirmPassword } = req.body; // Get the user values

    let errors = [];

    //if password and confirm password don't match, redirect to register page
    if( password !== confirmPassword ) {
        errors.push({msg: 'Password does not match'});
        return res.render('register', {
            name: '',
            email: '',
            errors
        });
    }

    try {
        let user = await User.findOne({email: email});

        //if user is already exists, render to the login page
        if(user) {
            //add error msg to the error array
            errors.push({msg: 'Email is already in use. \n Login to continue.'});

            //render the login page
            return res.redirect('login', {
                email,
                errors
            });
        }

        //Create the new user
        let newUser = await new User({
            name,
            email,
            password
        });

        //Save the new user in the database
        await newUser.save();

        //render login page
        return res.redirect('login', {
            email
        });
    }catch(err) {
        return res.redirect('back');
    }
}

//Create a session for login user
module.exports.createSession = async (req, res) => {

    
    const { email, password } = req.body; // get email and password from form body

    try {
        let user = await User.findOne({email: email});
    

        let errors = []; // Create an errors array
         
        // If user doesn't exists or password not match then redirect user to login page
        if(!user || password !== user.password) {
            errors.push({msg: 'Invalid email or password'});

            return res.render('login', {
                email: '',
                errors
            });
        }
        
        return res.redirect(`/profile/${user._id}`);
    }catch(err) {
        
        return res.redirect('back');
    }
}

// Toggle views for the user
module.exports.changeView = async (req, res) => {
    try {
        let userId = req.query.userId; // Get the user id from the query string
        let view = req.query.view; // Get the current view from the query String

        let user = await User.findById(userId); // find the user with the userid

        //check the user before chenge the view
        if(user) {

            // Toggle the view
            if(view === 'daily') {
                user.view = 'daily';
            } else {
                user.view = 'weekly';
            }

            // Save the user document
            user.save();
        }

        return res.redirect(`/profile/${userId}`);
    }catch(err) {
        return res.redirect('back');
    }
}