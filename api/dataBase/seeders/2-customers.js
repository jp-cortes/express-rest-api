const { CUSTOMER_TABLE } = require('../models/customer.models');

module.exports = {
  up: async (queryInterface) => {
    if (queryInterface.context) {
      queryInterface = queryInterface.context;
    }
    return queryInterface.bulkInsert(CUSTOMER_TABLE, [
      {
        name: 'Jane',
        last_name: 'Doe',
        phone: '7830601',
        user_id: 2,
        created_at: new Date()
      },
    ]);
  },
  down: (queryInterface) => {
    if (queryInterface.context) {
      queryInterface = queryInterface.context;
    }
    return queryInterface.bulkDelete(CUSTOMER_TABLE, null, {});
  }
};
