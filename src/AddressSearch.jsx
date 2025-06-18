import { useEffect, useState } from "react";

export default function AddressSearch({ onSelect }) {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (input.length < 3) return;

    const timeout = setTimeout(() => {
      fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(input + ", Ottawa")}&format=json&addressdetails=1&limit=5`)
        .then(res => res.json())
        .then(setSuggestions)
        .catch(console.error);
    }, 500);

    return () => clearTimeout(timeout);
  }, [input]);

  return (
    <div className="relative w-full max-w-xl">
      <input
        type="text"
        className="w-full px-5 py-4 border border-gray-300 rounded-full text-lg"
        placeholder="Start typing an address..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded shadow">
          {suggestions.map((s, i) => (
            <li
              key={i}
              onClick={() => {
                setInput(s.display_name);
                setSuggestions([]);
                onSelect({ label: s.display_name, lat: parseFloat(s.lat), lng: parseFloat(s.lon) });
              }}
              className="p-2 cursor-pointer hover:bg-gray-100"
            >
              {s.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

