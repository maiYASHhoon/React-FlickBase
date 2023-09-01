const { authService } = require('../services');
const httpStatus = require('http-status');
const authController = {
  async register(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await authService.createUser(email, password);
      const token = await authService.genAuthToken(user);
      // send verification email
      res.cookie('x-access-token', token).status(httpStatus.CREATED).send({
        user,
        token,
      });
      // res.json({
      //   status: 'Success',
      //   message: 'User Registered Successfully',
      //   result: user,
      // });
    } catch (error) {
      // res.json({
      //   status: 'Failed',
      //   message: 'User Registered Unsuccessfully',
      //   result: error.message,
      // });
       res.status(httpStatus.BAD_REQUEST).send(error.message);
    }
  },
};
module.exports = authController;