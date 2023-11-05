const Bookmark = ({  bookmark, ...rest }) => {
  return (
    <i
      className={`bi bi-bookmark${bookmark ? "-heart-fill" : ""}`}
      {...rest}
    ></i>
  );
};

export default Bookmark;
