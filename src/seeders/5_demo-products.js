// src/seeders/20251028011147-demo-productos.js

export const up = async ({ context: queryInterface }) => {
  await queryInterface.bulkInsert('productos', [
    {
      cod_producto: 'FER00000000001',
      producto: 'Martillo de acero 16oz',
      descripcion: 'Martillo con mango ergonómico y cabeza de acero templado, ideal para carpintería y obra gris.',
      precio: 8.50,
      existencias: 50,
      categoria_id: 1,
      costo: 5.20,
      imagen_url: 'https://example.com/images/martillo.jpg',
      existencia_max: 100,
      existencia_min: 10,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      cod_producto: 'FER00000000002',
      producto: 'Cable THW 12 AWG 100m',
      descripcion: 'Rollo de cable eléctrico THW calibre 12, resistente a humedad y altas temperaturas.',
      precio: 45.00,
      existencias: 20,
      categoria_id: 2,
      costo: 32.00,
      imagen_url: 'https://example.com/images/cable12awg.jpg',
      existencia_max: 40,
      existencia_min: 5,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      cod_producto: 'FER00000000003',
      producto: 'Llave Stilson 14"',
      descripcion: 'Llave ajustable para trabajos de fontanería, fabricada en acero forjado con mordazas antideslizantes.',
      precio: 18.75,
      existencias: 15,
      categoria_id: 3,
      costo: 12.50,
      imagen_url: 'https://example.com/images/stilson14.jpg',
      existencia_max: 30,
      existencia_min: 5,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      cod_producto: 'FER00000000004',
      producto: 'Bloques de concreto 15x40x20cm',
      descripcion: 'Bloques para construcción de muros, alta resistencia y compatibilidad con mezcla estándar.',
      precio: 0.95,
      existencias: 500,
      categoria_id: 4,
      costo: 0.65,
      imagen_url: 'https://example.com/images/bloque.jpg',
      existencia_max: 1000,
      existencia_min: 100,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      cod_producto: 'FER00000000005',
      producto: 'Casco de seguridad tipo americano',
      descripcion: 'Casco con suspensión interna, ranura para accesorios y certificación ANSI Z89.1.',
      precio: 12.00,
      existencias: 30,
      categoria_id: 5,
      costo: 8.75,
      imagen_url: 'https://example.com/images/casco.jpg',
      existencia_max: 60,
      existencia_min: 10,
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);
};

export const down = async ({ context: queryInterface, Sequelize }) => {
  await queryInterface.bulkDelete('productos', {
    cod_producto: {
      [Sequelize.Op.in]: [
        'FER00000000001',
        'FER00000000002',
        'FER00000000003',
        'FER00000000004',
        'FER00000000005'
      ]
    }
  });
};
