import { Schema, model } from 'mongoose';

const treeSchema = new Schema(
  {
    // Root person ID (the starting point of the family tree)
    rootPersonId: {
      type: Schema.Types.ObjectId,
      ref: 'Person',
      required: true,
    },
    // IDs of all persons in the tree
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Person',
      },
    ],
    title: {
      type: String,
      default: 'My family tree',
      trim: true,
      required: [true, 'Give a title of your family tree'],
    },
    description: {
      type: String,
      trim: true,
    },
    // These fields store references to users who have ownership or have created or updated the tree.
    // They will be utilized in future features for authorization,
    // enabling access control for family members to edit and create additional data.
    // owner: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'User',
    // },
    // createdBy: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'User',
    // },
    // updatedBy: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'User',
    // },
  },
  {
    timestamps: true,
  }
);

const Tree = model('Tree', treeSchema);

export default Tree;
