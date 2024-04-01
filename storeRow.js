// // CREATE PROCEDURE GenerateUniqueCode
// // AS
// // BEGIN
// //     DECLARE @NextValue INT;
// //     DECLARE @Year CHAR(2);
// //     DECLARE @Month CHAR(2);
// //     DECLARE @PaddedIncrement CHAR(6);
// //     DECLARE @UniqueCode VARCHAR(20);

// //     -- Get current year and month
// //     SET @Year = RIGHT(YEAR(GETDATE()), 2);
// //     SET @Month = FORMAT(GETDATE(), 'MM');

// //     -- Check if the current month is different from the last generated code's month
// //     DECLARE @LastGeneratedMonth CHAR(2);
// //     SELECT @LastGeneratedMonth = COALESCE(RIGHT(month, 2), '00')
// //     FROM LastGeneratedCode; -- Assuming you have a table to store the last generated code

// //     IF @Month <> @LastGeneratedMonth
// //     BEGIN
// //         -- Reset increment if it's a new month
// //         SET @NextValue = 1;
// //         UPDATE LastGeneratedCode SET month = CONCAT('0', @Month); -- Update last generated month
// //     END
// //     ELSE
// //     BEGIN
// //         -- Get next value from the sequence
// //         SELECT @NextValue = NEXT VALUE FOR UniqueCodeSequence;
// //     END

// //     -- Pad increment
// //     SET @PaddedIncrement = RIGHT('000000' + CAST(@NextValue AS VARCHAR(6)), 6);

// //     -- Construct unique code
// //     SET @UniqueCode = 'YourCode' + @Year + @Month + '-' + @PaddedIncrement;

// //     -- Return unique code
// //     SELECT @UniqueCode AS UniqueCode;
// // END;



// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('your_database', 'your_username', 'your_password', {
//   dialect: 'mssql',
//   host: 'your_server',
//   dialectOptions: {
//     options: {
//       encrypt: true, // For Azure SQL Database
//       trustServerCertificate: true // For Azure SQL Database
//     }
//   }
// });

// // Test the database connection
// async function testConnection() {
//   try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// }

// // Call the testConnection function to test the connection
// testConnection();



// const { Model, DataTypes } = require('sequelize');

// class Increment extends Model { }

// Increment.init({
//   month: {
//     type: DataTypes.STRING(2),
//     allowNull: false,
//     primaryKey: true
//   },
//   increment: {
//     type: DataTypes.INTEGER,
//     allowNull: false
//   }
// }, {
//   sequelize,
//   modelName: 'Increment',
//   tableName: 'IncrementTable',
//   timestamps: false
// });

// // Sync the model with the database (create the table if it doesn't exist)
// async function syncModel() {
//   try {
//     await Increment.sync();
//     console.log('Increment model synced with the database.');
//   } catch (error) {
//     console.error('Error syncing Increment model:', error);
//   }
// }

// // Call the syncModel function to sync the model with the database
// syncModel();


// async function generateUniqueCode() {
//   try {
//     const [result, _] = await sequelize.query('EXEC GenerateUniqueCode');
//     const uniqueCode = result[0][0].UniqueCode;
//     return uniqueCode;
//   } catch (error) {
//     console.error('Error generating unique code:', error);
//     throw error;
//   }
// }

// // Example usage
// generateUniqueCode().then(code => {
//   console.log('Generated code:', code);
// }).catch(error => {
//   console.error('Error generating code:', error);
// });







// const { Model, DataTypes } = require('sequelize');

// class SerialNumber extends Model { }

// SerialNumber.init({
//   srNo: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     primaryKey: true,
//     autoIncrement: true
//   }
// }, {
//   sequelize,
//   modelName: 'SerialNumber',
//   tableName: 'SerialNumberTable',
//   timestamps: false
// });

// // Sync the model with the database (create the table if it doesn't exist)
// async function syncModel() {
//   try {
//     await SerialNumber.sync();
//     console.log('SerialNumber model synced with the database.');
//   } catch (error) {
//     console.error('Error syncing SerialNumber model:', error);
//   }
// }

// // Call the syncModel function to sync the model with the database
// syncModel();




// async function getNextSrNo() {
//   try {
//     const lastRecord = await SerialNumber.findOne({
//       order: [['srNo', 'DESC']]
//     });
//     const nextSrNo = lastRecord ? lastRecord.srNo + 1 : 101; // Start from 101 if no records exist
//     return nextSrNo;
//   } catch (error) {
//     console.error('Error getting next SrNo:', error);
//     throw error;
//   }
// }



// async function createRecord() {
//   try {
//     const nextSrNo = await getNextSrNo();
//     await SerialNumber.create({ srNo: nextSrNo });
//     console.log('New record created with SrNo:', nextSrNo);
//   } catch (error) {
//     console.error('Error creating record:', error);
//     throw error;
//   }
// }


// // Example usage
// createRecord().then(() => {
//   console.log('Record created successfully.');
// }).catch(error => {
//   console.error('Error creating record:', error);
// });




[
  {
    "id": "18e241bced538rk18",
    "name": "Reports",
    "description": "Reports setcion access",
    "createdAt": "2024-03-09T16:46:26.005Z",
    "updatedAt": "2024-03-09T16:46:26.005Z",
    "features_A": [
      {
        "id": "18e241bf8a9c07cgq",
        "name": "Reports Viewer",
        "description": "Reports view sections",
        "createdAt": "2024-03-09T16:46:36.713Z",
        "updatedAt": "2024-03-09T16:46:36.713Z",
        "featuresMasterId": "18e241bced538rk18",
        "features_B": [
          {
            "id": "18e24285f18ndyo5j",
            "name": "Account",
            "description": "Description for Feature Account",
            "createdAt": "2024-03-09T17:00:09.368Z",
            "updatedAt": "2024-03-09T17:00:09.368Z",
            "featuresAId": "18e241bf8a9c07cgq",
            "features_C": [
              {
                "id": "18e2449de31j274w9",
                "name": "Receipt/Payment",
                "description": "Description for Feature Receipt/Payment",
                "createdAt": "2024-03-09T17:36:44.595Z",
                "updatedAt": "2024-03-09T17:36:44.595Z",
                "featuresBId": "18e24285f18ndyo5j"
              }
            ]
          },
          {
            "id": "18e24558700qcrz3w",
            "name": "Deposite",
            "description": "Description for Feature Deposite",
            "createdAt": "2024-03-09T17:49:28.704Z",
            "updatedAt": "2024-03-09T17:49:28.704Z",
            "featuresAId": "18e241bf8a9c07cgq",
            "features_C": []
          }
        ]
      }
    ]
  },
  {
    "id": "18e26c24f99hy7y83",
    "name": "Master",
    "description": "Master setcion access",
    "createdAt": "2024-03-10T05:07:32.380Z",
    "updatedAt": "2024-03-10T05:07:32.380Z",
    "features_A": [
      {
        "id": "18e26c33f7508pwx3",
        "name": "Master Data Entery",
        "description": "Data Entery view sections",
        "createdAt": "2024-03-10T05:08:33.781Z",
        "updatedAt": "2024-03-10T05:08:33.781Z",
        "featuresMasterId": "18e26c24f99hy7y83",
        "features_B": [
          {
            "id": "18e26c3facdbx2e0f",
            "name": "Account",
            "description": "Description for Feature Account",
            "createdAt": "2024-03-10T05:09:21.741Z",
            "updatedAt": "2024-03-10T05:09:21.741Z",
            "featuresAId": "18e26c33f7508pwx3",
            "features_C": [
              {
                "id": "18e46be18a3uoz9gv",
                "name": "Group Creation",
                "description": "Group Creation",
                "createdAt": "2024-03-16T10:10:47.076Z",
                "updatedAt": "2024-03-16T10:10:47.076Z",
                "featuresBId": "18e26c3facdbx2e0f"
              },
              {
                "id": "18e46be9500fecif3",
                "name": "Ledger Creation",
                "description": "Ledger Creation",
                "createdAt": "2024-03-16T10:11:18.912Z",
                "updatedAt": "2024-03-16T10:11:18.912Z",
                "featuresBId": "18e26c3facdbx2e0f"
              },
              {
                "id": "18e46bece08b01fp4",
                "name": "Bank Creation",
                "description": "Bank Creation",
                "createdAt": "2024-03-16T10:11:33.512Z",
                "updatedAt": "2024-03-16T10:11:33.512Z",
                "featuresBId": "18e26c3facdbx2e0f"
              },
              {
                "id": "18e46bf0256it0hqm",
                "name": "Branch Creation",
                "description": "Branch Creation",
                "createdAt": "2024-03-16T10:11:46.902Z",
                "updatedAt": "2024-03-16T10:11:46.902Z",
                "featuresBId": "18e26c3facdbx2e0f"
              },
              {
                "id": "18e46bf6035yg5e0f",
                "name": "Department Creation",
                "description": "Department Creation",
                "createdAt": "2024-03-16T10:12:10.933Z",
                "updatedAt": "2024-03-16T10:12:10.933Z",
                "featuresBId": "18e26c3facdbx2e0f"
              }
            ]
          },
          {
            "id": "18e46c434b6xje8nc",
            "name": "Master",
            "description": "Master",
            "createdAt": "2024-03-16T10:17:27.478Z",
            "updatedAt": "2024-03-16T10:17:27.478Z",
            "featuresAId": "18e26c33f7508pwx3",
            "features_C": []
          },
          {
            "id": "18e46c3b59fehrbd0",
            "name": "SMS",
            "description": "SMS",
            "createdAt": "2024-03-16T10:16:54.943Z",
            "updatedAt": "2024-03-16T10:16:54.943Z",
            "featuresAId": "18e26c33f7508pwx3",
            "features_C": []
          },
          {
            "id": "18e46c4af77zbodrm",
            "name": "Yearend",
            "description": "Yearend",
            "createdAt": "2024-03-16T10:17:58.903Z",
            "updatedAt": "2024-03-16T10:17:58.903Z",
            "featuresAId": "18e26c33f7508pwx3",
            "features_C": []
          },
          {
            "id": "18e46c4607bk512n3",
            "name": "Import",
            "description": "Import",
            "createdAt": "2024-03-16T10:17:38.683Z",
            "updatedAt": "2024-03-16T10:17:38.683Z",
            "featuresAId": "18e26c33f7508pwx3",
            "features_C": []
          },
          {
            "id": "18e46c406c6cggm6i",
            "name": "Security",
            "description": "Security",
            "createdAt": "2024-03-16T10:17:15.718Z",
            "updatedAt": "2024-03-16T10:17:15.718Z",
            "featuresAId": "18e26c33f7508pwx3",
            "features_C": []
          },
          {
            "id": "18e46c37dc3hlua30",
            "name": "Inward/Outward",
            "description": "Inward/Outward",
            "createdAt": "2024-03-16T10:16:40.643Z",
            "updatedAt": "2024-03-16T10:16:40.643Z",
            "featuresAId": "18e26c33f7508pwx3",
            "features_C": []
          },
          {
            "id": "18e46c0fabafojx1p",
            "name": "SetUp",
            "description": "SetUp",
            "createdAt": "2024-03-16T10:13:56.026Z",
            "updatedAt": "2024-03-16T10:13:56.026Z",
            "featuresAId": "18e26c33f7508pwx3",
            "features_C": []
          }
        ]
      },
      {
        "id": "18e26c6a0ebzukgpr",
        "name": "Member Registration",
        "description": "Data Entery view sections",
        "createdAt": "2024-03-10T05:12:15.340Z",
        "updatedAt": "2024-03-10T05:12:15.340Z",
        "featuresMasterId": "18e26c24f99hy7y83",
        "features_B": []
      },
      {
        "id": "18e26c6d3d092icwe",
        "name": "Member Query",
        "description": "Data Entery view sections",
        "createdAt": "2024-03-10T05:12:28.368Z",
        "updatedAt": "2024-03-10T05:12:28.368Z",
        "featuresMasterId": "18e26c24f99hy7y83",
        "features_B": []
      }
    ]
  },
  {
    "id": "18e46408884q4ydok",
    "name": "Admin",
    "description": "Feature Admin",
    "createdAt": "2024-03-16T07:53:38.181Z",
    "updatedAt": "2024-03-16T07:53:38.181Z",
    "features_A": [
      {
        "id": "18e464bcab66popg9",
        "name": "Roles",
        "description": "Roles",
        "createdAt": "2024-03-16T08:05:56.022Z",
        "updatedAt": "2024-03-16T08:05:56.022Z",
        "featuresMasterId": "18e46408884q4ydok",
        "features_B": []
      },
      {
        "id": "18e4647210fzsw49o",
        "name": "Administration",
        "description": "Administration",
        "createdAt": "2024-03-16T08:00:50.447Z",
        "updatedAt": "2024-03-16T08:00:50.447Z",
        "featuresMasterId": "18e46408884q4ydok",
        "features_B": []
      }
    ]
  },
  {
    "id": "18e46419838oj0hpo",
    "name": "Fixed Deposite",
    "description": "Feature Fixed Deposite",
    "createdAt": "2024-03-16T07:54:47.736Z",
    "updatedAt": "2024-03-16T07:54:47.736Z",
    "features_A": []
  },
  {
    "id": "18e4643b2f0q0jcrz",
    "name": "Document Management",
    "description": "Feature Document Management",
    "createdAt": "2024-03-16T07:57:05.648Z",
    "updatedAt": "2024-03-16T07:57:05.648Z",
    "features_A": []
  },
  {
    "id": "18e464105d5jw96gk",
    "name": "Account",
    "description": "Feature Account",
    "createdAt": "2024-03-16T07:54:10.261Z",
    "updatedAt": "2024-03-16T07:54:10.261Z",
    "features_A": []
  },
  {
    "id": "18e4641eacbvhdh17",
    "name": "Recovery",
    "description": "Feature Recovery",
    "createdAt": "2024-03-16T07:55:08.875Z",
    "updatedAt": "2024-03-16T07:55:08.875Z",
    "features_A": []
  },
  {
    "id": "18e464142f8sr9soi",
    "name": "Loan",
    "description": "Feature Loan",
    "createdAt": "2024-03-16T07:54:25.912Z",
    "updatedAt": "2024-03-16T07:54:25.912Z",
    "features_A": []
  },
  {
    "id": "18e46431e6dgotf1c",
    "name": "Share Certificate and Dividend",
    "description": "Feature Share Certificate and Dividend",
    "createdAt": "2024-03-16T07:56:27.629Z",
    "updatedAt": "2024-03-16T07:56:27.629Z",
    "features_A": []
  },
  {
    "id": "18e464420d71vsjg3",
    "name": "Other",
    "description": "Feature Other",
    "createdAt": "2024-03-16T07:57:33.783Z",
    "updatedAt": "2024-03-16T07:57:33.783Z",
    "features_A": []
  }
]



// Feartures_B
[
  {
    "name": "Account-2",
    "description": "Account-2",
    "featuresAId": "18e66eda80cvjnz9x"
  },
  {
    "name": "Setup-2",
    "description": "Setup-2",
    "featuresAId": "18e66eda80cvjnz9x"
  },
  {
    "name": "Inward/Outward-2",
    "description": "Inward/Outward-2",
    "featuresAId": "18e66eda80cvjnz9x"
  },
  {
    "name": "SMS-2",
    "description": "SMS-2",
    "featuresAId": "18e66eda80cvjnz9x"
  },
  {
    "name": "Security-2",
    "description": "Security-2",
    "featuresAId": "18e66eda80cvjnz9x"
  },
  {
    "name": "Master-2",
    "description": "Master-2",
    "featuresAId": "18e66eda80cvjnz9x"
  },
  {
    "name": "Import-2",
    "description": "Import-2",
    "featuresAId": "18e66eda80cvjnz9x"
  },
  {
    "name": "YearEnd-2",
    "description": "YearEnd-2",
    "featuresAId": "18e66eda80cvjnz9x"
  }
]



// Feartures_C
[
  {
    "name": "Group Creation-3",
    "description": "Group Creation-3",
    "featuresBId": "18e6721b9ff08erky"
  },
  {
    "name": "Ledger Creation-3",
    "description": "Ledger Creation-3",
    "featuresBId": "18e6721b9ff08erky"
  },
  {
    "name": "Bank Creation-3",
    "description": "Bank Creation-3",
    "featuresBId": "18e6721b9ff08erky"
  },
  {
    "name": "Branch Creation-3",
    "description": "Branch Creation-3",
    "featuresBId": "18e6721b9ff08erky"
  },
  {
    "name": "Department Creation-3",
    "description": "Department Creation-3",
    "featuresBId": "18e6721b9ff08erky"
  }
]


async function updatePermissions(dataForUpdate) {
  try {
    const { id, read, write, features_master, a_permission } = dataForUpdate;

    // Update features_master_permission
    await FeaturesMasterPermission.update({ read, write }, { where: { id } });

    // Loop through a_permission and update features_A_permission, features_B_permission, and features_C_permission
    for (const permission of a_permission) {
      const { id: a_id, read: a_read, write: a_write, features_A, b_permission } = permission;

      // Update features_A_permission
      let featuresAPermission = await FeaturesAPermission.findOne({
        where: { id: a_id }
      });
      if (!featuresAPermission) {
        throw new Error(`Feature A permission with ID ${a_id} not found.`);
      }
      await featuresAPermission.update({ read: a_read, write: a_write });

      // Loop through b_permission and update features_B_permission and features_C_permission
      for (const bPermission of b_permission) {
        const { id: b_id, read: b_read, write: b_write, features_B, c_permission } = bPermission;

        // Update features_B_permission
        let featuresBPermission = await FeaturesBPermission.findOne({
          where: { id: b_id }
        });
        if (!featuresBPermission) {
          throw new Error(`Feature B permission with ID ${b_id} not found.`);
        }
        await featuresBPermission.update({ read: b_read, write: b_write });

        // Loop through c_permission and update features_C_permission
        for (const cPermission of c_permission) {
          const { id: c_id, read: c_read, write: c_write, features_C } = cPermission;

          // Update features_C_permission
          let featuresCPermission = await FeaturesCPermission.findOne({
            where: { id: c_id }
          });
          if (!featuresCPermission) {
            throw new Error(`Feature C permission with ID ${c_id} not found.`);
          }
          await featuresCPermission.update({ read: c_read, write: c_write });
        }
      }
    }

    console.log('Permissions updated successfully');
  } catch (error) {
    console.error('Error updating permissions:', error);
    throw error;
  }
}

