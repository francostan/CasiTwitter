import React from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTweetsRequest, getSingleTweetRequest, getUserTweetsRequest, deleteTweetRequest, updateUserTweetsRequest } from "../../state/tweets";
import "./Post.css";
import { Avatar, Tooltip } from "@material-ui/core";
import { ChatBubbleOutlined, Delete, FavoriteBorder, Publish, Repeat, VerifiedUser } from "@material-ui/icons";

const Post = ({ id, isVerified, name, content, imgURL }) => {
  const dispatch = useDispatch();
  const tweets = useSelector((state) => state.tweets);
  const location = useLocation();
  const history = useHistory();

  const getUserTweets = () => {
    dispatch(getUserTweetsRequest(name));
  };

  const getSingleTweet = () => {
    dispatch(getSingleTweetRequest(id));
  };

  const deleteTweet = () => {
    dispatch(deleteTweetRequest(id))
    if(location.pathname !== "/home" && tweets.length === 1) {
      history.push("/home");
      dispatch(getTweetsRequest())
    }
  }

  const updateUser = (e) => {
    dispatch(updateUserTweetsRequest({ name, isVerified: e.target.checked }));
  }

  return (
    <div className="post">
      <div className="post__header">
        <div className="post__avatar">
          <Avatar src="https://images-na.ssl-images-amazon.com/images/I/81-yKbVND-L.png" />
        </div>
        <div className="post__headerElements">
          <div>
            <div className="post__headerName">
              <h3 onClick={getUserTweets}>
                <Link to={`/users/${name}`} className="post__text" >
                {name}
                </Link>
              </h3>
              <div>
                <VerifiedUser className="post__badge" />
                { location.pathname.startsWith("/users") ? (
                  <>
                    <input type="checkbox" onChange={updateUser} />
                    <label>{isVerified.toString() }</label>
                </> ) : null }
              </div>
            </div>
            <div className="post__headerContent">
              <p onClick={getSingleTweet}>
                <Link to={`/tweets/${id}`} className="post__text" >
                {content}
                </Link>
              </p>
            </div>
          </div>
          <div className="post__trash">
            <Tooltip title="Borrar">
              <Delete onClick={deleteTweet}/>
            </Tooltip>
          </div>
        </div>
      </div>
      {imgURL ? (
        <div className="post__body">
          <img src={imgURL} alt="" />
        </div>
      ) : null}
      <div className="post__footer">
        <ChatBubbleOutlined fontSize="small" />
        <Repeat fontSize="small" />
        <FavoriteBorder fontSize="small" />
        <Publish fontSize="small" />
      </div>
    </div>
  );
};

export default Post;