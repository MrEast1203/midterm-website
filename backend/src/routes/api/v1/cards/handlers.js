import { prisma } from "../../../../adapters.js";
import CryptoJS from "crypto-js";
function hashStringWithSHA256(str) {
  const hash = CryptoJS.SHA256(str);
  return hash.toString(CryptoJS.enc.Hex);
}
/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export async function createOneCard(req, res) {
  try {
    const username = req.body.username;
    const password = hashStringWithSHA256(req.body.password);
    const user = await prisma.user.findUnique({ where: { name: username } });
    if (user === null) return res.status(401).json({ error: "Not Found" });
    if (user.password !== password)
      return res.status(401).json({ error: "Unauthorized" });
    // Assuming you want to create a card for the user
    const cardData = req.body.cardData;
    try {
      if (cardData.title === "" || cardData.content === "") {
        return res
          .status(400)
          .json({ message: "Please enter title and content", isError: true });
      }
      const card = await prisma.card.create({
        data: {
          title: cardData.title,
          content: cardData.content,
          userId: user.id, // Ensure that this is a valid userId that exists in the database
        },
      });
      // console.log("Card created:", card);
      return res.status(201).json({
        id: card.id,
        title: card.title,
        content: card.content,
        user: { name: user.name, image: user.image },
      });
    } catch (error) {
      console.error("Failed to create card:", error);
      return res
        .status(500)
        .json({ message: "Internal Server Error", isError: true });
    }
  } catch (error) {
    console.error("Failed to create card:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", isError: true });
  }
}

export async function getAllCards(req, res) {
  try {
    const cards = await prisma.card.findMany({
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        }, // Include the user data in the response
      },
    });
    return res.status(200).json(cards);
  } catch (error) {
    console.error("Failed to get cards:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", isError: true });
  }
}

export async function deleteOneCards(req, res) {
  //   console.log(req.body);
  try {
    const username = req.body.username;
    const password = hashStringWithSHA256(req.body.password);
    const user = await prisma.user.findUnique({ where: { name: username } });
    if (user === null) return res.status(401).json({ error: "Not Found" });
    if (user.password !== password)
      return res.status(401).json({ error: "Unauthorized" });
    const cardId = parseInt(req.body.cardId);
    if (isNaN(cardId)) return res.status(400).json({ error: "Invalid id" });
    const card = await prisma.card.findUnique({
      where: { id: cardId },
    });
    if (card === null) return res.status(404).json({ error: "Not Found" });
    if (card.userId !== user.id)
      return res.status(403).json({ error: "Forbidden" });
    await prisma.card.delete({ where: { id: cardId } });
    return res.status(204).end();
  } catch (error) {
    console.error("Failed to delete card:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", isError: true });
  }
}
