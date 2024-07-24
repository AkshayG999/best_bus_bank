'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Step 1: Clean the data by removing non-numeric values and convert to integers
        await queryInterface.sequelize.query(`
            UPDATE member_information
            SET "DeptSrNo" = NULL
            WHERE "DeptSrNo" = 'NULL' OR "DeptSrNo" = '-1' OR "DeptSrNo" !~ '^\\d+$';
            
            UPDATE member_information
            SET "DeptSrNo" = CAST("DeptSrNo" AS INTEGER)
            WHERE "DeptSrNo" ~ '^\\d+$';
        `);

        // Step 2: Change the column type to INTEGER
        await queryInterface.changeColumn('member_information', 'DeptSrNo', {
            type: Sequelize.INTEGER,
            allowNull: true
        });

        // Step 3: Optionally add foreign key constraint if needed
        // await queryInterface.addConstraint('member_information', {
        //     fields: ['DeptSrNo'],
        //     type: 'foreign key',
        //     name: 'member_information_dept_srno_fk',
        //     references: {
        //         table: 'department',
        //         field: 'DeptSrNo'
        //     },
        //     onDelete: 'SET NULL',
        //     onUpdate: 'CASCADE'
        // });
    },

    down: async (queryInterface, Sequelize) => {
        // Step 4: Revert the column type back to STRING if needed
        // await queryInterface.changeColumn('member_information', 'DeptSrNo', {
        //     type: Sequelize.STRING,
        //     allowNull: true
        // });

        // Step 5: Optionally remove foreign key constraint if added
        // await queryInterface.removeConstraint('member_information', 'member_information_dept_srno_fk');
    }
};
