import { TrainerController } from "../controllers/trainer.controller.js";
import { Router } from "express";

export const trainerRouter = Router();

trainerRouter.get("/", TrainerController.getAllTrainers);
trainerRouter.get("/:id", TrainerController.getTrainerById);
trainerRouter.post("/", TrainerController.createTrainer);
trainerRouter.patch("/:id", TrainerController.updateTrainer);
trainerRouter.delete("/:id", TrainerController.deleteTrainer);
