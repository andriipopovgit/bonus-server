var express = require('express');
var router = express.Router();

const Customer = require('../models/Customer');

router.get('/', (req, res, next) => {
  res.sendStatus(200);
});

router.get('/customer/:code', async (req, res) => {
  const customer = await Customer.findOne({ code: req.params.code });
  if (!customer) res.send({});
  else res.send(customer);
});

router.post('/customer/:code/add-points', async (req, res) => {
  const customer = await Customer.findOne({ code: req.params.code });
  if (customer) {
    customer.points += req.body.points;
    await customer.save();
    res.send(customer);
  } else {
    res.send({});
  }
});

router.post('/create-customer', async (req, res) => {
  // console.log(req.body);
  const customer = await Customer.create({ ...req.body, points: 0 });
  // const customer = await Customer.create({ name: 'Wonderland woods', code: '667548099141', points: 0});
  res.send(customer);
});

module.exports = router;
