const { ObjectId } = require("mongodb");

// GET all transfer
const getAllUsers = async (req, res) => {
    try {
        const users = await req.db.collection('users').find().toArray();
        res.status(200).json({
            message: 'Successfully get all employee data',
            data: users
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// GET user profile by ID
const getUser = async (req, res) => {
    try {
        const userID = req.params.id; // Extract user ID from the request parameters
        const user = await req.db.collection('users').findOne({
            _id: new ObjectId(userID),
            is_deleted: { $exists: false }
        });

        if (user) {
            res.status(200).json({
                message: `Success get user's data`,
                data: user
            });
        } else {
            res.status(404).json({
                message: `User with ID: ${userID} not found`
            });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Update job position and salary by ID
const updateUser = async (req, res) => {
    const id = req.params.id;
    const { salary, jobPosition } = req.body;
    try {
        const user = await db.collection('users').findOne({ _id: new ObjectId(id) });

        if (!user) {
            return res.status(404).json({ message: `User with ID ${id} not found.` });
        }

        const userUpdate = await db.collection('users').updateOne(
            { _id: new ObjectId(id) },
            { $set: { salary, jobPosition } } // Include the existing username
        );

        res.status(200).json({
            message: 'Success update Employee data',
            data: userUpdate
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Soft Delete user data
const deleteUser = async (req, res) => {
    const id = req.params.id;

    try {
        const userToDelete = await db.collection('users').findOne({ _id: new ObjectId(id) });

        if (!userToDelete) {
            return res.status(404).json({ message: `User with ID ${id} not found.` });
        }

        if (userToDelete.role === 'admin') {
            return res.status(403).json({ message: `Sorry, role 'Admin' cannot be deleted.` });
        }

        const user = await db.collection('users').findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: { is_deleted: true } }
        );

        res.status(200).json({
            message: `Success delete ID = ${id}`,
            data: user
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
}