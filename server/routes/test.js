const express = require("express");
const router = express.Router();

const PhoneModel = require("../models/Phone");

router.get("/", (req, res) => {
  res.send("This is to test the router");
});

// get phone details from DB
router.get("/phone", async (req, res) => {
  try {
    const data = await PhoneModel.find();
    res.json(data);
  } catch (err) {
    res.json({ message: err });
  }
});

// specific phone
router.get("/phone/:id", async (req, res) => {
  try {
    const data = await PhoneModel.findById(req.params.id);
    res.json(data);
  } catch (err) {
    res.json({ message: err });
  }
});

// delete phone
router.delete("/phone/:id", async (req, res) => {
  try {
    await PhoneModel.remove({ _id: req.params.id });
    res.status(200).send({message: "Deleted successfully"}); 
  } catch (err) {
    res.json({ message: err });
  }
});

// update phone details
router.patch("/phone/:id", async (req, res) => {
  try {
    await PhoneModel.updateOne(
      { _id: req.params.id },
      { $set: { title: req.body.title } }
    );
    res.status(200).send({message: "Updated successfully"}); 
  } catch (err) {
    res.json({ message: err });
  }
});

// post phone details to DB
router.post("/phone", async (req, res) => {
  const phone = new PhoneModel({
    title: req.body.title,
    name: req.body.name,
    description: req.body.description
  });

  try {
    await phone.save();
    res.status(200).send({message: "Added successfully"}); 
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
