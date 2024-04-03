import { TrainerService } from "../services/trainer.service.js";
import {
  trainerSchema,
  trainerUpdateSchema,
} from "../schemas/trainer.schema.js";

export class TrainerController {
  static async getAllTrainers(req, res) {
    try {
      const trainers = await TrainerService.getAllTrainers();

      return res.json(trainers);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }

  static async getTrainerById(req, res) {
    try {
      const foundTrainer = await TrainerService.getTrainerById(req.params.id);

      return res.json(foundTrainer);
    } catch (error) {
      return res.status(404).json({ msg: error.message });
    }
  }

  static async createTrainer(req, res) {
    try {
      await trainerSchema.validateAsync(req.body, { abortEarly: false });

      const newTrainer = await TrainerService.createTrainer(req.body);

      return res.status(201).json(newTrainer);
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
  }

  static async updateTrainer(req, res) {
    try {
      await trainerUpdateSchema.validateAsync(req.body);

      const updatedTrainer = await TrainerService.updateTrainer(
        req.params.id,
        req.body
      );

      return res.json(updatedTrainer);
    } catch (error) {
      return res.status(400).json({ msg: error.message });
    }
  }

  static async deleteTrainer(req, res) {
    try {
      await TrainerService.deleteTrainer(req.params.id);

      return res.sendStatus(204);
    } catch (error) {
      return res.status(404).json({ msg: error.message });
    }
  }
}
