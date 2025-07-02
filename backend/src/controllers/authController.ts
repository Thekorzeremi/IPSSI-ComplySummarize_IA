import { Request, Response } from "express";
import { User } from "../models/userModel";
import bcrypt from "bcrypt";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "Tous les champs sont requis." });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "Email déjà utilisé." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Utilisateur créé avec succès",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Erreur enregistrement:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email et mot de passe requis." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Identifiants invalides." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Identifiants invalides." });
    }

    res.status(200).json({
      message: "Connexion réussie",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Erreur login:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
