const mongoose = require("mongoose");
const Constants = require("../configs.json").CONSTANTS;

const socialLinksSchema = {
    appName: {
        type: String,
        required: false,
    },
    link: {
        type: String,
        required: false,
    },
};

const clientSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Constants.DB_COLLECTIONS.USERS,
    },
    clientType: String,
    companyName: {
        type: String,
        required: true,
    },
    companyWebsite: {
        type: String,
    },
    companySize: {
        type: Number,
    },
    companyEmail: {
        type: String,
    },
    companyPhone: {
        type: String,
    },
    industry: {
        type: String,
        required: true,
    },
    socialLinks: {
        type: Object,
        default: [
            { linkedin: "" },
            { facebook: "" },
            { instagram: "" },
            { twitter: "" },
            { github: "" },
            { medium: "" },
            { leetcode: "" },
            { figma: "" },
            { adobexd: "" },
            { blender: "" },
        ],
    },
    budgetRange: {
        type: Number,
    },
    preferredPaymentTerms: {
        type: Array,
        required: true,
    },
    timelineDeadline: {
        type: Date,
    },
    preferredWorkingHours: {
        type: Array,
        required: true,
    },
    collaborationStyle: {
        type: String,
    },
    companyLocation: {
        type: String,
        required: true,
    },
    createdMessageIds: {
        type: [String],
        default: [],
    },
});

const Client = mongoose.model(Constants.DB_COLLECTIONS.CLIENT, clientSchema);

module.exports = Client;
