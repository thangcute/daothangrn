import specialtyService from "../services/specialtyService";
let createSpecialty = async (req, res) => {
  try {
    let info = await specialtyService.createSpecialty(req.body);
    return res.status(200).json(info);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};
let handleGetAllSpecialty = async (req, res) => {
  try {
    let id = req.query.id;
    let specialties = await specialtyService.getAllSpecialty(id);

    return res.status(200).json({
      specialties,
    });
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "error",
    });
  }
};
let handleEditSpecialty = async (req, res) => {
  try {
    let data = req.body;
    let message = await specialtyService.updateSpecialtyData(data);
    return res.status(200).json(message);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "error",
    });
  }
};
let handleDeleteSpecialty = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters!",
    });
  }
  let message = await specialtyService.deleteSpecialty(req.body.id);
  console.log(message);
  return res.status(200).json(message);
};

module.exports = {
  createSpecialty: createSpecialty,
  handleGetAllSpecialty: handleGetAllSpecialty,
  handleEditSpecialty: handleEditSpecialty,
  handleDeleteSpecialty: handleDeleteSpecialty,
};
