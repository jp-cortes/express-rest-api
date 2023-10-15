const { CUSTOMER_TABLE } = require('../models/customer.models');

module.exports = {
  up: async (queryInterface) => {
    if (queryInterface.context) {
      queryInterface = queryInterface.context;
    }
    return queryInterface.bulkInsert(CUSTOMER_TABLE, [
      {
        name: 'demo',
        last_name: 'admin',
        phone: '123454698',
        user_id: 1,
        created_at: new Date()
      },
      {
        name: 'jane',
        last_name: 'doe',
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
