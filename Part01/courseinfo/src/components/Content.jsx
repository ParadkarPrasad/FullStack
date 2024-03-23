import Part from "./Part";
const Content = ({ part }) => {
  // console.log(part);
  return (
    <>
      <Part part={part[0].name} exercise={part[0].exercises} />
      <Part part={part[1].name} exercise={part[1].exercises} />
      <Part part={part[2].name} exercise={part[2].exercises} />
    </>
  );
};

export default Content;
