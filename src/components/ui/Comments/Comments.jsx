import Card from "../../hoc/Card/Card";
import AddComentForm from "../AddComentForm/AddComentForm";
import CommentsList from "../CommentsList/CommentsList";
import { useComments } from "../../../hooks/useComments";

const Comments = () => {
  const { comments, createComment, removeComment } = useComments();

  const handleDelete = (id) => {
    removeComment(id);
  };

  const handleSubmit = (data) => {
    createComment(data);
  };

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

export default Comments;
