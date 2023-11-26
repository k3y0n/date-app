import Comment from "../Comment/Comment";
import PropTypes from "prop-types";

const CommentsList = ({ comments, onRemove }) => {
  return (
    <>
      {comments.map((comment) => (
        <Comment key={comment._id} {...comment} handleDelete={onRemove} />
      ))}
    </>
  );
};

CommentsList.propTypes = {
  comments: PropTypes.array,
  onRemove: PropTypes.func,
};

export default CommentsList;
