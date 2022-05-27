const Task = require('../models/task'); // import task model

// Create a new task
module.exports.createTask = async (req, res) => {
    const { desc } = req.body; // Get the title 

    let userId = req.query.id;// Get the userid from the string

    try {
        let oldTask = await Task.findOne({ user: userId, desc: desc });

        // if the task is already exists, redirect to the profile
        if(oldTask) {
            return res.redirect('back');
        }

        const dates = []; // Create an empty array for dates

        // generate date
        for(let i=6; i>0; i--) {
            let newDate = new Date(new Date().setDate(new Date().getDate() - i));
            dates.push({Date: newDate, Status: 'None'});
        }
        // push today's date
        dates.push({Date: new Date(), Status: 'None'});

        // create new task
        let newTask = await new Task({
            desc,
            dates,
            user: userId,
        });

        // Save the task document in the database
        await newTask.save();

        return res.redirect(`/profile/${userId}`);
    }catch(error) {
        return res.redirect('back');
    }
}

// Delete the task
module.exports.deleteTask = async (req, res) => {
    try {
        let userId = req.query.userId; // Get the userid from the query String
        let taskId = req.query.taskId;  // Get the task id from the query string

        let task = await Task.findById({user: userId, _id: taskId}); //find the task of the user

        // if the task exist, delete it
        if(task) {
            await task.remove();
        }

        return res.redirect(`/profile/${userId}`);
    }catch(err) {
        return res.redirect('back');
    }
}

//Toggle the task status
module.exports.changeStatus = async (req, res) => {
    try {
        let userId = req.query.userId; // Get the user id from the query string
        let taskId = req.query.taskId; // Get the habit id from the query string
        let dateId = req.query.dateId; // Get the dateid from the query String

        let task = await Task.findById({user: userId, _id: taskId});

        // if task exists
        if(task) {
            let dates = task.dates;

            // find the date with dateid
            let date = dates.find((date) => {
                return date._id == dateId;
            });

            // Get the index of the date whose status to be changed
            let index = dates.indexOf(date);

            // Toggle the status of the date
            if(dates[index].Status === 'None') {
                dates[index].Status = 'Done';
            }else if(dates[index].Status === 'Done') {
                dates[index].Status = 'Not Done';
            } else {
                dates[index].Status = 'None';
            }

            //Update the task document with the new date status
            await Task.updateOne({_id: taskId}, {dates});

            return res.redirect(`/profile/${userId}`);
        }
    }catch (err) {
        return res.redirect('back');
    }
}