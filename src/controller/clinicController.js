import clinicService from "../services/clinicService";
let createClinic = async (req, res) => {
  try {
    let info = await clinicService.createClinic(req.body);
    return res.status(200).json(info);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};
let handleGetAllClinic = async (req, res) => {
  try {
    let id = req.query.id;
    let clinics = await clinicService.getAllClinic(id);

    return res.status(200).json({
      clinics,
    });
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "error",
    });
  }
};
let handleEditClinic = async (req, res) => {
  try {
    let data = req.body;
    let message = await clinicService.updateClinicData(data);
    return res.status(200).json(message);
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "error",
    });
  }
};
let handleDeleteClinic = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters!",
    });
  }
  let message = await clinicService.deleteClinic(req.body.id);
  console.log(message);
  return res.status(200).json(message);
};
let getDetailClinicById = async (req, res) => {
  try {
    let id = req.query.id;

    let clinics = await clinicService.getDetailClinicById(id);

    return res.status(200).json({
      clinics,
    });
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "error",
    });
  }
};
let getClinicByName = async (req, res) => {
  try {
    let name = req.query.name;

    let clinics = await clinicService.getClinicByName(name);

    return res.status(200).json({
      clinics,
    });
  } catch (error) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "error",
    });
  }
};
module.exports = {
  createClinic: createClinic,
  handleGetAllClinic: handleGetAllClinic,
  handleEditClinic: handleEditClinic,
  handleDeleteClinic: handleDeleteClinic,
  getDetailClinicById: getDetailClinicById,
  getClinicByName: getClinicByName,
};
