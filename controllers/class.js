const { Class } = require("../models");

module.exports = {
  async store(request, response) {
    const {
      body: { name, shift, age },
    } = request;

    const classExist = await Class.findOne({
      where: {
        name,
      },
    });

    if (classExist) {
      return response.status(400).json({
        message: "class already exists",
      });
    }

    const classCreated = await Class.create({
      name,
      shift,
      age,
    });

    return response.json({
      classCreated,
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

    const classData = await Class.findByPk(id);

    if (!classData) {
      return response.status(404).json({
        message: "class not found",
      });
    }

    return response.json({
      class: classData,
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

    const classToDelete = await Class.findByPk(id);

    if (!classToDelete) {
      return response.status(404).json({
        message: "class not found",
      });
    }

    await classToDelete.destroy();

    return response.json({
      message: "class deleted",
    });
  },
  async index(request, response) {
    const classes = await Class.findAll();

    return response.json({
      classes,
    });
  },
  async update(request, response) {
    const {
      params: { id },
      body: { name, shift, age },
    } = request;

    if (!id) {
      return response.status(400).json({
        message: "missing data",
      });
    }

    const classToUpdate = await Class.findByPk(id);

    if (!classToUpdate) {
      return response.status(404).json({
        message: "class not found",
      });
    }

    await Class.update(
      {
        name,
        shift,
        age,
      },
      {
        where: { id },
      }
    );

    return response.json({ message: "class updated" });
  },
};
