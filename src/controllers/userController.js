const shortId = require('shortid')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const personService = require("../services/userService");
const { getRolesById } = require('../services/rolePermissionsService');
const { getFilterFeatures } = require('../services/featuresService');
const { featuresWithReadWrite } = require('../helper/featuresHelper');
const { replaceReadWriteWithPermissions, extractFeaturesC, concatRolePermissions } = require('../helper/rolePermissionHelper');



const signUp = async (req, res) => {
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
}


const login = async (req, res) => {
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
    const token = jwt.sign({ systemID: user.systemID, role: user.role }, 'best_bus_bank', { expiresIn: '4h' });

    // Return the token
    return res.status(200).send({ systemID: user.systemID, token: token });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ statusCode: 500, error: "Something went wrong" });
  }
}


const getBySystemID = async (req, res) => {
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
}

const getAll = async (req, res) => {
  try {
    const people = await personService.getAll();
    res.json(people);
  } catch (error) {
    console.log(error);
    res.status(500).json({ statusCode: 500, error: "Something went wrong" });
  }
}



const updateByID = async (req, res) => {
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
}



const deleteByID = async (req, res) => {
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
}



//--------------Roles And Permissions------------------
const addRolePermissionsToUser = async (req, res) => {
  try {
    const { systemID } = req.params;
    const { roleId } = req.body;

    const exisitingPerson = await personService.findPersonBySystemID(systemID);

    if (!exisitingPerson) {
      return res
        .status(404)
        .json({ statusCode: 404, error: "User Does not exist" });
    }

    const role = await getRolesById(roleId);

    if (!role) {
      return res
        .status(404)
        .json({ statusCode: 404, error: "Role Does not exist" });
    }

    const userPermissions = await personService.updatePersonRole(systemID, roleId, role.dataValues.permissions);

    console.log(userPermissions, exisitingPerson.dataValues, role.dataValues)
    return res.status(200).send({ userPermissions })

  } catch (err) {
    console.log({ err });
    return res.status(500).json({
      success: false,
      message: `Error:${err}`
    });
  }
}


const fetchUserPermissions = async (req, res) => {
  try {
    const { systemID } = req.params;
    const { masterId } = req.body;

    const exisitingPerson = await personService.findPersonBySystemID(systemID);

    if (!exisitingPerson) {
      return res
        .status(404)
        .json({ statusCode: 404, error: "User Does not exist" });
    }
    console.log(exisitingPerson.dataValues.permissions);

    let featuresList = await getFilterFeatures({});

    featuresList = featuresList.map(item => ({
      id: item.dataValues.id,
      name: item.dataValues.name,
      description: item.dataValues.description,
      parentFeatureId: item.dataValues.parentFeatureId,
    }));

    const featuresData = featuresWithReadWrite(masterId, featuresList, level = 0);

    let permissions = replaceReadWriteWithPermissions(exisitingPerson.dataValues.permissions, featuresData);

    return res.status(200).send({ permission: permissions })

  } catch (err) {
    console.log({ err });
    return res.status(500).json({
      success: false,
      message: `Error:${err}`
    });
  }
}


const updateUserPermissions = async (req, res) => {
  try {
    const { systemID } = req.params;
    const { permissions } = req.body;

    const exisitingPerson = await personService.findPersonBySystemID(systemID);

    if (!exisitingPerson) {
      return res
        .status(404)
        .json({ statusCode: 404, error: "User Does not exist" });
    }

    let permissionsData = extractFeaturesC(permissions);

    const updatedPermissions = concatRolePermissions(exisitingPerson.dataValues, permissionsData);
    console.log(updatedPermissions);

    const updatePermissions = replaceReadWriteWithPermissions(exisitingPerson.dataValues.permissions, updatedPermissions.permissions);

    return res.status(200).send({ permission: updatePermissions })
  }
  catch (err) {
    console.log({ err });
    return res.status(500).json({
      success: false,
      message: `Error:${err}`
    })
  }
}

module.exports = {
  signUp,
  login,
  getBySystemID,
  getAll,
  updateByID,
  deleteByID,
  addRolePermissionsToUser,
  fetchUserPermissions,
  updateUserPermissions
};