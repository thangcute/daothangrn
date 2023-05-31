const { reject } = require("lodash");
const db = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

let createClinic = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.imageBase64 ||
        !data.address ||
        !data.descriptionHTML ||
        !data.descriptionMarkdown
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter!",
        });
      } else {
        await db.Clinic.create({
          name: data.name,
          image: data.imageBase64,
          address: data.address,
          descriptionMarkdown: data.descriptionMarkdown,
          descriptionHTML: data.descriptionHTML,
        });
        resolve({
          errCode: 0,
          errMessage: "OK!",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let getAllClinic = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = "";
      if (id === "ALL") {
        data = await db.Clinic.findAll();
        if (data && data.length > 0) {
          data.map((item) => {
            item.image = new Buffer.from(item.image, "base64").toString(
              "binary"
            );
            return item;
          });
        }
      }

      if (id && id !== "ALL") {
        data = await db.Clinic.findOne({
          where: { id: id },
        });
        if (data && data.length > 0) {
          data.map((item) => {
            item.image = new Buffer.from(item.image, "base64").toString(
              "binary"
            );
            return item;
          });
        }
      }

      resolve({
        errMessage: "OK",
        errCode: 0,
        data,
      });
    } catch (error) {
      reject(error);
    }
  });
};

let updateClinicData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.imageBase64 ||
        !data.address ||
        !data.descriptionHTML ||
        !data.descriptionMarkdown
      ) {
        resolve({
          errCode: 2,
          errMessage: "Missing requied parameters!",
        });
      }
      let clinic = await db.Clinic.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (clinic) {
        clinic.name = data.name;
        clinic.descriptionHTML = data.descriptionHTML;
        clinic.descriptionMarkdown = data.descriptionMarkdown;
        clinic.image = data.imageBase64;
        clinic.address = data.address;

        await clinic.save();
        // await db.User.save({
        //   firstName: data.firstName,
        //   lastName: data.lastName,
        //   address: data.address,
        // });
        resolve({
          errCode: 0,
          message: "Update the clinic succeed!",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: `clinic's not found!`,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let deleteClinic = (id) => {
  return new Promise(async (resolve, reject) => {
    let clinic = await db.Clinic.findOne({
      where: { id: id },
    });
    if (!clinic) {
      resolve({
        errCode: 2,
        errMessage: `The clinic isn't exist`,
      });
    }
    await db.Clinic.destroy({
      where: { id: id },
    });

    resolve({
      errCode: 0,
      message: "The clinic is deleted",
    });
  });
};
let getDetailClinicById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter!",
        });
      } else {
        let data = await db.Clinic.findOne({
          where: {
            id: inputId,
          },
          attributes: [
            "name",
            "image",
            "address",
            "descriptionHTML",
            "descriptionMarkdown",
          ],
        });
        if (data) {
          let doctorClinic = [];

          doctorClinic = await db.Doctor_Info.findAll({
            where: { clinicId: inputId },
            attributes: ["doctorId", "provinceId"],
          });

          data.doctorClinic = doctorClinic;
        } else data = {};
        resolve({
          errMessage: "OK",
          errCode: 0,
          data,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let getClinicByName = (name) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!name) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter!",
        });
      } else {
        let data = await db.Clinic.findAll({
          where: {
            name: {
              [Op.like]: `%${name}%`,
            },
          },
        });

        resolve({
          errMessage: "OK",
          errCode: 0,
          data: data,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createClinic: createClinic,
  getAllClinic: getAllClinic,
  updateClinicData: updateClinicData,
  deleteClinic: deleteClinic,
  getDetailClinicById: getDetailClinicById,
  getClinicByName: getClinicByName,
};
