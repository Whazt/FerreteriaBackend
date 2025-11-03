// src/seeders/20251028011147-demo-users.js

export const up = async ({ context: queryInterface }) => {
  await queryInterface.bulkInsert('usuarios', [
    {
      email: 'admin@example.com',
      contrasena_hash: '$2b$15$5GExHr6sIiehe8F1OSA3bOmO3Ia2wRRCJa9erupKdXkw4fA8tEiz', // admin123
      rol_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      email: 'user@example.com',
      contrasena_hash: '$2b$15$5GExHr6sIiehe8F1OSA3bOglw4u8XH7pzBXufaAAJ27fQLRFfm.da', // user123
      rol_id: 2,
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);
};

export const down = async ({ context: queryInterface }) => {
  await queryInterface.bulkDelete('usuarios', null, {});
};
