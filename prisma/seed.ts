import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 1. Crear las categorías en su tabla relacional
  const catOrganizacion = await prisma.category.upsert({
    where: { name: 'Bolsa y Organización' },
    update: {},
    create: { name: 'Bolsa y Organización' },
  });

  const catHogar = await prisma.category.upsert({
    where: { name: 'Hogar y Descanso' },
    update: {},
    create: { name: 'Hogar y Descanso' },
  });

  const catDecoracion = await prisma.category.upsert({
    where: { name: 'Decoración y Detalles' },
    update: {},
    create: { name: 'Decoración y Detalles' },
  });

  const catNavidad = await prisma.category.upsert({
    where: { name: 'Navidad' },
    update: {},
    create: { name: 'Navidad' },
  });

  // 2. Insertar los productos vinculados a sus categorías
  await prisma.product.create({
    data: {
      name: 'Bolsa de Pan',
      description: 'Bolsa de tela para guardar el pan, con un diseño de espigas de trigo bordado.',
      price: 15.50,
      image: '/product/bolsa-de-pan.png',
      categoryId: catOrganizacion.id,
      stock: 5,
      showInGallery: true,
    },
  });

  await prisma.product.create({
    data: {
      name: 'Cojín Personalizado',
      description: 'Cojín suave de lino con nombre o inicial bordada. Perfecto para un regalo especial.',
      price: 25.00,
      image: '/product/Cojin.png',
      categoryId: catHogar.id,
      stock: 10,
      showInGallery: false,
    },
  });

  await prisma.product.create({
    data: {
      name: 'Adorno para Puerta',
      description: 'Adorno de madera y tela para colgar en la puerta, con un mensaje de bienvenida bordado.',
      price: 18.00,
      image: '/product/adorno-puerta.png',
      categoryId: catDecoracion.id,
      stock: 3,
      showInGallery: true,
    },
  });

  await prisma.product.create({
    data: {
      name: 'Corazones de Lavanda',
      description: 'Pequeños corazones de tela rellenos de lavanda, ideales para armarios o cajones.',
      price: 12.00,
      image: '/product/corazones-de-lavanda.png',
      categoryId: catNavidad.id,
      stock: 20,
      showInGallery: false,
    },
  });

  console.log('Base de datos inicializada con éxito.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });