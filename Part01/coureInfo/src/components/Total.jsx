const Total = ({ sum }) => {
  return (
    <div>
      Number of exercises
      {sum[0].exercises + sum[1].exercises + sum[2].exercises}
    </div>
  );
};

export default Total;
