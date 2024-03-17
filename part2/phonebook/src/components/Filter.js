const Filter = ({ filterWord, onFilterChange }) => {
  return (
    <div>
      Filter shown with <input value={filterWord} onChange={onFilterChange} />
    </div>
  );
};

export default Filter;
