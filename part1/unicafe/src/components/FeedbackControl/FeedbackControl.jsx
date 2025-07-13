import FeedbackButton from "../FeedbackButton/FeedbackButton";

const FeedbackControl = ({ setGood, setNeutral, setBad }) => {
  const feedbackButtons = [
    { label: "good", setFeedback: setGood },
    { label: "neutral", setFeedback: setNeutral },
    { label: "bad", setFeedback: setBad },
  ];

  return (
    <div>
      <h2>Give your feedback</h2>
      <div>
        {feedbackButtons.map(({ label, setFeedback }) => (
          <FeedbackButton
            key={label}
            text={label}
            onClick={() => setFeedback((prev) => prev + 1)}
          />
        ))}
      </div>
    </div>
  );
};

export default FeedbackControl;
