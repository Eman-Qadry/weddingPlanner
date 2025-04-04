const mongoose = require("mongoose");

const VendorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    businessType: { type: String, required: true }, 
    listings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Listing" }],
}, { timestamps: true });

module.exports = mongoose.model("Vendor", VendorSchema);
