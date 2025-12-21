import { useCallback, useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { fetchData } from "../../api/youtubeApi";
import { Loader, VideoCard, VideoPopup } from "../../components/index.js";

const HomePage = () => {
  const { searchQuery } = useOutletContext();
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [displayedVideos, setDisplayedVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [sortBy, setSortBy] = useState("relevance");
  const [filterBy, setFilterBy] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef(null);
  const VIDEOS_PER_PAGE = 12;

  useEffect(() => {
    const loadVideos = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchData(searchQuery?.trim() || "JavaScript", 50);
        setVideos(Array.isArray(data) ? data : []);
        setFilteredVideos(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message || "Failed to load videos");
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, [searchQuery]);

  useEffect(() => {
    let result = [...videos];

    // Apply filtering
    if (filterBy === "today") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      result = result.filter((video) => {
        const publishDate = new Date(video.snippet.publishedAt);
        return publishDate >= today;
      });
    } else if (filterBy === "week") {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      result = result.filter((video) => {
        const publishDate = new Date(video.snippet.publishedAt);
        return publishDate >= weekAgo;
      });
    } else if (filterBy === "month") {
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      result = result.filter((video) => {
        const publishDate = new Date(video.snippet.publishedAt);
        return publishDate >= monthAgo;
      });
    }

    // Apply sorting
    if (sortBy === "date") {
      result.sort((a, b) => {
        return new Date(b.snippet.publishedAt) - new Date(a.snippet.publishedAt);
      });
    } else if (sortBy === "title") {
      result.sort((a, b) => {
        return a.snippet.title.localeCompare(b.snippet.title);
      });
    } else if (sortBy === "channel") {
      result.sort((a, b) => {
        return a.snippet.channelTitle.localeCompare(b.snippet.channelTitle);
      });
    }

    setFilteredVideos(result);
  }, [videos, sortBy, filterBy]);

  // Pagination effect - update displayed videos based on current page
  useEffect(() => {
    const startIndex = 0;
    const endIndex = currentPage * VIDEOS_PER_PAGE;
    const newDisplayed = filteredVideos.slice(startIndex, endIndex);
    setDisplayedVideos(newDisplayed);
    setHasMore(endIndex < filteredVideos.length);
  }, [filteredVideos, currentPage]);

  // Reset pagination when filters/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortBy, filterBy]);

  // Infinite scroll observer
  const handleObserver = useCallback((entries) => {
    const [target] = entries;
    if (target.isIntersecting && hasMore && !loading) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [hasMore, loading]);

  useEffect(() => {
    const element = observerTarget.current;
    const option = { threshold: 0.1 };
    const observer = new IntersectionObserver(handleObserver, option);
    
    if (element) observer.observe(element);
    
    return () => {
      if (element) observer.unobserve(element);
    };
  }, [handleObserver]);

  const loadMore = () => {
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-6 px-4">
      {/* Search Results Header */}
      {searchQuery && (
        <div className="max-w-7xl mx-auto mb-4">
          <div className="bg-white shadow-sm rounded-lg p-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Search Results for: <span className="text-purple-600">"{searchQuery}"</span>
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Found {filteredVideos.length} {filteredVideos.length === 1 ? 'result' : 'results'}
            </p>
          </div>
        </div>
      )}

      {/* Filter & Sort Controls */}
      <div className="max-w-7xl mx-auto mb-6">
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-wrap gap-4 items-center justify-between">
          {/* Filter Section */}
          <div className="flex items-center gap-3">
            <label htmlFor="filter-select" className="text-sm font-medium text-gray-700">Filter:</label>
            <select
              id="filter-select"
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>

          {/* Sort Section */}
          <div className="flex items-center gap-3">
            <label htmlFor="sort-select" className="text-sm font-medium text-gray-700">Sort by:</label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            >
              <option value="relevance">Relevance</option>
              <option value="date">Upload Date</option>
              <option value="title">Title (A-Z)</option>
              <option value="channel">Channel Name</option>
            </select>
          </div>

          {/* Results Count */}
          <div className="text-sm text-gray-600">
            Showing {displayedVideos.length} of {filteredVideos.length} {filteredVideos.length === 1 ? 'video' : 'videos'}
          </div>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      )}
      
      {error && (
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            <p className="font-medium">Error loading videos</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Video Grid */}
      {!loading && !error && (
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedVideos.length > 0 ? (
              displayedVideos
                .filter((video) => video.id?.videoId)
                .map((video) => (
                  <VideoCard
                    key={video.id.videoId}
                    video={video}
                    onSelect={() => setSelectedVideo(video)}
                  />
                ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">No videos found</p>
                <p className="text-gray-400 text-sm mt-2">
                  Try adjusting your filters or search query
                </p>
              </div>
            )}
          </div>

          {/* Infinite Scroll Observer Target */}
          {hasMore && displayedVideos.length > 0 && (
            <div ref={observerTarget} className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            </div>
          )}

          {/* Load More Button (Fallback) */}
          {hasMore && displayedVideos.length > 0 && (
            <div className="flex justify-center mt-8">
              <button
                onClick={loadMore}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
              >
                Load More Videos
              </button>
            </div>
          )}

          {/* End of Results */}
          {!hasMore && displayedVideos.length > 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 text-sm">
                You've reached the end of the results
              </p>
            </div>
          )}
        </div>
      )}

      {selectedVideo && (
        <VideoPopup
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </div>
  );
};

export default HomePage;
