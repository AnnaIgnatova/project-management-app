import { getRandomNum } from './getRandomNum';

export const getRandomColor = () => {
  return `hsl(${360 * getRandomNum()}, ${25 + 70 * getRandomNum()}%, ${85 + 10 * getRandomNum()}%)`;
};
