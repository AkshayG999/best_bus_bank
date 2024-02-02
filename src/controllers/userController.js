const express = require("express");
const router = express.Router();
const shortId = require('shortid')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const personService = require("../services/userService");



router.post("/sign-up", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);

    // Unique ID
    const systemID = shortId.generate().toUpperCase();
    console.log(systemID);

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const createdPerson = await personService.createPerson({ name, email, password: hashedPassword, systemID });
    return res.status(201).json(createdPerson);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ statusCode: 500, error: "Something went wrong" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await personService.findPersonByEmail(email);

    if (!user) {
      return res.status(404).json({ statusCode: 404, error: "Invalid email Id" });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ statusCode: 401, error: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign({ systemID: user.systemID }, 'best_bus_bank', { expiresIn: '4h' });

    // Return the token
    return res.status(200).send({ systemId: user.systemID, token: token });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ statusCode: 500, error: "Something went wrong" });
  }
});

router.get("/:systemID", async (req, res) => {
  try {
    const person = await personService.findPersonBySystemID(req.params.systemID);
    if (!person) {
      return res
        .status(404)
        .json({ statusCode: 404, error: "Person Does not exist" });
    }
    return res.json(person);
  } catch (error) {
    return res
      .statusCode(500)
      .json({ statusCode: 500, error: "Something went wrong" });
  }
});

router.get("/", async (req, res) => {
  try {
    const people = await personService.getAll();
    res.json(people);
  } catch (error) {
    console.log(error);
    res.status(500).json({ statusCode: 500, error: "Something went wrong" });
  }
});



router.put("/:id", async (req, res) => {
  try {
    const exisitingPerson = await personService.findPersonBySystemID(req.params.id);
    console.log(exisitingPerson);
    if (!exisitingPerson) {
      return res
        .status(404)
        .json({ statusCode: 404, error: "Person Does not exist" });
    }
    const updatedPerson = await personService.updatePerson(req.body);
    return res.json(updatedPerson);
  } catch (error) {
    return res
      .statusCode(500)
      .json({ statusCode: 500, error: "Something went wrong" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const exisitingPerson = await personService.findPersonBySystemID(req.params.id);
    if (!exisitingPerson) {
      return res
        .status(404)
        .json({ statusCode: 404, error: "Person Does not exist" });
    }

    await personService.deletePerson(req.params.id);
    return res.json({
      statusCode: 200,
      message: `person with id: ${req.params.id} is deleted successfully`,
    });
  } catch (error) {
    return res
      .statusCode(500)
      .json({ statusCode: 500, error: "Something went wrong" });
  }
});

module.exports = router;