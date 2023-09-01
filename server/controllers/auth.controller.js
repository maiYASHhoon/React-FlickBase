const { authService } = require('../services');
const authController = {
  async register(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await authService.createUser(email, password);
      res.json({
        status: 'Success',
        message: 'User Registered Successfully',
        result: user,
      });
    } catch (error) {
      res.json({
        status: 'Failed',
        message: 'User Registered Unsuccessfully',
        result: error.message,
      });
    }
  },
};
module.exports = authController;
