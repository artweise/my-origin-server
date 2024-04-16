// import { treeHandler } from '../handlers/tree.handler';

// // CHECK!!! if rootPersonId will be added from req.body
// const createNewTree = async (req, res, next) => {
//   let { title, description, rootPersonId, members } = req.body;

//   // Check if the required fields are provided
//   // Title
//   if (!title) {
//     return res.status(400).json({
//       message: 'Please provide the title of the family tree.',
//     });
//   }

//   // TODO
//   // Check if Root person is defined (the starting point of the family tree)

//   // ?? Check if the members array exists and remove duplicates if there are any
//   if (members) {
//     members = Array.from([...new Set(members)]);
//   } else {
//     members = [];
//   }
//   try {
//     // TODO
//     // Find all the defined people IDs for the members in the members array
//     // const memberIds = await Promise.all(
//     //   members?.map(async (email) => {
//     //     const foundedUser = await userHandler.findUserByEmail(email);
//     //     // Check the users collection if a user with the member's email already exists
//     //     if (!foundedUser) {
//     //       res.status(400).json({ message: `User with email ${email} not found` });
//     //     }
//     //     return foundedUser._id;
//     //   })
//     // );

//     // Create a new family tree with the information from req.body
//     const newTree = await treeHandler.createTree({
//       title,
//       description,
//       rootPersonId,
//       members: memberIds,
//     });
//     res.status(201).json(newTree);
//   } catch (error) {
//     // In this case, we send error handling to the error handling middleware.
//     next(error);
//   }
// };

// const getTreeById = async (req, res, next) => {
//   const { treeId } = req.params;
//   try {
//     const tree = await treeHandler.getTreeById(treeId);
//     res.json(tree);
//   } catch (error) {
//     // In this case, we send error handling to the error handling middleware.
//     next(error);
//   }
// };

// // const getUserTrees = async (req, res, next) => {
// //   const userId = req.payload._id;
// //   try {
// //     const allTrees = await treeHandler.getUserTrees(userId);
// //     res.json(allTrees);
// //   } catch (error) {
// //     // In this case, we send error handling to the error handling middleware.
// //     next(error);
// //   }
// // };

// export const treeController = {
//   createNewTree,
//   getTreeById,
//   // getUserTrees,
// };
