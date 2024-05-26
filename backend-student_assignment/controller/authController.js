const jwt = require('jsonwebtoken')


//controller function to login
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if any field is missing
    if (!username || !password) {
      return res.status(400).json({ message: "Username or password is missing" });
    }

    const token = jwt.sign({ username }, process.env.SECRET_KEY, { expiresIn: '24h' });
    res.status(200).json({ message: "User logged in successfully", jwtToken: token });

  } catch (error) {
    return res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

module.exports = { login };