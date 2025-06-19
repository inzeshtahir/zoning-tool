import { useEffect, useState } from "react";
import { zoningSummaries } from "./zoningData";
import { fetchZoneCode } from "./fetchZoneCode";
import AddressSearch from "./AddressSearch";

function App() {
  const [address, setAddress] = useState("");
  const [zone, setZone] = useState(null);
  const [error, setError] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState("");

  // 🧠 Load Karmaflow Chatbot Script
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://chat.karmaflow.ai/widget/chat-widget.js?tenantId=67e4c2c170678a3b5323de00&agentId=681634b1b1854bc258596363&collapseWidth=767&linkId=openChat";
    script.async = true;
    document.body.appendChild(script);

    const chatDiv = document.createElement("div");
    chatDiv.id = "openChat";
    document.body.appendChild(chatDiv);
  }, []);

  const handleSubmitReport = () => {
    if (!name || !phone || !interest) {
      alert("Please fill in your name, phone number, and interest.");
      return;
    }

    const message = `
      Name: ${name}
      Phone: ${phone}
      Interest: ${interest}
      Zone: ${zone?.code}
      Summary: ${zone?.title}
    `;

    console.log("Zoning report (not emailed):", message);
    alert("Zoning report submitted successfully!");
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-start pt-24 px-4 text-gray-900">
      <h1 className="text-4xl font-light mb-10">Ottawa Zoning Lookup</h1>

      <AddressSearch
        onSelect={async ({ lat, lng, label }) => {
          setAddress(label);
          setZone(null);
          setError("");

          const zoneCode = await fetchZoneCode(lat, lng);
          if (!zoneCode) {
            setError("No zoning info found for this address.");
            return;
          }

          const summary = zoningSummaries[zoneCode];
          if (!summary) {
            setError(`Zone "${zoneCode}" found, but not listed in database.`);
            return;
          }

          setZone({ code: zoneCode, ...summary });
          setRecentSearches((prev) => [...prev, { address: label, zone: zoneCode }]);
        }}
      />

      {error && <p className="text-red-500 mt-6 text-sm">{error}</p>}

      {zone && (
        <div className="mt-10 w-full max-w-xl bg-gray-50 border rounded-lg p-6 shadow">
          <h2 className="text-xl font-semibold mb-3">Zoning Code: {zone.code}</h2>
          <p><strong>Summary:</strong> {zone.title}</p>
          <p className="mt-2"><strong>Permitted Uses:</strong> {zone.permittedUses?.join(", ") || "N/A"}</p>
          <p className="mt-2"><strong>Rules:</strong> {zone.rules?.join(", ") || "N/A"}</p>

          <hr className="my-6" />

          <h3 className="text-md font-semibold mb-2">Get a Zoning Report</h3>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            className="w-full p-3 border border-gray-300 rounded mb-2"
          />
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Your Phone Number"
            className="w-full p-3 border border-gray-300 rounded mb-2"
          />
          <select
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded mb-4"
          >
            <option value="">Select Your Interest</option>
            <option value="Coach House">Coach House</option>
            <option value="Home Addition">Building a Home Addition</option>
            <option value="Custom Home">Building a Custom Home</option>
            <option value="Multiunits">Building Multiunits</option>
          </select>

          <button
            onClick={handleSubmitReport}
            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-full font-medium"
          >
            Submit Zoning Report Request
          </button>

          {/* Chat Trigger */}
          <button
            onClick={() => document.getElementById("openChat")?.click()}
            className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-full shadow-lg z-50"
          >
            Chat with a Consultant
          </button>
        </div>
      )}

      {recentSearches.length > 0 && (
        <div className="mt-8 max-w-xl w-full text-sm text-gray-600">
          <h3 className="font-semibold mb-2">Recent Searches</h3>
          <ul className="list-disc list-inside">
            {recentSearches.map((item, i) => (
              <li key={i}>{item.address} → Zone {item.zone}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
