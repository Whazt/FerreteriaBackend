// src/seeders/20251028011147-demo-roles.js

export const up = async ({ context: queryInterface }) => {
  await queryInterface.bulkInsert('roles', [
    {
      rol: 'admin',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      rol: 'user',
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);
};

export const down = async ({ context: queryInterface }) => {
  await queryInterface.bulkDelete('roles', null, {});
};
