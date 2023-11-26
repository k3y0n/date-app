import Card from "../../hoc/Card/Card";
import API from "../../../api";
import { useEffect, useState } from "react";
import Comment from "../Comment/Comment";

const CommentsList = ({ userId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    API.comments.fetchCommentsForUser(userId).then((data) => setComments(data));
  }, []);

  return (
    <>
      <Card className={"card mb-2"}>
        <div className="card-body ">//add comment</div>
      </Card>
      {comments && (
        <Card className={"card mb-3"}>
          <div className="card-body ">
            <h2>Comments</h2>
            <hr />
            {comments.map((comment) => (
              <Comment key={comment._id} {...comment} />
            ))}
          </div>
        </Card>
      )}
    </>
  );
};

export default CommentsList;
