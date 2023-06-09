import express from "express";
import homeController from "../controller/homeController";
import userController from "../controller/userController";
import doctorController from "../controller/doctorController";
import patientController from "../controller/patientController";
import specialtyController from "../controller/specialtyController";
import clinicController from "../controller/clinicController";
let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/about", homeController.getAboutPage);
  router.get("/crud", homeController.getCRUD);
  router.post("/post-crud", homeController.postCRUD);
  router.get("/get-crud", homeController.displayCRUD);
  router.get("/edit-crud", homeController.getEditCRUD);
  router.post("/put-crud", homeController.putCRUD);
  router.get("/delete-crud", homeController.deleteCRUD);

  router.post("/api/login", userController.handleLogin);
  router.get("/api/get-all-users", userController.handleGetAllUsers);
  router.post("/api/create-new-user", userController.handleCreateNewUser);
  router.put("/api/edit-user", userController.handleEditUsers);
  router.delete("/api/delete-user", userController.handleDeleteUser);
  router.get("/api/allcode", userController.getAllCode);

  router.get("/api/top-doctor-home", doctorController.getTopDoctorHome);
  router.get("/api/get-all-doctors", doctorController.getAllDoctors);
  router.post("/api/save-info-doctors", doctorController.postInfoDoctor);
  router.get(
    "/api/get-detail-doctor-by-id",
    doctorController.getDetailDoctorById
  );
  router.get(
    "/api/get-schedule-doctor-by-date",
    doctorController.getScheduleByDate
  );
  router.post("/api/bulk-create-schedule", doctorController.bulkCreateSchedule);
  router.get(
    "/api/get-extra-info-doctor-by-id",
    doctorController.getExtraInfoDoctorById
  );
  router.get(
    "/api/get-profile-doctor-by-id",
    doctorController.getProfileDoctorById
  );
  router.post("/api/send-remedy", doctorController.sendRemedy);

  router.post(
    "/api/patient-book-appointment",
    patientController.postBookAppointment
  );
  router.post(
    "/api/verify-book-appointment",
    patientController.postVerifyBookAppointment
  );
  router.post("/api/create-new-specialty", specialtyController.createSpecialty);
  router.get(
    "/api/get-all-specialties",
    specialtyController.handleGetAllSpecialty
  );
  router.put("/api/edit-specialty", specialtyController.handleEditSpecialty);
  router.delete(
    "/api/delete-specialty",
    specialtyController.handleDeleteSpecialty
  );
  router.get(
    "/api/get-detail-specialty-by-id",
    specialtyController.getDetailSpecialtyById
  );

  router.post("/api/create-new-clinic", clinicController.createClinic);
  router.get("/api/get-all-clinic", clinicController.handleGetAllClinic);
  router.put("/api/edit-clinic", clinicController.handleEditClinic);
  router.delete("/api/delete-clinic", clinicController.handleDeleteClinic);
  router.get(
    "/api/get-detail-clinic-by-id",
    clinicController.getDetailClinicById
  );

  router.get(
    "/api/get-list-patient-for-doctor",
    doctorController.getListPatientForDoctor
  );
  router.get("/api/get-clinic-by-name", clinicController.getClinicByName);

  //rest api

  return app.use("/", router);
};

module.exports = initWebRoutes;
