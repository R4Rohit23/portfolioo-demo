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

const educationSchema = new mongoose.Schema({
    qualification: {
        type: String,
        required: false,
    },
    degree: {
        type: String,
        required: false,
    },
    courseDuration: {
        from: {
            type: Date,
            required: false,
        },
        to: {
            type: Date,
            required: false,
        },
    },
    percentage: {
        type: Number,
        required: false,
        max: 100,
        min: 0,
    },
    courseSpecialization: {
        type: String,
        required: false,
    },
    institute: {
        type: String,
        required: false,
    },
    country: {
        type: String,
        required: false,
    },
    state: {
        type: String,
        required: false,
    },
    city: {
        type: String,
        required: false,
    },
});

const artistSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    emergencyContactNumber: {
        type: String,
    },
    contactNumber: {
        type: String,
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
    // TODO:- It will refer to the Project module later
    portfolioLinks: {
        type: String,
    },
    availability: {
        weekly: {
            type: String,
        },
        monthly: {
            type: String,
        },
        hours: {
            type: String,
        },
    },
    pricing: {
        weekly: {
            type: Number,
        },
        monthly: {
            type: Number,
        },
        hourly: {
            type: Number,
        },
    },
    workLocation: {
        type: String,
        enum: ["Work from Home", "On-Office"],
    },
    isAvailable: {
        type: Boolean,
    },
    location: {
        type: String,
    },
    languageKnown: {
        type: [String],
    },
    systemAvailability: {
        type: Boolean,
    },
    paymentTerm: {
        type: String,
    },
    workingHoursPerDay: {
        type: String,
    },
    softwareUsed: {
        type: [String],
    },
    technologyBackground: {
        type: String,
    },
    certification: {
        type: [String],
    },
    clientRatings: {
        type: Number,
    },
    paymentMethods: {
        type: [String],
    },
    preferredPaymentTerms: {
        type: String,
    },
    skills: {
        type: [String],
    },
    isVerifiedByAdmin: {
        type: Boolean,
        default: false,
    },
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    profileImage: {
        type: String,
    },
    coverImage: {
        type: String,
    },
    educationInfo: {
        type: [educationSchema],
        default: [],
    },
    receivedMessageIds: {
        type: [String],
        default: [],
    },

    // TODO: REF to Portfolio, Work History, Testimonials, Project Catalog
});

const Artist = mongoose.model(Constants.DB_COLLECTIONS.ARTIST, artistSchema);

module.exports = Artist;
