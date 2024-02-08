// CREATE PROCEDURE GenerateUniqueCode
// AS
// BEGIN
//     DECLARE @NextValue INT;
//     DECLARE @Year CHAR(2);
//     DECLARE @Month CHAR(2);
//     DECLARE @PaddedIncrement CHAR(6);
//     DECLARE @UniqueCode VARCHAR(20);

//     -- Get current year and month
//     SET @Year = RIGHT(YEAR(GETDATE()), 2);
//     SET @Month = FORMAT(GETDATE(), 'MM');

//     -- Check if the current month is different from the last generated code's month
//     DECLARE @LastGeneratedMonth CHAR(2);
//     SELECT @LastGeneratedMonth = COALESCE(RIGHT(month, 2), '00')
//     FROM LastGeneratedCode; -- Assuming you have a table to store the last generated code

//     IF @Month <> @LastGeneratedMonth
//     BEGIN
//         -- Reset increment if it's a new month
//         SET @NextValue = 1;
//         UPDATE LastGeneratedCode SET month = CONCAT('0', @Month); -- Update last generated month
//     END
//     ELSE
//     BEGIN
//         -- Get next value from the sequence
//         SELECT @NextValue = NEXT VALUE FOR UniqueCodeSequence;
//     END

//     -- Pad increment
//     SET @PaddedIncrement = RIGHT('000000' + CAST(@NextValue AS VARCHAR(6)), 6);

//     -- Construct unique code
//     SET @UniqueCode = 'YourCode' + @Year + @Month + '-' + @PaddedIncrement;

//     -- Return unique code
//     SELECT @UniqueCode AS UniqueCode;
// END;



const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('your_database', 'your_username', 'your_password', {
  dialect: 'mssql',
  host: 'your_server',
  dialectOptions: {
    options: {
      encrypt: true, // For Azure SQL Database
      trustServerCertificate: true // For Azure SQL Database
    }
  }
});

// Test the database connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

// Call the testConnection function to test the connection
testConnection();



const { Model, DataTypes } = require('sequelize');

class Increment extends Model { }

Increment.init({
  month: {
    type: DataTypes.STRING(2),
    allowNull: false,
    primaryKey: true
  },
  increment: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Increment',
  tableName: 'IncrementTable',
  timestamps: false
});

// Sync the model with the database (create the table if it doesn't exist)
async function syncModel() {
  try {
    await Increment.sync();
    console.log('Increment model synced with the database.');
  } catch (error) {
    console.error('Error syncing Increment model:', error);
  }
}

// Call the syncModel function to sync the model with the database
syncModel();


async function generateUniqueCode() {
  try {
    const [result, _] = await sequelize.query('EXEC GenerateUniqueCode');
    const uniqueCode = result[0][0].UniqueCode;
    return uniqueCode;
  } catch (error) {
    console.error('Error generating unique code:', error);
    throw error;
  }
}

// Example usage
generateUniqueCode().then(code => {
  console.log('Generated code:', code);
}).catch(error => {
  console.error('Error generating code:', error);
});







const { Model, DataTypes } = require('sequelize');

class SerialNumber extends Model { }

SerialNumber.init({
  srNo: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  }
}, {
  sequelize,
  modelName: 'SerialNumber',
  tableName: 'SerialNumberTable',
  timestamps: false
});

// Sync the model with the database (create the table if it doesn't exist)
async function syncModel() {
  try {
    await SerialNumber.sync();
    console.log('SerialNumber model synced with the database.');
  } catch (error) {
    console.error('Error syncing SerialNumber model:', error);
  }
}

// Call the syncModel function to sync the model with the database
syncModel();




async function getNextSrNo() {
  try {
    const lastRecord = await SerialNumber.findOne({
      order: [['srNo', 'DESC']]
    });
    const nextSrNo = lastRecord ? lastRecord.srNo + 1 : 101; // Start from 101 if no records exist
    return nextSrNo;
  } catch (error) {
    console.error('Error getting next SrNo:', error);
    throw error;
  }
}



async function createRecord() {
  try {
    const nextSrNo = await getNextSrNo();
    await SerialNumber.create({ srNo: nextSrNo });
    console.log('New record created with SrNo:', nextSrNo);
  } catch (error) {
    console.error('Error creating record:', error);
    throw error;
  }
}


// Example usage
createRecord().then(() => {
  console.log('Record created successfully.');
}).catch(error => {
  console.error('Error creating record:', error);
});




