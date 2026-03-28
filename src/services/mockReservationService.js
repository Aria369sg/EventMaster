const wait = (time = 400) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });

export const createMockReservation = async ({ eventId, seats = 1 }) => {
  await wait();

  return {
    message: "Reservation created successfully",
    reservation: {
      id: Date.now(),
      eventId,
      seats,
      status: "confirmed",
    },
  };
};
