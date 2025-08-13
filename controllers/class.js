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
    // pegar o classId do request.params
    const {
      params: { id },
    } = request;

    // verificar se o classId foi enviado

    console.log(id);

    if (!id) {
      return response.status(400).json({
        message: "missing data",
      });
    }

    // buscar a class usando o model de class com o metodo findByPk

    const classData = await Class.findByPk(id);

    //se n tiver class retornar bad request

    if (!classData) {
      return response.status(400).json({
        message: "class not found",
      });
    }

    //sucesso só retornar a class encontrada

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
      return response.status(400).json({
        message: "class not found",
      });
    }

    await classToDelete.destroy();

    return response.json({
      message: "class deleted",
    });
  },
  async index(request, response) {
    const classes = await Class.findAll({
      attributes: ["name", "shift", "age", "createdAt", "updatedAt"],
    });

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
