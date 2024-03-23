import { useState } from "react";
import Header from "./components/Header";
import Button from "./components/Button";

//text, handleVote, btntext, anecdote, heading
const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
  const nextAncedote = () => {
    const randomQuote = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomQuote);
  };
  const countVotes = () => {
    const votes_copy = [...votes];
    votes_copy[selected] += 1;
    setVotes(votes_copy);
  };
  const maxVotes = Math.max(...votes);

  return (
    <>
      <Header
        text={"Anecdote of the day"}
        anecdote={anecdotes[selected]}
        votes={votes[selected]}
      />
      <Button handleVote={countVotes} btntext={"Vote"} />
      <Button handleVote={nextAncedote} btntext={"next anecdote"} />
      <Header
        text="Anecdote with most votes"
        anecdote={anecdotes[votes.indexOf(maxVotes)]}
        votes={maxVotes}
      />
    </>
  );
};

export default App;
