const getUserIdFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const payload = JSON.parse(atob(token.split(".")[1]));

  return payload._id;
};

const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/users`;

const show = async (userId) => {
  try {
    const userId = getUserIdFromToken();
    if (!userId) {
      throw new Error("User ID not found in token");
    }
    const res = await fetch(`${BASE_URL}/${userId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    return res.json();
  } catch (error) {
    console.error(error);
  }
};

export default { show };
