import Person from '../models/Person.model.js';
import Relationship from '../models/Relationship.model.js';
import Tree from '../models/Tree.model.js';

const initializeFamilyTree = async () => {
  try {
    // Create default persons
    const mother = await Person.create({ firstName: 'Mother' });
    const father = await Person.create({ firstName: 'Father' });
    const child = await Person.create({ firstName: 'You' });

    // Create relationships between default persons
    await Relationship.create({
      person1Id: mother._id,
      person2Id: father._id,
      relationshipType: 'Spouse',
    });
    await Relationship.create({
      person1Id: mother._id,
      person2Id: child._id,
      relationshipType: 'ParentChild',
    });
    await Relationship.create({
      person1Id: father._id,
      person2Id: child._id,
      relationshipType: 'ParentChild',
    });

    // Create the tree with the child as the root
    const tree = await Tree.create({ rootPersonId: child._id });

    return { tree, rootPersonId: child._id };
  } catch (error) {
    console.error('Error initializing family tree:', error);
    throw error;
  }
};

const addMemberToFamilyTree = async (personId) => {
  try {
    // Find the family tree document
    const tree = await Tree.findOne();

    // Add the personId to the members array
    tree.members.push(personId);

    // Save the updated tree document
    await tree.save();

    return tree; // Return the updated tree document
  } catch (error) {
    console.error('Error adding member to family tree:', error);
    throw error;
  }
};

export const treeHandler = {
  initializeFamilyTree,
  addMemberToFamilyTree,
};
