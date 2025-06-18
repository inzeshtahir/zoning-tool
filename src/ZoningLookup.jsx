import { useState } from "react";
import { zoningSummaries } from "./zoningData";
import { sendZoningReport } from "./emailService";

export default function ZoningLookup() {
  const [address, setAddress] = useState("");
  const [zoneCode, setZoneCode] = useState(null);
  const [zoningInfo, setZoningInfo] = useState(null);
  const [userInfo, setUserInfo] = useState({
    name: "",
    phone: "",
    email: "",
    interest: "",
  });

  const fetchZoneCode = () => {
    if (address.toLowerCase().includes("bank")) {
      const code = "N1A";
      setZoneCode(code);
      setZoningInfo(zoningSummaries[code]);
    } else {
      alert("Simulate an address like '123 Bank Street'");
    }
  };

  const handleSubmit = async () => {
    if (!userInfo.email || !userInfo.name) {
      alert("Please enter your full name and email");
      return;
    }
    await sendZoningReport(userInfo, zoningInfo);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded space-y-6 mt-6">
      <h1 className="text-2xl font-bold">Zoning Lookup Tool</h1>

      <div className="space-y-2">
        <input
          type="text"
          className="border p-2 w-full"
          placeholder="Enter your address (e.g., 123 Bank Street)"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button
          onClick={fetchZoneCode}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Get Zoning Code
        </button>
      </div>

      {zoneCode && zoningInfo && (
        <div className="bg-gray-50 p-4 border rounded space-y-2">
          <h2 className="font-semibold">Zoning Code: {zoneCode}</h2>
          <h3 className="text-lg">{zoningInfo.title}</h3>
          <ul className="list-disc ml-6">
            {zoningInfo.uses.map((use, i) => (
              <li key={i}>{use}</li>
            ))}
          </ul>
          <p><strong>Density:</strong> {zoningInfo.density}</p>
          <p><strong>Minimum Lot Size:</strong> {zoningInfo.minLotSize}</p>
        </div>
      )}

      {zoningInfo && (
        <div className="space-y-3">
          <input
            className="border p-2 w-full"
            placeholder="Full Name"
            value={userInfo.name}
            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
          />
          <input
            className="border p-2 w-full"
            placeholder="Email"
            value={userInfo.email}
            onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
          />
          <input
            className="border p-2 w-full"
            placeholder="Phone Number"
            value={userInfo.phone}
            onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
          />
          <select
            className="border p-2 w-full"
            value={userInfo.interest}
            onChange={(e) => setUserInfo({ ...userInfo, interest: e.target.value })}
          >
            <option value="">Select Interest</option>
            <option value="coach_house">Coach House</option>
            <option value="addition">Home Addition</option>
            <option value="custom_home">Custom Home</option>
            <option value="multi_units">Multi-Units</option>
          </select>
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
}
