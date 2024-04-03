import { Trainer } from "../models/trainer.model.js";

export class TrainerService {
  static async getAllTrainers() {
    const trainers = await Trainer.find({});

    return trainers;
  }

  static async getTrainerById(trainerId) {
    const foundTrainer = await Trainer.findById(trainerId);

    if (!foundTrainer) throw new Error("Trainer Not Found");

    return foundTrainer;
  }
  static async createTrainer(trainerData) {
    const newTrainer = new Trainer(trainerData);

    const createdTrainer = newTrainer.save();

    return createdTrainer;
  }
  static async updateTrainer(trainerId, updateTrainerData) {
    const foundTrainer = await this.getTrainerById(trainerId);

    Object.assign(foundTrainer, updateTrainerData);

    const updatedTrainer = await foundTrainer.save();

    return updatedTrainer;
  }

  static async deleteTrainer(trainerId) {
    const response = await Trainer.findByIdAndDelete(trainerId);

    if (!response) throw new Error("Trainer Not Found");
  }
}
