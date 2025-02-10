import { User } from "./classes/user";

interface EditUser extends User {
    newUsername: string;
    newPassword: string;
  }