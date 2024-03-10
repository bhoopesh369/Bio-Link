const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const hospital1 = require('../identities/identities').hospital1;
const hospital2 = require('../identities/identities').hospital2;
const refreshSecretToken = 'refreshpassword';
let refreshTokens = [];

function generateAccessToken(username, role) {
    return jwt.sign({ username: username, role: role }, process.env.JWT_SECRET, { expiresIn: '500m' });
}

const { registerUser } = require('../../application-javascript/app.js');

// Routers
router.post('/register', async (req, res) => {
    const userExists = await User.findOne({ username: req.body.username });
    if (userExists) return res.status(400).send('user already exists');

    console.log(req.body);

    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    console.log(salt);
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    let user;

    user = User({
        username: req.body.username,
        password: hashedPassword
    });

    // Validation check
    let { username, hospitalId, role } = req.body;
    hospitalId = hospitalId.toLowerCase();

    if (role.toLowerCase() === 'doctor' || role.toLowerCase() === 'admin') {
        return res.status(400).send('Invalid role, No registration for doctor or admin');
    }

    else if (role.toLowerCase() === 'patient') {
        const response = await registerUser(username, hospitalId);
        if (response.error) {
            return res.status(400).send(response.error);
        }
    }

    else {
        return res.status(400).send('Invalid role');
    }

    try {
        const newUser = await user.save()
        res.send({ user: newUser._id });
    } catch (error) {
        res.send({ message: error })
    }
})

router.post('/login', async (req, res) => {
    let { username, hospitalId, role } = req.body;
    let user;

    if (role.toLowerCase() === 'patient') {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return res.status(400).send('User with this username does not exist');

        const passwordMatch = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordMatch) return res.status(400).send('username or Password do not match');

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        res.header('auth-token', token).send(token);
    }
    else if (role.toLowerCase() === 'doctor') {
        console.log(username);
        if (hospitalId === 'medicalprovider1') {
            user = hospital1.doctors.find((doctor) => {
                if (doctor.username === username) {
                    return {
                        username: doctor.username,
                        password: doctor.password,
                    }

                }
            }
            )
            if (!user) return res.status(400).send('Invalid username or password');
            const passwordMatch = req.body.password === user.password ? true : false;
            if (!passwordMatch) return res.status(400).send('Invalid username or password');
        }
        else if (hospitalId === 'medicalprovider2') {
            user = hospital2.doctors.find((doctor) => {
                if (doctor.username === username) {
                    return {
                        username: doctor.username,
                        password: doctor.password,
                    }

                }
            }
            )
            if (!user) return res.status(400).send('Invalid username or password');
            const passwordMatch = req.body.password === user.password;
            if (!passwordMatch) return res.status(400).send('Invalid username or password');
        }
    }
    else if (role.toLowerCase() === 'admin') {
        if (hospitalId === 'medicalprovider1') {
            user = hospital1.admin.username === username ? hospital1.admin : null;
            if (!user) return res.status(400).send('Invalid username or password');
            const passwordMatch = req.body.password === user.password;
            if (!passwordMatch) return res.status(400).send('Invalid username or password');
        }
        else if (hospitalId === 'medicalprovider2') {
            user = hospital2.admin.username === username ? hospital2.admin : null;
            if (!user) return res.status(400).send('Invalid username or password');
            const passwordMatch = req.body.password === user.password;
            if (!passwordMatch) return res.status(400).send('Invalid username or password');
        }
    }
    else {
        res.status(400).send('Invalid role');
    }
    if (user) {
        const accessToken = generateAccessToken(username, role);
        const refreshToken = jwt.sign({ username: username, role: role }, refreshSecretToken);
        refreshTokens.push(refreshToken);

        if (role.toLowerCase() === 'doctor' || role.toLowerCase() === 'admin') {
            return res.json({ accessToken, refreshToken, role });
        }
        else {
            return res.json({ accessToken, refreshToken, user });
        }
    } else {
        res.status(400).send('Invalid username or password');
    }
}
)

module.exports = router;