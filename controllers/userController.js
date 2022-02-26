const { isEmail } = require('validator');
const { User } = require('../model');

module.exports = {
    createUser: async (req, res) => {
        const { 
            username, 
            email, 
            role, 
            powerLevel,
            hobby, 
            firstFavorite,
            secondFavorite,
        } = req.body;

        if(!isEmail(email)) {
           return res.status(401).json({error: 'Please enter a valid email address'});
        }
        try {
            const newUser = await User.create({
                username,
                email,
                role,
                powerLevel,
                hobbies: [hobby],
                twoFavoriteFoods: {
                    firstFavorite,
                    secondFavorite,
                }
            });
            res.json(newUser);
        } catch (error) {
            res.json(error);
        }
    },
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.json(users);
        } catch (error) {
            res.json(error);
        }
    },
    getUserById: async (req, res) => {
        const { userId } = req.params
        try {
            const user = await User.findById(userId, '-role -powerLevel');
            res.json(user);
        } catch (error) {
            res.json(error);
        }
    },
    updateUserById: async (req, res) => {
        const { userId } = req.params;
        try {
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                {...req.body},
                {
                    new: true,
                    runValidators: true,
                }
            );
            res.json(updatedUser);
        } catch (error) {
            res.json(error);
        }
    },
    deleteUserById: async (req, res) => {
        const { userId } = req.params;
        try {
            const deletedUser = await User.findByIdAndDelete(userId);
            res.json(deletedUser);
        } catch (error) {
            res.json(error);
        }
    },
    addHobbyToUserById: async (req, res) => {
        const { userId } = req.params;
        const { hobby } = req.body;

        try {
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                {
                    $push: {
                        hobbies: hobby,
                    },
                },
                {
                    new: true
                }
            );
            res.json(updatedUser)
        } catch (error) {
            res.json(error)
        }
    }
}