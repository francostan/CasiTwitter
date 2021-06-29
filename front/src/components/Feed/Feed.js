import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTweetsRequest } from "../../state/tweets";
import "./Feed.css";
import Post from "../Post/Post";
import TweetBox from "../TweetBox/TweetBox";
import { ArrowBack } from "@material-ui/icons";
import { VerifiedUser } from "@material-ui/icons";
import { Tooltip } from "@material-ui/core";
import { useLocation, Link } from "react-router-dom";

const Feed = () => {
  const dispatch = useDispatch();
  const tweets = useSelector((state) => state.tweets);
  const location = useLocation();

  useEffect(() => {
    dispatch(getTweetsRequest());
  }, []);

  const getTweets = () => {
    dispatch(getTweetsRequest());
  };

  return (
    <div className="feed">
      <div className="feed__header">
        {location.pathname === "/home" ? (
          <h2>Home</h2>
        ) : (
          <>
            <Link to="/home" onClick={getTweets}>
              <Tooltip title="Volver">
                <ArrowBack className="feed__arrowIcon" />
              </Tooltip>
            </Link>{" "}
            {location.pathname.startsWith("/tweets") ? (
              <h2>Tweet</h2>
            ) : (
              <div className="feed__tweet">
                <h2>{tweets.length && tweets[0].name}</h2>
                <div>
                  <VerifiedUser className="feed__badge" />
                </div>
              </div>
            )}
          </>
        )}
      </div>
      {location.pathname === "/home" ? <TweetBox /> : null}
      {tweets &&
        tweets
          .slice(0)
          .reverse()
          .map((tweet, i) => (
            <div key={i}>
              <Post
                id={tweet.id}
                isVerified={tweet.isVerified}
                name={tweet.name}
                content={tweet.content}
                imgURL={tweet.imgURL}
              />
            </div>
          ))}
    </div>
  );
};

export default Feed;
