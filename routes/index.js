var express = require('express');
var router = express.Router();

const Customer = require('../models/Customer');

router.get('/', (req, res, next) => {
  res.sendStatus(200);
});

router.get('/customer/:code', async (req, res) => {
  const customer = await Customer.findOne({ code: req.params.code });
  res.send(customer);
});

router.post('/customer/:code/add-points', async (req, res) => {
  const customer = await Customer.findOne({ code: req.params.code });
  console.log(customer);
  console.log(req.body.points);
  customer.points += req.body.points;
  await customer.save();
  res.send(customer);
});

router.post('/create-customer', async (req, res) => {
  const customer = await Customer.create({ ...req.body, points: 0 });
  // const customer = await Customer.create({ name: 'Lyso Form', code: '8004450000117', points: 0});
  res.send(customer);
});

module.exports = router;
