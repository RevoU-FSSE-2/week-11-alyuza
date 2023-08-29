const { ObjectId } = require("mongodb");
const bcrypt = require('bcrypt');

// Change user's password
const changePassword = async (req, res) => {
  const id = req.params.id;
  const { password } = req.body;
  try {
    const user = await db.collection('users').findOne({ _id: new ObjectId(id) });
    if (!user) {
      return res.status(404).json({ message: `User with ID ${id} not found.` });
    }
    if (!password || password.length < 8) {
      res.status(400).json({ message: "Password must be at least 8 characters long" });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const passwordUpdate = await db.collection('users').updateOne(
      { _id: new ObjectId(id) },
      { $set: { password: hashedPassword } }
    );
    res.status(200).json({
      message: 'Change password Success.',
      data: passwordUpdate
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// View profile
const viewProfile = async (req, res) => {
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

module.exports = {
  changePassword,
  viewProfile
}