// Change user's password
const changePassword = async (req, res) => {
    const id = req.params.id;
    const { password } = req.body;
    try {
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

module.exports = {
    changePassword,
}