const User = require('../models/user'); // import user model 
const Task = require('../models/task'); // import task model

// profile page to show details of user
module.exports.profile = async (req, res) => {
    try {
        // fetch user id from params
        let id = req.params.id;
        let user = await User.findById(id); //find user by id
        let tasks = await Task.find({user: id}); //find all habits of user

        //Generate dates or get the available dates from the database
        for(let i=0; i < tasks.length; i++) {
            if(tasks[i].dates[6].Date.toDateString() !== new Date().toDateString()) {
                console.log(tasks[i].dates[6].Date.toDateString());
                // number of days since habit was created
                let numberOfDays = Math.round((new Date() - tasks[i].createdAt) / (1000*60*60*24));
                console.log(numberOfDays);

                //this is to ensure that the new date are generated for the last 6 days
                if(numberOfDays > 0) {
                    if(numberOfDays > 7) {
                        numberOfDays = 7
                    }

                    // remove old dates
                    tasks[i].dates = tasks[i].dates.splice(numberOfDays);

                    //push new dates to the database
                    for(let j=numberOfDays-1; j>=0; j--) {
                        let newDate = new Date(new Date().setDate(new Date().getDate() - j));
                        tasks[i].dates.push({Date: newDate, Status: 'None'});
                    }

                    await tasks[i].save();
                }
            }
        }

        return res.render('profile', {
            Name: user.name,
            userId: id,
            view: user.view,
            tasks
        });
    }catch(err) {
        console.log(err);
        return res.redirect('back');
    }
}
