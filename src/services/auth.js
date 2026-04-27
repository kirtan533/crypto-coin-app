import { auth } from "@/firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export async function signup(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return userCredential;
  } catch (error) {
    let message = "Something went wrong";

    switch (error.code) {
      case "auth/email-already-in-use":
        message = "Email already registered. Please login.";
        break;

      case "auth/invalid-email":
        message = "Invalid email format";
        break;

      case "auth/weak-password":
        message = "Password should be at least 6 characters";
        break;

      default:
        message = error.message;
    }
    throw new Error(message);
  }
}

export async function login(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return userCredential;
  } catch (error) {
    let message = "Something went wrong";

    switch (error.code) {
      case "auth/invalid-credential":
        message = "Invalid email or password";
        break;

      case "auth/user-not-found":
        message = "No account found. Please signup";
        break;

      case "auth/wrong-password":
        message = "Incorrect password";
        break;
      case "auth/too-many-requests":
        message = "Too many attempts. Try again later";
        break;

      default:
        message = error.message;
    }
    throw new Error(message);
  }
}

export async function logout() {
  await signOut(auth);
}
