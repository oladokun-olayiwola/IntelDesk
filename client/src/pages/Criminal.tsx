import React, { useState } from "react";
import axios from "axios";

const CriminalProfileForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    alias: "",
    description: "",
    crimes: "",
  });
  const [photo, setPhoto] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("alias", formData.alias);
    data.append("description", formData.description);
    data.append("crimes", formData.crimes);
    if (photo) data.append("photo", photo);

    try {
      const res = await axios.post("/api/criminals", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("Criminal profile created successfully!");
    } catch (error) {
      setMessage("Failed to create profile.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Criminal Profile Form</h1>
      {message && <p className="mb-4 text-blue-500 font-semibold">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-gray-700 font-semibold">Full Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full border rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold">Alias/Nickname</label>
          <input
            type="text"
            name="alias"
            value={formData.alias}
            onChange={handleChange}
            className="mt-1 block w-full border rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold">Description</label>
          <textarea
            name="description"
            required
            rows={4}
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full border rounded-md p-2"
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold">Known Crimes</label>
          <input
            type="text"
            name="crimes"
            value={formData.crimes}
            onChange={handleChange}
            placeholder="e.g., Theft, Assault"
            className="mt-1 block w-full border rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold">Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="mt-1 block w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Profile
        </button>
      </form>
    </div>
  );
};

export default CriminalProfileForm;
