import { TEST_DISPATH } from "./types";

// Register
export const registerUser = userData => {
  return {
    type: TEST_DISPATH,
    payload: userData
  };
};
