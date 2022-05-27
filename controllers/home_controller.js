const User = require('../models/user');

//render signup page 
module.exports.register = (req, res) => {
    return res.render('register', {
        name: '',
        email: '',
    })

}

// render login page as home page
module.exports.login = (req, res) => {
    return res.render('login', {
        email: '',
    })
}