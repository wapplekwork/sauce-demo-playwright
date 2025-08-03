// utils/testData.js

export const testUsers = {
  validUsers: [
    {
      username: 'standard_user',
      password: 'secret_sauce',
      description: 'Standard user with full access'
    },
    {
      username: 'performance_glitch_user',
      password: 'secret_sauce',
      description: 'User with performance issues'
    },
    {
      username: 'problem_user',
      password: 'secret_sauce',
      description: 'User with product issues'
    }
  ],
  lockedUser: {
    username: 'locked_out_user',
    password: 'secret_sauce',
    description: 'Locked out user'
  },
  invalidUsers: [
    {
      username: 'invalid_user',
      password: 'secret_sauce',
      description: 'Invalid username'
    },
    {
      username: 'standard_user',
      password: 'wrong_password',
      description: 'Invalid password'
    },
    {
      username: '',
      password: 'secret_sauce',
      description: 'Empty username'
    },
    {
      username: 'standard_user',
      password: '',
      description: 'Empty password'
    }
  ]
};

export const testProducts = [
  {
    name: 'Sauce Labs Backpack',
    price: '$29.99',
    id: 'sauce-labs-backpack'
  },
  {
    name: 'Sauce Labs Bike Light',
    price: '$9.99',
    id: 'sauce-labs-bike-light'
  },
  {
    name: 'Sauce Labs Bolt T-Shirt',
    price: '$15.99',
    id: 'sauce-labs-bolt-t-shirt'
  }
];

export const checkoutData = {
  validCustomer: {
    firstName: 'John',
    lastName: 'Doe',
    postalCode: '12345'
  },
  invalidCustomer: {
    firstName: '',
    lastName: '',
    postalCode: ''
  }
};

// module.exports = {
//   testUsers,
//   testProducts,
//   checkoutData
// };