import express from 'express';
import isAuth  from '../middlewares/isAuth.js'; // Make sure the path is correct

const testRouter = express.Router();

// This route is now protected by the isAuth middleware
testRouter.get('/profile', isAuth, (req, res) => {
  // If isAuth works, req.user will be available here
  res.status(200).json({
    message: 'Success! You have access to this protected route.',
    user: req.user,
  });
});

export default testRouter;