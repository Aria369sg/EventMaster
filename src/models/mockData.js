export const mockUsers = [
  {
    id: 1,
    role: "user",
    name: "Ana Lopez",
    email: "ana@greenmarket.com",
    password: "123456",
  },
  {
    id: 2,
    role: "admin",
    name: "Luis Admin",
    email: "admin@greenmarket.com",
    password: "123456",
  },
];

export const mockEvents = [
  {
    id: 1,
    name: "Feria de productos organicos",
    date: "2026-04-02 10:00",
    capacity: 120,
    location: "Centro Verde",
    description:
      "Un espacio para conocer productores locales, alimentos frescos y opciones sustentables.",
  },
  {
    id: 2,
    name: "Taller de compostaje en casa",
    date: "2026-04-03 16:30",
    capacity: 40,
    location: "Aula Comunitaria",
    description:
      "Sesion practica para aprender a separar residuos y crear composta desde casa.",
  },
  {
    id: 3,
    name: "Mercado local de temporada",
    date: "2026-04-05 09:00",
    capacity: 200,
    location: "Plaza Principal",
    description:
      "Mercado comunitario con frutas, verduras, conservas y productos de temporada.",
  },
];

export const mockTickets = [
  {
    id: 101,
    eventId: 1,
    title: "Feria de productos organicos",
    date: "2026-04-02 10:00",
    location: "Centro Verde",
    seats: 2,
  },
  {
    id: 102,
    eventId: 3,
    title: "Mercado local de temporada",
    date: "2026-04-05 09:00",
    location: "Plaza Principal",
    seats: 1,
  },
];
