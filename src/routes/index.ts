import { Router } from "express";
import {
    deleteLoremById,
    getAllLorem,
    getLoremById,
    getLoremByName,
    updateLoremById,
    createLorem
} from '../controller'

const router = Router();

router.get("/", (req, res) => {
  res.json("Hello world");
});
router.post('/person', createLorem);
router.get('/person', getAllLorem);
router.get('/person/id/:id', getLoremById);
router.get('/person/name/:name', getLoremByName);
router.put('/person', updateLoremById)
router.delete('/person/:id', deleteLoremById)

export default router;
