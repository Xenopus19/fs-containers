db = db.getSiblingDB('the_database');

db.createUser({
  user: 'root', 
  pwd: 'the_password',
  roles: [{ role: 'readWrite', db: 'the_database' }],
});

db.createCollection('test_collection'); 