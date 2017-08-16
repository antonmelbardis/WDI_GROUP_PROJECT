module.exports = {
  port: process.env.PORT || 4000,
  db: {
    test: 'mongodb://localhost/WDI_Group_Project_test',
    development: 'mongodb://localhost/WDI_Group_Project',
    production: process.env.MONGODB_URI || 'mongodb://localhost/WDI_Group_Project'
  },
  secret: process.env.SECRET || 'supersecretphrase',
  env: process.env.NODE_ENV || 'developement'
};
