const getRandom = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateSignal = () => {
  const now = new Date();

  // Generate a future time (1-10 minutes ahead)
  const minutesAhead = getRandom(1, 10);
  const futureTime = new Date(now.getTime() + minutesAhead * 60 * 1000);

  const hour = futureTime.getHours().toString().padStart(2, '0');
  const minute = futureTime.getMinutes().toString().padStart(2, '0');
  const second = getRandom(0, 59).toString().padStart(2, '0');

  const signal1 = `${getRandom(1, 3)}.${getRandom(10, 59)}`;
  const signal2 = `${getRandom(4, 6)}.${getRandom(10, 59)}`;

  return {
    time: `${hour}:${minute}:${second}`,
    signal1,
    signal2,
  };
};
