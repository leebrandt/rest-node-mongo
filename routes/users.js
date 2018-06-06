const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send([{ id: 1, name: 'user one' }, { id: 2, name: 'user two' }]);
});

export default router;
