import { prisma } from "../../../../adapters.js";
import CryptoJS from "crypto-js";

export async function getAllUsers(req, res) {
  const allUsers = await prisma.user.findMany();
  return res.json(allUsers);
}
function hashStringWithSHA256(str) {
  const hash = CryptoJS.SHA256(str);
  return hash.toString(CryptoJS.enc.Hex);
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function createOneUser(req, res) {
  // First, check if a user with the given name already exists
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        name: req.body.name,
      },
    });

    // If a user is found, return an error response
    if (existingUser) {
      return res.status(409).json({
        message: "A user with this name already exists.",
        isError: true,
      });
    }
    // If no user is found, proceed to create a new user

    const user = await prisma.user.create({
      data: {
        name: req.body.name,
        password: hashStringWithSHA256(req.body.password),
        image: req.body.image, // Assuming you want to include the image if provided
      },
    });
    // console.log("User created:", user);
    return res
      .status(201)
      .json({ message: "User created successfully", isError: false });
  } catch (error) {
    console.error("Failed to create user:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", isError: true });
  }
}

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function getOneUser(req, res) {
  try {
    const username = req.body.username;
    const password = hashStringWithSHA256(req.body.password);
    // if (isNaN(id)) return res.status(400).json({ error: "Invalid id" });
    const user = await prisma.user.findUnique({ where: { name: username } });
    // console.log(user);
    if (user === null) return res.status(401).json({ error: "Not Found" });
    if (user.password !== password)
      return res.status(401).json({ error: "Unauthorized" });
    return res
      .status(200)
      .json({ message: "Login successful", username, image: user.image });
  } catch (error) {
    console.error("Failed to get user:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", isError: true });
  }
}
/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function addImage(req, res) {
  // console.log(req.body);
  try {
    const username = req.body.username;
    const password = hashStringWithSHA256(req.body.password);
    const user = await prisma.user.findUnique({ where: { name: username } });
    if (user === null) return res.status(401).json({ error: "Not Found" });
    if (user.password !== password)
      return res.status(401).json({ error: "Unauthorized" });
    // Assuming you want to update the image of the user
    const image = req.body.image;
    await prisma.user.update({
      where: { name: username },
      data: { image },
    });
    return res.status(200).json({ message: "Image added successfully" });
  } catch (error) {
    console.error("Failed to add image:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", isError: true });
  }
}
