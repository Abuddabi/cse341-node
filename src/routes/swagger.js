const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
let swaggerDocument = require('../config/swagger/output.json');

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDocument));

module.exports = router;