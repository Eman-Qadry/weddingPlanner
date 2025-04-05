const Vendor = require('../models/vendor');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const createJWT = require('../config/JWT');
const sendEmail = require('../utils/sendEmail');

// Register Vendor
const registerVendor = async (req, res, next) => {
  try {
    const { name, email, password, businessType } = req.body;

    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor) {
      return res.status(400).json({ message: 'Vendor already exists. Please login.' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newVendor = new Vendor({
      name,
      email,
      password: hashedPassword,
      businessType,
    });

    await newVendor.save();
    res.status(201).json({ message: 'Vendor registered successfully' });
  } catch (err) {
    next(err);
  }
};

// Vendor Login
const loginVendor = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const vendor = await Vendor.findOne({ email });

    if (!vendor) {
      return res.status(400).json({ message: 'Vendor not found. Please sign up.' });
    }

    const isMatch = await bcrypt.compare(password, vendor.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = createJWT(vendor._id);
    res.cookie('token', token, { httpOnly: true }).json({ message: 'Login successful', token });
  } catch (err) {
    next(err);
  }
};

// Forgot Password
const forgotPasswordVendor = async (req, res, next) => {
  try {
    const { email } = req.body;
    const vendor = await Vendor.findOne({ email });

    if (!vendor) return res.status(404).json({ message: 'Vendor not found' });

    const resetToken = crypto.randomBytes(32).toString('hex');
    vendor.resetToken = resetToken;
    vendor.resetTokenExpiry = Date.now() + 15 * 60 * 1000;

    await vendor.save();

    const resetLink = `${process.env.BASE_URL}/api/vendor/reset-password/${resetToken}`;
    const emailHtml = `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`;

    await sendEmail(vendor.email, 'Reset Password', emailHtml);
    res.status(200).json({ message: 'Password reset email sent' });
  } catch (err) {
    next(err);
  }
};

// Reset Password
const resetPasswordWithTokenVendor = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    const vendor = await Vendor.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!vendor) {
      return res.status(404).json({ message: 'Invalid or expired token' });
    }

    const hashed = await bcrypt.hash(newPassword, 12);
    vendor.password = hashed;
    vendor.resetToken = undefined;
    vendor.resetTokenExpiry = undefined;

    await vendor.save();
    res.status(200).json({ message: 'Password reset successfully' });
  } catch (err) {
    next(err);
  }
};

// Update Password (Requires Auth)
const updatePasswordVendor = async (req, res, next) => {
  try {
    const { password, newPassword, verifyNewPassword } = req.body;
    const vendorId = req.userId;

    const vendor = await Vendor.findById(vendorId);
    if (!vendor) return res.status(404).json({ message: 'Vendor not found' });

    if (newPassword !== verifyNewPassword)
      return res.status(400).json({ message: 'Passwords do not match' });

    const isMatch = await bcrypt.compare(password, vendor.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid current password' });

    vendor.password = await bcrypt.hash(newPassword, 12);
    await vendor.save();
    res.status(200).json({ message: 'Password updated successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  registerVendor,
  loginVendor,
  forgotPasswordVendor,
  resetPasswordWithTokenVendor,
  updatePasswordVendor,
};
