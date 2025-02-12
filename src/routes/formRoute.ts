import express from "express";
import { submitForm } from "../controllers/formController";

const router = express.Router();

router.route("/submit-form").post(submitForm);

export default router;
