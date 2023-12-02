import Card from "../../hoc/Card/Card";
import API from "../../../api";
import { useEffect, useState } from "react";
import AddComentForm from "../AddComentForm/AddComentForm";
import CommentsList from "../CommentsList/CommentsList";
import PropTypes from "prop-types";
import { useComments } from "../../../hooks/useComments";

const Comments = ({ userId }) => {
  const [comments, setComments] = useState([]);
  const { createComment } = useComments();

  const handleDelete = (id) => {
    API.comments
      .remove(id)
      .then((id) =>
        setComments(comments.filter((comment) => comment._id !== id))
      );
  };

  const handleSubmit = (data) => {
    console.log("data", data);
    createComment(data);
  };

  useEffect(() => {
    API.comments
      .fetchCommentsForUser(userId)
      .then((data) => setComments(data.reverse()));
  }, []);

  return (
    <>
      <Card className={"card mb-2"}>
        <div className="card-body ">
          <AddComentForm onAdd={handleSubmit} />
        </div>
      </Card>
      {comments.length > 0 && (
        <Card className={"card mb-3"}>
          <div className="card-body ">
            <h2>Comments</h2>
            <hr />
            <CommentsList comments={comments} onRemove={handleDelete} />
          </div>
        </Card>
      )}
    </>
  );
};

Comments.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default Comments;
