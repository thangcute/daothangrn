const db = require("../models");

let createSpecialty = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.imageBase64 ||
        !data.descriptionHTML ||
        !data.descriptionMarkdown
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter!",
        });
      } else {
        await db.Specialty.create({
          name: data.name,
          image: data.imageBase64,
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
let getAllSpecialty = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = "";
      if (id === "ALL") {
        data = await db.Specialty.findAll();
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
        data = await db.Specialty.findOne({
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
let updateSpecialtyData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.descriptionHTML ||
        !data.descriptionMarkdown ||
        !data.imageBase64
      ) {
        resolve({
          errCode: 2,
          errMessage: "Missing requied parameters!",
        });
      }
      let specialty = await db.Specialty.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (specialty) {
        specialty.name = data.name;
        specialty.descriptionHTML = data.descriptionHTML;
        specialty.descriptionMarkdown = data.descriptionMarkdown;
        specialty.image = data.imageBase64;

        await specialty.save();
        // await db.User.save({
        //   firstName: data.firstName,
        //   lastName: data.lastName,
        //   address: data.address,
        // });
        resolve({
          errCode: 0,
          message: "Update the specialty succeed!",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: `specialty's not found!`,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let deleteSpecialty = (id) => {
  return new Promise(async (resolve, reject) => {
    let specialty = await db.Specialty.findOne({
      where: { id: id },
    });
    if (!specialty) {
      resolve({
        errCode: 2,
        errMessage: `The specialty isn't exist`,
      });
    }
    await db.Specialty.destroy({
      where: { id: id },
    });

    resolve({
      errCode: 0,
      message: "The specialty is deleted",
    });
  });
};

module.exports = {
  createSpecialty: createSpecialty,
  getAllSpecialty: getAllSpecialty,
  updateSpecialtyData: updateSpecialtyData,
  deleteSpecialty: deleteSpecialty,
};
