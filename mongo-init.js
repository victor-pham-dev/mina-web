db.createUser({
  user: 'minaroot',
  pwd: 'minarootpassword',
  roles: [
    {
      role: 'readWrite',
      db: 'minadb',
    },
  ],
})

db.createCollection('users')
db.users.insertMany([
  {
    name: 'Truong Pham Van',
    gender: 'male',
    yOB: 1999,
    status: 1,
    deleted: false,
    password: '$2a$12$qpFqFDbie8.4YPg5/iS9Aubc.E4pZbBCByc82vDY7hHZNDPKxTl1G',
    role: 0,
    email: 'truongpham2412.nd@gmail.com',
  },
])
