import mongoose from 'mongoose';

const EnquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name.'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
  phone: {
    type: String,
    required: [true, 'Please provide a phone number.'],
    maxlength: [20, 'Phone cannot be more than 20 characters'],
  },
  preferredDate: {
    type: Date,
    required: [true, 'Please provide a preferred date.'],
  },
  reason: {
    type: String,
    required: [true, 'Please provide a reason for the visit.'],
  },
  status: {
    type: String,
    enum: ['Pending', 'Contacted'],
    default: 'Pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Enquiry || mongoose.model('Enquiry', EnquirySchema);
