import { useContext, useEffect, useState, createContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";
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

  const createComment = async (data) => {
    const comment = {
      ...data,
      _id: nanoid(),
      pageId: userId,
      created_at: Date.now(),
      userId: currentUser._id,
    };

    try {
      const { content } = await commentService.createComment(comment);
      console.log(content);
    //   return content;
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {}, []);

  return (
    <CommentsContext.Provider value={{ createComment }}>
      {children}
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
