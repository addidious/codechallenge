const router = require('express').Router();
const inventoryController = require('../controllers/inventory.controller');

router.get('/', inventoryController.getAll);

router.get('/:_id', inventoryController.getOne);

router.post('/',inventoryController.createOne);

router.patch('/:_id',inventoryController.updateOne);

module.exports = router;