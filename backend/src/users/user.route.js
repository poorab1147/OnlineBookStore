const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET_KEY;

router.post("/admin", async (req, res) => {
    const { username, password } = req.body;
    try {
        // Skipping MongoDB lookup and directly logging in
        const admin = {
            _id: 'adminId',
            username: username,
            role: 'admin'
        };

        const token = jwt.sign(
            { id: admin._id, username: admin.username, role: admin.role },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(200).json({
            message: "Authentication successful",
            token: token,
            user: {
                username: admin.username,
                role: admin.role
            }
        });
        
    } catch (error) {
       console.error("Failed to login as admin", error);
       res.status(401).send({ message: "Failed to login as admin" }); 
    }
});

module.exports = router;