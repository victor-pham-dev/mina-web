db.createUser({
  user: "minaroot",
  pwd: "minarootpassword",
  roles: [
    {
      role: "readWrite",
      db: "minadb",
    },
  ],
});

db.createCollection("users");
db.users.insertMany([
  {
    name: "John",
    email: "john@example.com",
    password: "123456",
  },
  {
    name: "Mary",
    email: "mary@example.com",
    password: "654321",
  },
]);
