import { Heart, Send, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toggleTweetLike } from "../../api/likeApi";
import { createTweet, deleteTweet, getUserTweets } from "../../api/tweetApi";
import { Loader } from "../../components/index.js";
import { useToast } from "../../context/ToastContext";
import { useAuth } from "../../hooks/useAuth";

const TweetsPage = () => {
  const { user } = useAuth();
  const toast = useToast();
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tweetContent, setTweetContent] = useState("");
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    if (user) {
      fetchTweets();
    }
  }, [user]);

  const fetchTweets = async () => {
    try {
      setLoading(true);
      const response = await getUserTweets(user._id);
      setTweets(response.data.data || []);
    } catch (error) {
      toast.error("Failed to load tweets");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePostTweet = async (e) => {
    e.preventDefault();
    if (!tweetContent.trim()) {
      toast.error("Please enter some content");
      return;
    }

    try {
      setPosting(true);
      await createTweet({ content: tweetContent });
      setTweetContent("");
      toast.success("Tweet posted successfully!");
      fetchTweets();
    } catch (error) {
      toast.error("Failed to post tweet");
      console.error(error);
    } finally {
      setPosting(false);
    }
  };

  const handleDeleteTweet = async (tweetId) => {
    if (!window.confirm("Delete this tweet?")) return;

    try {
      await deleteTweet(tweetId);
      toast.success("Tweet deleted");
      fetchTweets();
    } catch (err) {
      toast.error("Failed to delete tweet", err);
    }
  };

  const handleLikeTweet = async (tweetId) => {
    try {
      await toggleTweetLike(tweetId);
      fetchTweets();
    } catch (err) {
      toast.error("Failed to like tweet"    , err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-8">Community Posts</h1>

      {/* Post Tweet Form */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <form onSubmit={handlePostTweet}>
          <textarea
            value={tweetContent}
            onChange={(e) => setTweetContent(e.target.value)}
            placeholder="What's on your mind?"
            rows={4}
            maxLength={280}
            disabled={posting}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
          />
          <div className="flex justify-between items-center mt-3">
            <span className="text-sm text-gray-500">
              {tweetContent.length}/280
            </span>
            <button
              type="submit"
              disabled={posting || !tweetContent.trim()}
              className="flex items-center gap-2 px-6 py-2 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={18} />
              {posting ? "Posting..." : "Post"}
            </button>
          </div>
        </form>
      </div>

      {/* Tweets List */}
      <div className="space-y-4">
        {tweets.length > 0 ? (
          tweets.map((tweet) => (
            <div key={tweet._id} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start gap-4">
                <img
                  src={tweet.owner?.avatar || user?.avatar}
                  alt={tweet.owner?.fullName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-semibold">{tweet.owner?.fullName || user?.fullName}</h3>
                      <p className="text-sm text-gray-600">
                        {new Date(tweet.createdAt).toLocaleString()}
                      </p>
                    </div>
                    {user && user._id === tweet.owner?._id && (
                      <button
                        onClick={() => handleDeleteTweet(tweet._id)}
                        className="text-red-600 hover:bg-red-50 p-2 rounded-lg"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                  <p className="text-gray-800 mb-3">{tweet.content}</p>
                  <button
                    onClick={() => handleLikeTweet(tweet._id)}
                    className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors"
                  >
                    <Heart size={18} />
                    <span className="text-sm">Like</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 text-gray-500">
            No tweets yet. Be the first to post!
          </div>
        )}
      </div>
    </div>
  );
};

export default TweetsPage;
