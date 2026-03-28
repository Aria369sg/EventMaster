import { mockEvents } from "../models/mockData";

const wait = (time = 300) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });

export const getMockEvents = async () => {
  await wait();
  return mockEvents;
};
