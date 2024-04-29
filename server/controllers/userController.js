import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

export const createUser = asyncHandler(async (req, res) => {
  console.log("creating a user");


  const { email } = req.body;

  try{
    const userExists = await prisma.User.findUnique({ where: { email: email } }); // In usr collection it is finding a unique document where email matches

    if (!userExists) {
      //if user does not exist need to register
  
      const user = await prisma.User.create({ data: req.body }); //created user document inside the user collection
      res.status(201).json({
        message: "User registered successfully",
        user: user,
      });
    } else {
      res.status(400).json({ message: "User already registered" });
    }
  }
  catch(error){
    console.log(error);
    res.status(400).json({
        message:error.message,
    })
  }
 
});