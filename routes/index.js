import { Router } from "express";
import config from '../config';
const router = Router();

/* GET index resource */
router.get('/', (req, res, next) => {
  let apiDetails = config.apiDetails;
  apiDetails.links.map(link => link.href = `${req.protocol}://${req.get('host')}/${link.rel.toLowerCase()}`);
  res.status(200).send(apiDetails);
});

export default router;
