const { ORDER_TABLE } = require('../models/order.models');

module.exports = {
  up: async (queryInterface) => {
    if (queryInterface.context) {
      queryInterface = queryInterface.context;
    }
    return queryInterface.bulkInsert(ORDER_TABLE, [
      {
        customer_id: 1,
        status: 'delivered',
        paid: true,
        created_at: new Date()
      },
    ]);
  },
  down: (queryInterface) => {
    if (queryInterface.context) {
      queryInterface = queryInterface.context;
    }
    return queryInterface.bulkDelete(ORDER_TABLE, null, {});
  }
};
