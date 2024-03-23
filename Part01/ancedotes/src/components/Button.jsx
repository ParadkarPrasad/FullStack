const Button = ({ handleVote, btntext }) => {
  return (
    <div>
      <button onClick={handleVote}>{btntext}</button>
    </div>
  );
};

export default Button;
