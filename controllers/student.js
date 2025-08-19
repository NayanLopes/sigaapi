const { Student } = require("../models");

module.exports = {
  async store(request, response) {
    const {
      body: { name, contact, birthDate },
    } = request;

    const studentCreated = await Student.create({
      name,
      contact,
      birthDate,
    });

    return response.json({
      studentCreated,
    });
  },

  async show(request, response) {
    const {
      params: { id },
    } = request;

    if (!id) {
      return response.status(400).json({
        message: "missing data",
      });
    }

    const student = await Student.findByPk(id);

    if (!student) {
      return response.status(404).json({
        message: "student not found",
      });
    }

    return response.json({
      student,
    });
  },

  async delete(request, response) {
    const {
      params: { id },
    } = request;

    if (!id) {
      return response.status(400).json({
        message: "missing data",
      });
    }

    const studentToDelete = await Student.findByPk(id);

    if (!studentToDelete) {
      return response.status(404).json({
        message: "student not found",
      });
    }

    await studentToDelete.destroy();

    return response.json({
      message: "student deleted",
    });
  },
  async index(request, response) {
    const students = await Student.findAll({
      attributes: ["name", "contact", "birthDate", "createdAt", "updatedAt"],
    });

    return response.json({
      students,
    });
  },

  async update(request, response) {
    const {
      params: { id },
      body: { name, contact, birthDate },
    } = request;

    if (!id) {
      return response.status(400).json({
        message: "student not found",
      });
    }

    await Student.update(
      {
        name,
        contact,
        birthDate,
      },
      {
        where: { id },
      }
    );

    return response.json({ message: "user updated" });
  },
};
