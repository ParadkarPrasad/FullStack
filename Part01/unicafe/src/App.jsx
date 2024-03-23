import { useState } from "react";

const Heading = ({ header }) => {
  <h2>{header}</h2>;
};
const Button = ({ handleClicked, text }) => {
  return <button onClick={handleClicked}>{text}</button>;
};

const StatisticsLine = ({ label, value }) => {
  if (label === "positive") {
    return (
      <tr>
        <td>{label}</td>
        <td>{value}</td>
      </tr>
    );
  }
  return (
    <tr>
      <td>{label}</td>
      <td>{value}</td>
    </tr>
  );
};
const Statistics = ({ good, bad, neutral }) => {
  let count = good + bad + neutral;
  let average = (good + bad) / count;
  let positive = (good / count) * 100;
  if (count === 0) {
    return <div>No feedback given</div>;
  }
  return (
    <table>
      <tbody>
        <StatisticsLine label="good" value={good} />
        <StatisticsLine label="neutral" value={neutral} />
        <StatisticsLine label="bad" value={bad} />
        <StatisticsLine label="all" value={count} />
        <StatisticsLine label="average" value={average} />
        <StatisticsLine label="positive" value={positive} />
      </tbody>
    </table>
  );
};
const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const setToGood = (good) => setGood(good);

  return (
    <>
      <Button handleClicked={() => setToGood(good + 1)} text={good} />
      <Button handleClicked={() => setBad(bad + 1)} text={bad} />
      <Button handleClicked={() => setNeutral(neutral + 1)} text={neutral} />
      <Heading header="statistics" />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </>
  );
};

export default App;
