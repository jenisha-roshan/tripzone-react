import users from "../assets/data/users.json";
import { ErrorConstants } from "../constants/Error.constants";

const { INVALID_USER_MSG } = ErrorConstants.USER;

const loginInUser = async (username, password) => {
  try {
    const user = users.find(u => u.username === username);
    if (!user || user.password !== password) {
      throw new Error(INVALID_USER_MSG);
    }
    return user;

  } catch (error) {
    throw error;
  }
};

export default { loginInUser };
