const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authenticated');
const {
  registerVendor,
  loginVendor,
  forgotPasswordVendor,
  resetPasswordWithTokenVendor,
  updatePasswordVendor,
} = require('../controllers/vendor');


router.post('/register', registerVendor);
router.post('/login', loginVendor);
router.post('/forgot-password', forgotPasswordVendor);
router.post('/reset-password/:token', resetPasswordWithTokenVendor);
router.post('/update-password', auth, updatePasswordVendor);

module.exports = router;
