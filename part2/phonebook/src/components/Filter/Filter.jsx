const Filter = ({ filter, setFilter }) => {
  return (
    <form>
      filter shown with{" "}
      <input value={filter} onChange={(e) => setFilter(e.target.value)} />
    </form>
  );
};

export default Filter;
