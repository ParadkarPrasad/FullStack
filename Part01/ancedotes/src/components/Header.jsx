const Header = ({ text, anecdote, votes }) => {
  return (
    <>
      <div> {text}</div>
      <div>{anecdote}</div>
      <p>Has {votes} </p>
    </>
  );
};

export default Header;
