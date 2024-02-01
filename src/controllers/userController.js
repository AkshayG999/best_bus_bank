const authService = require('../services/authService');

exports.login = async (req, res) => {
  try {
    const { loginID, password } = req.body;
    const token = await authService.login(loginID, password);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
