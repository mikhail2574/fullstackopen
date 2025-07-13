import StatisticLine from "../StatisticLine/StatisticLine";

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = total ? (good - bad) / total : 0;
  const positivePercentage = total ? (good / total) * 100 : 0;

  const statistics = [
    { name: "good", value: good },
    { name: "neutral", value: neutral },
    { name: "bad", value: bad },
    { name: "total", value: total },
    { name: "average", value: average.toFixed(2) },
    { name: "positive", value: positivePercentage.toFixed(2) + "%" },
  ];

  return (
    <div>
      <h2>Statistics</h2>
      {total === 0 ? (
        <p>No feedback given</p>
      ) : (
        <table>
          <tbody>
            {statistics.map(({ name, value }) => (
              <StatisticLine key={name} text={name} value={value} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Statistics;
