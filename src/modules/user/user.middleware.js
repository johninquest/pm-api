import { updateLastLogin } from "./user.service.js";

const updateLastLoginMiddleware = async (req, res, next) => {
  try {
    const { firebaseUid } = req.user; // Assuming req.user contains the authenticated user's information

    if (firebaseUid) {
      await updateLastLogin(firebaseUid);
    }

    next();
  } catch (error) {
    console.error("Error updating last login:", error);
    next(error);
  }
};

export default updateLastLoginMiddleware;