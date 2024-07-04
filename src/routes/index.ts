import { Router } from "express";
import {
    deleteLoremById,
    getAllLorem,
    getLoremById,
    getLoremByName,
    updateLoremById
} from '../controller'

const router = Router();

router.get("/", (req, res) => {
  res.json("Hello world");
});
router.get('/person', getAllLorem);
router.get('/person/id/:id', getLoremById);
router.get('/person/name/:name', getLoremByName);
router.put('/person', updateLoremById)
router.delete('/person/:id', deleteLoremById)

export default router;
