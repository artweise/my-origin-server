// import Tree from '../models/Tree.model';

// const createTree = ({ title, description, rootPersonId }) => {
//   return Tree.create({
//     title,
//     description,
//     rootPersonId,
//   });
// };

// const getUserTrees = (userId) => {
//   return Tree.find({
//     members: { $in: [userId] },
//   }).populate('members');
// };

// const getTreeById = (treeId) => {
//   return Tree.findById(treeId).populate('members');
// };

// export const treeHandler = {
//   createTree,
//   getUserTrees,
//   getTreeById,
// };
