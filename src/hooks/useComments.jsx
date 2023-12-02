import { useContext, useEffect, useState, createContext } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useAuth } from "./useAuth";
import { nanoid } from "nanoid";
import commentService from "../services/comment.service";

const CommentsContext = createContext();

export const useComments = () => useContext(CommentsContext);

const CommentsProvider = ({ children }) => {
  const [comments, setComments] = useState();
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const { userId } = useParams();
  const { currentUser } = useAuth();

  useEffect(() => {
    getComments();
  }, [userId]);

  const getComments = async () => {
    try {
      const { content } = await commentService.getComments(userId);
      setComments(content);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const removeComment = async (id) => {
    try {
      await commentService.removeComment(id);
      toast.success("Comment deleted successfully");
      getComments();
    } catch (error) {
      setError(error);
    }
  };

  const createComment = async (data) => {
    const comment = {
      ...data,
      _id: nanoid(),
      pageId: userId,
      created_at: Date.now(),
      userId: currentUser._id,
    };

    try {
      const { content } = await toast.promise(
        commentService.createComment(comment),
        {
          pending: "Comment is pending",
          success: "Comment  created 👌",
          error: "Comment create failed 🤯",
        }
      );
      setComments((prev) => [...prev, content]);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <CommentsContext.Provider
      value={{ comments, createComment, removeComment }}
    >
      {isLoading ? "loading" : children}
    </CommentsContext.Provider>
  );
};

CommentsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default CommentsProvider;
