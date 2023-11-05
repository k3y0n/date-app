const SearchStatus = ({ length }) => {
  const phrase = (users) => {
    if (users > 4 && users < 12) {
      return "человек";
    } else if (users <= 4 && users >= 2) {
      return "человека";
    } else return "человек";
  };

  const titleText =
    length > 0
      ? `С тобой пообщается ${length} ${phrase(length)}`
      : "С тобой никто не пообщается";

  const titleClass = length > 0 ? "primary" : "warning";

  return (
    <h1>
      <span className={`badge text-bg-${titleClass}`}>{titleText}</span>
    </h1>
  );
};

export default SearchStatus;
