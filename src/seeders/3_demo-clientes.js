// src/seeders/20251028011147-demo-clientes.js

export const up = async ({ context: queryInterface }) => {
  await queryInterface.bulkInsert('clientes', [
    {
      nombres: 'Carlos',
      apellidos: 'González López',
      telefono: '88881234',
      usuario_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      nombres: 'María',
      apellidos: 'Ramírez Torres',
      telefono: '88884567',
      usuario_id: 2,
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);
};

export const down = async ({ context: queryInterface, Sequelize }) => {
  await queryInterface.bulkDelete('clientes', {
    telefono: {
      [Sequelize.Op.in]: ['88881234', '88884567', '88887654']
    }
  });
};
