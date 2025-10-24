import axios from "axios";

const API_URL=`${import.meta.env.VITE_USER_baseURL}`;

const API= axios.create(
    {
        baseURL:`${API_URL}`,
        withCredentials: true
    }
)

 export const getUserProfile= async ()=>{
    return await API.get("/profile")
}

export const updateAccount = async (data) => {
  return await API.put("/update-account", data);
};

export const updateAvatar = async (formData) => {
  return await API.patch("/avatar", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const updateCoverImage = async (formData) => {
  return await API.patch("/cover-image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const getUserVideos = async (userId) => {
  return await API.get(`/${userId}/videos`);
};


export const deleteVideo = async (videoId) => {
  return await API.delete(`/videos/${videoId}`);
};

export const logoutUser = async () => {
  return await API.post("/logout");
};
