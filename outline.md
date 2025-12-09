
# 🎬 VideoTube Backend - Complete Feature Overview & Frontend Guide

## 📦 **DATA MODELS** (7 Models)

### 1. **User Model**
- `username` - unique, indexed
- `email` - unique
- `fullName` - indexed
- `avatar` - required (Cloudinary URL)
- `coverImage` - optional
- `password` - hashed with bcrypt
- `refreshToken` - JWT token
- `watchHistory` - array of video references
- Timestamps: `createdAt`, `updatedAt`

### 2. **Video Model**
- `title` - required
- `description` - required
- `videoFile` - required (Cloudinary URL)
- `thumbnail` - required
- `duration` - number (in seconds)
- `views` - default: 0
- `isPublished` - boolean, default: true
- `owner` - User reference
- `likes` - array of User references
- `comments` - array of Comment references
- Supports pagination (mongoose-aggregate-paginate-v2)

### 3. **Comment Model**
- `content` - required
- `video` - Video reference
- `owner` - User reference
- Supports pagination

### 4. **Like Model**
- `video` - Video reference (optional)
- `comment` - Comment reference (optional)
- `tweet` - Tweet reference (optional)
- `likedBy` - User reference
- *Note: One like can be for either video, comment, or tweet*

### 5. **Playlist Model**
- `name` - required
- `description` - required
- `videos` - array of Video references
- `owner` - User reference

### 6. **Subscription Model**
- `subscriber` - User reference (who subscribes)
- `channel` - User reference (channel being subscribed to)

### 7. **Tweet Model**
- `content` - required
- `owner` - User reference

---

## 🔐 **AUTHENTICATION & AUTHORIZATION**

### Authentication Features:
- JWT-based authentication (Access Token + Refresh Token)
- HTTP-only cookies for security
- Bcrypt password hashing
- Middleware: `verifyJWT` for protected routes

---

## 🛣️ **API ENDPOINTS BREAKDOWN**

### **BASE URL**: `http://localhost:8080`

---

## 👤 **USER ROUTES** (users)

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| POST | `/users/register` | No | Register new user (multipart: avatar, coverImage) |
| POST | `/users/login` | No | Login user (returns tokens) |
| POST | `/users/logout` | Yes | Logout & clear refresh token |
| POST | `/users/refresh-token` | No | Refresh access token |
| POST | `/users/change-password` | Yes | Change user password |
| GET | `/users/current-user` | Yes | Get logged-in user details |
| PATCH | `/users/update-account` | Yes | Update fullName & email |
| PATCH | `/users/avatar` | Yes | Update avatar image |
| PATCH | `/users/cover-image` | Yes | Update cover image |
| GET | `/users/channel/:username` | Yes | Get channel profile with stats |
| GET | `/users/watch-history` | Yes | Get user's watch history |

---

## 🎥 **VIDEO ROUTES** (`/videos`)

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| GET | `/videos` | Yes | Get all videos (pagination, search, sort) |
| POST | `/videos` | Yes | Upload video (multipart: videoFile, thumbnail) |
| GET | `/videos/:videoId` | Yes | Get video by ID with owner details |
| PATCH | `/videos/:videoId` | Yes | Update video (title, desc, thumbnail) |
| DELETE | `/videos/:videoId` | Yes | Delete video (owner only) |
| PATCH | `/videos/toggle/publish/:videoId` | Yes | Toggle publish status |

**Query Parameters for GET /videos:**
- `page` - page number (default: 1)
- `limit` - items per page (default: 10)
- `query` - search in title/description
- `sortBy` - createdAt, views, title
- `sortType` - asc/desc
- `userId` - filter by owner

---

## 💬 **COMMENT ROUTES** (`/comments`)

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| GET | `/comments/:videoId` | Yes | Get all comments for a video |
| POST | `/comments/:videoId` | Yes | Add comment to video |
| PATCH | `/comments/:commentId` | Yes | Update comment (owner only) |
| DELETE | `/comments/:commentId` | Yes | Delete comment (owner only) |

---

## ❤️ **LIKE ROUTES** (`/likes`)

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| POST | `/likes/toggle/:videoId` | Yes | Toggle like on video |
| POST | `/likes/toggle/:commentId` | Yes | Toggle like on comment |
| POST | `/likes/toggle/:tweetId` | Yes | Toggle like on tweet |
| GET | `/likes/videos` | Yes | Get all liked videos by user |

---

## 📂 **PLAYLIST ROUTES** (`/playlists`)

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| POST | `/playlists` | Yes | Create new playlist |
| GET | `/playlists/:playlistId` | Yes | Get playlist by ID |
| PATCH | `/playlists/:playlistId` | Yes | Update playlist (owner only) |
| DELETE | `/playlists/:playlistId` | Yes | Delete playlist (owner only) |
| PATCH | `/playlists/add/:videoId/:playlistId` | Yes | Add video to playlist |
| PATCH | `/playlists/remove/:videoId/:playlistId` | Yes | Remove video from playlist |
| GET | `/playlists/user/:userId` | Yes | Get all playlists of a user |

---

## 🔔 **SUBSCRIPTION ROUTES** (`/subscriptions`)

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| POST | `/subscriptions/channel/:channelId` | Yes | Toggle subscription to channel |
| GET | `/subscriptions/channel/:channelId` | Yes | Get subscribed channels |
| GET | `/subscriptions/user/:subscriberId` | Yes | Get channel subscribers |

---

## 🐦 **TWEET ROUTES** (`/tweets`)

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| POST | `/tweets` | Yes | Create new tweet |
| GET | `/tweets/user/:userId` | Yes | Get all tweets by user |
| PATCH | `/tweets/:tweetId` | Yes | Update tweet (owner only) |
| DELETE | `/tweets/:tweetId` | Yes | Delete tweet (owner only) |

---

## 📊 **DASHBOARD ROUTES** (`/dashboard`)

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| GET | `/dashboard/status` | Yes | Get channel stats (views, subscribers, videos, likes) |
| GET | `/dashboard/videos` | Yes | Get all videos of logged-in user's channel |

---

## 🏥 **HEALTH CHECK** (`/health`)

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| GET | `/health` | No | Check API health status |

---
Body:
{
  "content": "Your comment text"
}
```

#### 3. Update Comment
```http
PATCH /comments/:commentId
Authorization: Bearer <accessToken>
Content-Type: application/json

Body:
{
  "content": "Updated comment text"
}

Note: Only comment owner can update
```

#### 4. Delete Comment
```http
DELETE /comments/:commentId
Authorization: Bearer <accessToken>

Note: Only comment owner can delete
```

---

## ❤️ **LIKE ROUTES** (`/likes`)

**Note:** All like routes require authentication

#### 1. Toggle Video Like
```http
POST /likes/toggle/:videoId
Authorization: Bearer <accessToken>

Response: Message indicating liked/unliked status
```

#### 2. Toggle Comment Like
```http
POST /likes/toggle/:commentId
Authorization: Bearer <accessToken>

Response: Message indicating liked/unliked status
```

#### 3. Toggle Tweet Like
```http
POST /likes/toggle/:tweetId
Authorization: Bearer <accessToken>

Response: Message indicating liked/unliked status
```

#### 4. Get Liked Videos
```http
GET /likes/videos
Authorization: Bearer <accessToken>

Response: Array of all videos liked by current user
```

---

## 📂 **PLAYLIST ROUTES** (`/playlists`)

**Note:** All playlist routes require authentication

#### 1. Create Playlist
```http
POST /playlists
Authorization: Bearer <accessToken>
Content-Type: application/json

Body:
{
  "name": "My Playlist",
  "description": "Playlist description"
}
```

#### 2. Get Playlist by ID
```http
GET /playlists/:playlistId
Authorization: Bearer <accessToken>

Response: Playlist with populated videos
```

#### 3. Update Playlist
```http
PATCH /playlists/:playlistId
Authorization: Bearer <accessToken>
Content-Type: application/json

Body:
{
  "name": "Updated Name",
  "description": "Updated description"
}

Note: Only playlist owner can update
```

#### 4. Delete Playlist
```http
DELETE /playlists/:playlistId
Authorization: Bearer <accessToken>

Note: Only playlist owner can delete
```

#### 5. Add Video to Playlist
```http
PATCH /playlists/add/:videoId/:playlistId
Authorization: Bearer <accessToken>

Note: Only playlist owner can add videos
```

#### 6. Remove Video from Playlist
```http
PATCH /playlists/remove/:videoId/:playlistId
Authorization: Bearer <accessToken>

Note: Only playlist owner can remove videos
```

#### 7. Get User Playlists
```http
GET /playlists/user/:userId
Authorization: Bearer <accessToken>

Response: Array of all playlists created by the user
```

---

## 🔔 **SUBSCRIPTION ROUTES** (`/subscriptions`)

**Note:** All subscription routes require authentication

#### 1. Toggle Subscription
```http
POST /subscriptions/channel/:channelId
Authorization: Bearer <accessToken>

Response: Message indicating subscribed/unsubscribed status
```

#### 2. Get Subscribed Channels
```http
GET /subscriptions/channel/:channelId
Authorization: Bearer <accessToken>

Response: Array of channels the user is subscribed to
```

#### 3. Get Channel Subscribers
```http
GET /subscriptions/user/:subscriberId
Authorization: Bearer <accessToken>

Response: Array of users subscribed to the channel
```

---

## 🐦 **TWEET ROUTES** (`/tweets`)

**Note:** All tweet routes require authentication

#### 1. Create Tweet
```http
POST /tweets
Authorization: Bearer <accessToken>
Content-Type: application/json

Body:
{
  "content": "Your tweet content"
}
```

#### 2. Get User Tweets
```http
GET /tweets/user/:userId
Authorization: Bearer <accessToken>

Response: Array of all tweets by the user
```

#### 3. Update Tweet
```http
PATCH /tweets/:tweetId
Authorization: Bearer <accessToken>
Content-Type: application/json

Body:
{
  "content": "Updated tweet content"
}

Note: Only tweet owner can update
```

#### 4. Delete Tweet
```http
DELETE /tweets/:tweetId
Authorization: Bearer <accessToken>

Note: Only tweet owner can delete
```

---

## 📊 **DASHBOARD ROUTES** (`/dashboard`)

**Note:** All dashboard routes require authentication

#### 1. Get Channel Stats
```http
GET /dashboard/status
Authorization: Bearer <accessToken>

Response:
{
  "totalVideos": 50,
  "totalViews": 10000,
  "totalSubscribers": 1500,
  "totalLikes": 5000
}
```

#### 2. Get Channel Videos
```http
GET /dashboard/videos
Authorization: Bearer <accessToken>

Response: Array of all videos uploaded by current user
```

---

## 🏥 **HEALTH CHECK** (`/health`)

#### Health Check
```http
GET /health

Response:
{
  "status": "OK",
  "message": "Server is running"
}
```

---

## 🎨 **FRONTEND DEVELOPMENT GUIDE**

### **Recommended Tech Stack**

#### **Framework Options:**
- React.js (Most popular)
- Next.js (SSR + SEO benefits)
- Vue.js
- Angular

#### **State Management:**
- Redux Toolkit (Complex state)
- Zustand (Lightweight)
- TanStack Query / React Query (Server state)
- Context API (Simple state)

#### **UI Libraries:**
- Tailwind CSS (Utility-first)
- Material-UI (Component library)
- Chakra UI (Accessible components)
- Ant Design
- shadcn/ui (Modern components)

#### **HTTP Client:**
- Axios (Interceptors, easy config)
- TanStack Query (Caching, auto-refetch)
- Fetch API (Native)

#### **Video Player:**
- Video.js
- React Player
- Plyr
- JW Player

#### **Form Handling:**
- React Hook Form (Performance)
- Formik (Popular)
- Native form handling

#### **File Upload:**
- React Dropzone
- Filepond
- Custom drag-drop

#### **Routing:**
- React Router v6
- Next.js App Router
- TanStack Router

---

### **Pages & Components Structure**

#### **1. Authentication Pages**

**Register Page** (`/register`)
- Form fields: username, email, fullName, password, confirmPassword
- File upload: avatar (required), coverImage (optional)
- Validation: Email format, password strength, unique username
- Redirect to login after success

**Login Page** (`/login`)
- Form fields: username/email, password
- "Remember me" option
- Forgot password link
- Redirect to home after success

**Components:**
- `AuthForm`
- `ImageUploader`
- `PasswordInput` (with show/hide)

---

#### **2. Home/Feed Page** (`/`)

**Features:**
- Video grid/list view
- Search bar (debounced)
- Sort dropdown (Latest, Most Viewed, Title A-Z)
- Filter options (All, Subscribed, Trending)
- Infinite scroll / Pagination
- Video thumbnails with:
  - Duration badge
  - View count
  - Upload date
  - Channel avatar & name

**Components:**
- `VideoCard`
- `SearchBar`
- `FilterBar`
- `VideoGrid`
- `Pagination`

---

#### **3. Video Player Page** (`/video/:videoId`)

**Layout:**
- Video player (main)
- Video title
- View count, upload date
- Like/Dislike buttons
- Share button
- Save to playlist button
- Channel info with subscribe button
- Video description (expandable)
- Comments section
- Suggested videos sidebar

**Components:**
- `VideoPlayer`
- `VideoInfo`
- `ChannelInfo`
- `SubscribeButton`
- `LikeButton`
- `CommentSection`
- `SuggestedVideos`

---

#### **4. Channel/Profile Pages**

**My Profile** (`/profile`)
- User info (avatar, cover, name, email, username)
- Edit profile button
- My videos tab
- My playlists tab
- Tweets tab
- Statistics (if own channel)

**Public Channel** (`/channel/:username`)
- Channel banner (coverImage)
- Channel avatar
- Channel name & username
- Subscriber count
- Subscribe button
- Tabs: Videos, Playlists, Tweets, About

**Edit Profile** (`/profile/edit`)
- Update fullName, email
- Change avatar
- Change cover image
- Change password (separate section)

**Components:**
- `ProfileHeader`
- `ProfileStats`
- `TabNavigation`
- `EditProfileForm`

---

#### **5. Video Upload Page** (`/upload`)

**Features:**
- Drag-drop video file
- Video preview
- Title input
- Description textarea
- Thumbnail upload (with preview)
- Publish/Draft toggle
- Progress bar for upload
- Cancel upload option

**Components:**
- `VideoUploadForm`
- `FileDropZone`
- `UploadProgress`
- `ThumbnailPreview`
---

---

## 📊 **FRONTEND COMPLETION STATUS**

### **Overall Progress: 35% Complete**

| # | Feature | Status | Completion | Notes |
|---|---------|--------|-----------|-------|
| **AUTHENTICATION** |
| 1 | User Registration UI | ✅ Complete | 100% | Form with validation, file upload, error handling |
| 2 | User Registration API Integration | ✅ Complete | 100% | Connected to backend, formData multipart submission |
| 3 | User Login UI | ✅ Complete | 100% | Form with validation, error handling, loading state |
| 4 | User Login API Integration | ✅ Complete | 100% | Connected to backend, token management |
| 5 | Auth Context/State Management | ✅ Complete | 100% | User state, login/logout/register methods, error handling |
| 6 | Protected Routes | ✅ Complete | 100% | Route wrapper component for authenticated pages |
| 7 | Logout Functionality | ✅ Complete | 100% | Logout button in navbar, token clearing |
| 8 | Token Refresh Interceptor | ✅ Complete | 100% | Auto token refresh on 401 response |
| 9 | Change Password Page | ❌ Not Started | 0% | Needed in account settings |
| 10 | Forgot Password Page | ❌ Not Started | 0% | Email verification needed |
| **Authentication Total** | | | **80%** | |
|  |
| **HOME PAGE & DISCOVERY** |
| 11 | Home Page Layout | ⚠️ In Progress | 70% | Grid layout exists, needs filters & sorting |
| 12 | Video Grid Display | ✅ Complete | 100% | VideoCard component fully functional |
| 13 | Search Bar | ✅ Complete | 100% | Search input with debounce |
| 14 | Search Results Page | ❌ Not Started | 0% | Dedicated results page needed |
| 15 | Filter Options | ❌ Not Started | 0% | Category, date range, duration filters |
| 16 | Sort Options | ❌ Not Started | 0% | Latest, popular, trending |
| 17 | Pagination | ❌ Not Started | 0% | Load more or page numbers |
| 18 | Infinite Scroll | ❌ Not Started | 0% | Auto-load on scroll |
| **Home Page Total** | | | **40%** | |
|  |
| **VIDEO FEATURES** |
| 19 | Video Player Page | ⚠️ In Progress | 20% | Popup player exists, needs full page |
| 20 | Video Details Page | ❌ Not Started | 0% | Title, views, date, description section |
| 21 | Video Upload Page | ❌ Not Started | 0% | Form, file upload, progress, validation |
| 22 | Like/Unlike Videos | ❌ Not Started | 0% | Like button and toggle functionality |
| 23 | Share Video | ❌ Not Started | 0% | Share button, copy link, social share |
| 24 | Add to Playlist | ❌ Not Started | 0% | Save video to playlist modal |
| 25 | Watch History | ❌ Not Started | 0% | Track and display watched videos |
| 26 | Video Recommendations | ⚠️ Partial | 10% | Sidebar exists, needs backend integration |
| **Video Features Total** | | | **12%** | |
|  |
| **COMMENTS SYSTEM** |
| 27 | Comment Component | ⚠️ In Progress | 60% | Components exist, not integrated with video |
| 28 | Add Comment | ⚠️ In Progress | 40% | Form exists, needs integration |
| 29 | Edit Comment | ⚠️ In Progress | 40% | Component exists, needs integration |
| 30 | Delete Comment | ⚠️ In Progress | 40% | Component exists, needs integration |
| 31 | Comment Pagination | ❌ Not Started | 0% | Load more comments |
| 32 | Like Comments | ❌ Not Started | 0% | Like/unlike comment functionality |
| 33 | Comment Replies | ❌ Not Started | 0% | Nested replies not implemented |
| **Comments Total** | | | **30%** | |
|  |
| **PROFILE & CHANNEL** |
| 34 | My Profile Page | ✅ Complete | 100% | User info, stats, videos display |
| 35 | Public Channel Page | ❌ Not Started | 0% | `/channel/:username` route |
| 36 | Edit Profile Page | ⚠️ In Progress | 30% | Form exists, partial functionality |
| 37 | Change Avatar | ⚠️ In Progress | 50% | File upload component exists |
| 38 | Change Cover Image | ⚠️ In Progress | 50% | File upload component exists |
| 39 | Channel Statistics | ❌ Not Started | 0% | Views, subscribers, engagement stats |
| 40 | User Subscribers List | ❌ Not Started | 0% | View who subscribed |
| **Profile Total** | | | **46%** | |
|  |
| **SUBSCRIPTIONS** |
| 41 | Subscribe Button | ❌ Not Started | 0% | Toggle subscription UI |
| 42 | Subscriber Count | ❌ Not Started | 0% | Display subscriber count |
| 43 | Subscribed Channels List | ❌ Not Started | 0% | View subscribed channels |
| 44 | Subscribed Feed | ❌ Not Started | 0% | Videos from subscribed channels |
| **Subscriptions Total** | | | **0%** | |
|  |
| **PLAYLISTS** |
| 45 | Create Playlist | ❌ Not Started | 0% | Form to create playlist |
| 46 | View Playlist | ❌ Not Started | 0% | Display playlist videos |
| 47 | Edit Playlist | ❌ Not Started | 0% | Update name/description |
| 48 | Delete Playlist | ❌ Not Started | 0% | Remove playlist |
| 49 | Add Video to Playlist | ❌ Not Started | 0% | Modal/dropdown to select playlist |
| 50 | Remove Video from Playlist | ❌ Not Started | 0% | Remove button in playlist |
| 51 | User Playlists List | ❌ Not Started | 0% | View all user's playlists |
| **Playlists Total** | | | **0%** | |
|  |
| **TWEETS/COMMUNITY** |
| 52 | Create Tweet | ❌ Not Started | 0% | Tweet creation form |
| 53 | View Tweets | ❌ Not Started | 0% | Tweet timeline/feed |
| 54 | Edit Tweet | ❌ Not Started | 0% | Update tweet content |
| 55 | Delete Tweet | ❌ Not Started | 0% | Remove tweet |
| 56 | Like Tweet | ❌ Not Started | 0% | Like/unlike tweet |
| **Tweets Total** | | | **0%** | |
|  |
| **DASHBOARD/CREATOR TOOLS** |
| 57 | Creator Dashboard | ❌ Not Started | 0% | Overview of channel stats |
| 58 | Channel Statistics | ❌ Not Started | 0% | Views, subscribers, engagement |
| 59 | Video Management | ❌ Not Started | 0% | List of uploaded videos |
| 60 | Video Analytics | ❌ Not Started | 0% | Views, likes, comments per video |
| 61 | Revenue Analytics | ❌ Not Started | 0% | Earnings if applicable |
| **Dashboard Total** | | | **0%** | |
|  |
| **UI/UX & POLISH** |
| 62 | Loading States | ⚠️ Partial | 40% | Loader component exists, not everywhere |
| 63 | Error Handling | ⚠️ Partial | 50% | Basic error display, needs improvement |
| 64 | Toast Notifications | ❌ Not Started | 0% | Success/error/info notifications |
| 65 | Responsive Design | ⚠️ In Progress | 60% | Mobile responsive partially done |
| 66 | Dark Mode | ❌ Not Started | 0% | Theme toggle not implemented |
| 67 | Accessibility (A11y) | ❌ Not Started | 0% | ARIA labels, keyboard navigation |
| 68 | Performance Optimization | ⚠️ Partial | 30% | Basic optimization, needs lazy loading |
| 69 | SEO Optimization | ❌ Not Started | 0% | Meta tags, structured data |
| **Polish Total** | | | **27%** | |
|  |
| **API INTEGRATION** |
| 70 | User API endpoints | ✅ Complete | 100% | All user endpoints connected |
| 71 | Video API endpoints | ⚠️ Partial | 20% | List videos working, create/update/delete not used |
| 72 | Comment API endpoints | ⚠️ Partial | 20% | Functions exist, not integrated |
| 73 | Like API endpoints | ❌ Not Started | 0% | Not implemented |
| 74 | Playlist API endpoints | ❌ Not Started | 0% | Not implemented |
| 75 | Subscription API endpoints | ❌ Not Started | 0% | Not implemented |
| 76 | Tweet API endpoints | ❌ Not Started | 0% | Not implemented |
| 77 | Dashboard API endpoints | ❌ Not Started | 0% | Not implemented |
| **API Integration Total** | | | **30%** | |

---


