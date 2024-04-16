import { Schema, model } from 'mongoose';

const relationshipSchema = new Schema(
  {
    relationshipType: {
      type: String,
      enum: ['ParentChild', 'Spouse', 'Siblings'],
      required: true,
    },
    person1Id: {
      type: Schema.Types.ObjectId,
      ref: 'Person',
      required: true,
    },
    person2Id: {
      type: Schema.Types.ObjectId,
      ref: 'Person',
      required: true,
    },
    // dateOfMarriage: Date,
    // dateOfDivorce: Date,
    // additionalInfo: {
    //   type: String,
    //   trim: true,
    // },
  },
  {
    timestamps: true,
  }
);

const Relationship = model('Relationship', relationshipSchema);

export default Relationship;
