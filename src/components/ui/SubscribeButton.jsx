import { useEffect, useState } from "react";
import { getChannelSubscribers, toggleSubscription } from "../../api/subscriptionApi";
import { useToast } from "../../context/ToastContext";
import { useAuth } from "../../hooks/useAuth";

const SubscribeButton = ({ channelId, initialSubscribed = false }) => {
  const toast = useToast();
  const { user } = useAuth();
  const [isSubscribed, setIsSubscribed] = useState(initialSubscribed);
  const [subscriberCount, setSubscriberCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSubscriberCount();
  }, [channelId]);

  const fetchSubscriberCount = async () => {
    try {
      const response = await getChannelSubscribers(channelId);
      setSubscriberCount(response.data.data?.length || 0);
    } catch (error) {
      console.error("Error fetching subscribers:", error);
    }
  };

  const handleToggle = async () => {
    if (!user) {
      toast.error("Please login to subscribe");
      return;
    }

    if (loading) return;

    try {
      setLoading(true);
      await toggleSubscription(channelId);
      
      const newIsSubscribed = !isSubscribed;
      setIsSubscribed(newIsSubscribed);
      setSubscriberCount(prev => newIsSubscribed ? prev + 1 : prev - 1);
      
      toast.success(newIsSubscribed ? "Subscribed!" : "Unsubscribed");
    } catch (error) {
      toast.error("Failed to update subscription");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleToggle}
        disabled={loading}
        className={`
          px-6 py-2 rounded-full font-medium transition-colors
          ${isSubscribed
            ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
            : "bg-purple-600 text-white hover:bg-purple-700"
          }
          ${loading ? "opacity-50 cursor-not-allowed" : ""}
        `}
      >
        {isSubscribed ? "Subscribed" : "Subscribe"}
      </button>
      <span className="text-sm text-gray-600">
        {subscriberCount.toLocaleString()} {subscriberCount === 1 ? "subscriber" : "subscribers"}
      </span>
    </div>
  );
};

export default SubscribeButton;
