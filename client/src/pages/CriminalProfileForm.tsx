import React, { useState } from "react";
import api from "@/lib/api";

const CriminalProfileForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    alias: "",
    description: "",
    crimes: "",
    caseID: "",
    gender: "male",
    chargedToCourt: false,
    bailed: false,
    status: "under_investigation",
    surety: {
      fullName: "",
      address: "",
      phoneNumber: "",
    },
  });

  const [photo, setPhoto] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target;
    const { name, value } = target;

    let inputValue: string | boolean = value;

    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      inputValue = target.checked;
    }

    if (name.startsWith("surety.")) {
      const key = name.split(".")[1];
      setFormData(prev => ({
        ...prev,
        surety: {
          ...prev.surety,
          [key]: inputValue as string,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: inputValue,
      }));
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.bailed) {
      const { fullName, address, phoneNumber } = formData.surety;
      if (!fullName || !address || !phoneNumber) {
        setMessage("Surety details are required when bailed is true.");
        return;
      }
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("alias", formData.alias);
    data.append("description", formData.description);
    data.append("crimes", JSON.stringify(formData.crimes.split(",").map((c) => c.trim())));
    data.append("caseID", formData.caseID);
    data.append("gender", formData.gender);
    data.append("chargedToCourt", formData.chargedToCourt ? "true" : "false");
    data.append("bailed", formData.bailed ? "true" : "false");
    data.append("status", formData.status);

    if (formData.bailed) {
      data.append("surety.fullName", formData.surety.fullName);
      data.append("surety.address", formData.surety.address);
      data.append("surety.phoneNumber", formData.surety.phoneNumber);
    }

    if (photo) {
      data.append("photo", photo);
    }

    try {
      await api.post("criminals", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("Criminal profile created successfully!");
    } catch (error) {
      setMessage("Failed to create profile.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Criminals/Suspects Profile Form</h1>
      {message && <p className="mb-4 text-blue-500 font-semibold">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block font-semibold">Full Name</label>
          <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full border rounded p-2" />
        </div>

        <div>
          <label className="block font-semibold">Alias</label>
          <input type="text" name="alias" value={formData.alias} onChange={handleChange} className="w-full border rounded p-2" />
        </div>

        <div>
          <label className="block font-semibold">Description</label>
          <textarea name="description" required rows={4} value={formData.description} onChange={handleChange} className="w-full border rounded p-2" />
        </div>

        <div>
          <label className="block font-semibold">Known Crimes</label>
          <input type="text" name="crimes" value={formData.crimes} onChange={handleChange} placeholder="e.g. Theft, Fraud" className="w-full border rounded p-2" />
        </div>

        <div>
          <label className="block font-semibold">Case ID</label>
          <input type="text" name="caseID" required value={formData.caseID} onChange={handleChange} placeholder="e.g. CASE123456" className="w-full border rounded p-2" />
        </div>

        {/* ✅ Gender Dropdown */}
        <div>
          <label className="block font-semibold">Gender</label>
          <select name="gender" value={formData.gender} onChange={handleChange} className="w-full border rounded p-2">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        {/* Status Dropdown */}
        <div>
          <label className="block font-semibold">Status</label>
          <select name="status" value={formData.status} onChange={handleChange} className="w-full border rounded p-2">
            <option value="under_investigation">Under Investigation</option>
            <option value="detained">Detained</option>
            <option value="bailed">Bailed</option>
            <option value="charged">Charged to Court</option>
            <option value="released">Released</option>
            <option value="dismissed">Dismissed</option>
          </select>
        </div>

        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input type="checkbox" name="chargedToCourt" checked={formData.chargedToCourt} onChange={handleChange} className="mr-2" />
            Charged to Court
          </label>
          <label className="flex items-center">
            <input type="checkbox" name="bailed" checked={formData.bailed} onChange={handleChange} className="mr-2" />
            Bailed
          </label>
        </div>

        {formData.bailed && (
          <div className="space-y-4 bg-gray-50 p-4 rounded border">
            <h3 className="font-bold text-gray-700">Surety Information</h3>
            <input type="text" name="surety.fullName" placeholder="Full Name" required value={formData.surety.fullName} onChange={handleChange} className="w-full border rounded p-2" />
            <input type="text" name="surety.address" placeholder="Address" required value={formData.surety.address} onChange={handleChange} className="w-full border rounded p-2" />
            <input type="text" name="surety.phoneNumber" placeholder="Phone Number" required value={formData.surety.phoneNumber} onChange={handleChange} className="w-full border rounded p-2" />
          </div>
        )}

        <div>
          <label className="block font-semibold">Photo</label>
          <input type="file" accept="image/*" onChange={handlePhotoChange} className="w-full" />
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Submit Profile
        </button>
      </form>
    </div>
  );
};

export default CriminalProfileForm;
