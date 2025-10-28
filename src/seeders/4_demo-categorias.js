// src/seeders/20251028011147-demo-categorias.js

export const up = async ({ context: queryInterface }) => {
  await queryInterface.bulkInsert('categorias', [
    {
      categoria: 'Herramientas manuales',
      descripcion: 'Llaves, destornilladores, martillos, alicates y otros instrumentos de uso manual.',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      categoria: 'Materiales eléctricos',
      descripcion: 'Cables, interruptores, tomacorrientes, canaletas y accesorios para instalaciones eléctricas.',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      categoria: 'Fontanería',
      descripcion: 'Tuberías, conexiones, grifería, selladores y accesorios para sistemas hidráulicos.',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      categoria: 'Construcción y obra gris',
      descripcion: 'Cemento, bloques, varillas, mallas, mezcladoras y herramientas para albañilería.',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      categoria: 'Seguridad industrial',
      descripcion: 'Guantes, cascos, lentes, botas, señalización y equipos de protección personal.',
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);
};

export const down = async ({ context: queryInterface, Sequelize }) => {
  await queryInterface.bulkDelete('categorias', {
    categoria: {
      [Sequelize.Op.in]: [
        'Herramientas manuales',
        'Materiales eléctricos',
        'Fontanería',
        'Construcción y obra gris',
        'Seguridad industrial'
      ]
    }
  });
};
