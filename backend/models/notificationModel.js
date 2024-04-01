const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  notificationId: { type: mongoose.Schema.Types.ObjectId, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  status: { type: String, default: 'Unread' }
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
