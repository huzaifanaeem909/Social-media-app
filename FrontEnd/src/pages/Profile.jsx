import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ROUTES } from "../config";

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    bio: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch(API_ROUTES.PROFILE, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }

      const data = await response.json();
      setProfile(data);
      setFormData({
        first_name: data.first_name,
        last_name: data.last_name,
        bio: data.bio || "",
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToFeed = () => {
    navigate("/feed");
  };

  const handleEditClick = () => {
    setIsEditing(true); // Enable edit mode
  };

  const handleCancelClick = () => {
    setIsEditing(false); // Disable edit mode
    setFormData({
      first_name: profile.first_name,
      last_name: profile.last_name,
      bio: profile.bio || "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_ROUTES.PROFILE, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const updatedProfile = await response.json();
      setProfile(updatedProfile);
      setIsEditing(false); // Disable edit mode after successful update
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-80">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-200"></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-400"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Profile</h1>

        {/* Back to Feed Button */}
        <div className="flex justify-start mb-6">
          <button
            onClick={handleBackToFeed}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition-transform transform hover:scale-105"
          >
            Back to Feed
          </button>
        </div>

        {/* Profile Information */}
        {profile ? (
          <div className="border border-gray-200 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
            {isEditing ? (
              // Edit Form
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="first_name">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="last_name">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bio">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="4"
                  />
                </div>
                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    onClick={handleCancelClick}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg transition-transform transform hover:scale-105"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg transition-transform transform hover:scale-105"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              // Display Profile Information
              <>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {profile.first_name} {profile.last_name}
                </h2>
                <p className="text-gray-700 mb-4">{profile.bio || "No bio available."}</p>
                <p className="text-sm text-gray-500">Email: {profile.email}</p>
                <p className="text-sm text-gray-500">Username: {profile.username}</p>
                <p className="text-sm text-gray-500">Joined: {new Date(profile.created_at).toLocaleDateString()}</p>
                <div className="flex justify-start mt-6">
                  <button
                    onClick={handleEditClick}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition-transform transform hover:scale-105"
                  >
                    Update Profile
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <p className="text-center text-gray-500">No profile data available.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
