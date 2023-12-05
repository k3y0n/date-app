import { useEffect } from "react";
import {
  createComment,
  getComments,
  getCommentsLoadingStatus,
  loadCommentsList,
  removeComment,
} from "../../../store/commentsSlice";
import Card from "../../hoc/Card/Card";
import AddComentForm from "../AddComentForm/AddComentForm";
import CommentsList from "../CommentsList/CommentsList";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { orderBy } from "lodash";

const Comments = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCommentsList(userId));
  }, [userId]);

  const isLoading = useSelector(getCommentsLoadingStatus());
  const comments = useSelector(getComments());

  const handleSubmit = (data) => {
    dispatch(createComment({ ...data, pageId: userId }));
  };
  const handleRemoveComment = (id) => {
    dispatch(removeComment(id));
  };

  const sortedComments = orderBy(comments, ["created_at"], ["desc"]);

  return (
    <>
      <Card className={"card mb-2"}>
        <div className="card-body ">
          <AddComentForm onAdd={handleSubmit} />
        </div>
      </Card>
      {sortedComments.length > 0 && (
        <Card className={"card mb-3"}>
          <div className="card-body ">
            <h2>Comments</h2>
            <hr />
            {!isLoading ? (
              <CommentsList
                comments={sortedComments}
                onRemove={handleRemoveComment}
              />
            ) : (
              "Loading..."
            )}
          </div>
        </Card>
      )}
    </>
  );
};

export default Comments;
