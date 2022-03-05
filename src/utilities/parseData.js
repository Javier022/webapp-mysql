export const parseData = (array = []) => {
  const newFormatData = array.reduce(
    (acc, el) => ({
      ...acc,
      [el.id]: el,
    }),
    {}
  );

  return newFormatData;
};
