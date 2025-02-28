import User from "./user.model.js";

export const updateLastLogin = async (firebaseUid) => {
  try {
    if (firebaseUid) {
      await User.update(
        { lastLogin: new Date() },
        { where: { firebaseUid } }
      );
    }
  } catch (error) {
    console.error("Error updating last login:", error);
    throw error;
  }
};