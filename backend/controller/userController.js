import userModel from "../models/userModel";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import validator from "validator"


//login user

const loginUser = async (req, res) => {

}
const registerUser = async (req, res) => {

  const { name, password, email } = req.body;

}

export { loginUser, registerUser }