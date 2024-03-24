const Total = ({ parts }) => {
  let sum = parts.reduce((sum, part) => sum + part.exercises, 0);
  return <strong>total of {sum} exercises</strong>;
};

export default Total;
