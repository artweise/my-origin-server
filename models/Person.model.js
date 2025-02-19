import { Schema, model } from 'mongoose';

const personSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    maidenName: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Unknown'],
    },
    dateOfBirth: Date,
    isLiving: {
      type: String,
      enum: ['Living', 'Unknown', 'Deceased'],
    },
    dateOfDeath: Date,
    placeOfBirth: {
      type: String,
      trim: true,
    },
    placeOfDeath: {
      type: String,
      trim: true,
    },
    additionalInfo: {
      type: String,
      trim: true,
    },

    // photo: {
    //   type: String,
    //   default: 'images/default.png',
    // },
  },
  {
    timestamps: true,
  }
);

const Person = model('Person', personSchema);

export default Person;
