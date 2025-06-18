export default function GoogleStyleHome({ onSearch }) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-white px-4">
        <h1 className="text-4xl font-semibold text-gray-800 mb-8">
          OGC Zoning Lookup
        </h1>
  
        <form
          className="w-full max-w-xl"
          onSubmit={(e) => {
            e.preventDefault();
            const input = e.target.elements.address.value.toLowerCase().trim();
            const zone = input.includes("bank") ? "N1A" : "R3Z";
            onSearch(input, zone);
          }}
        >
          <input
            name="address"
            type="text"
            placeholder="Enter your address"
            className="w-full border border-gray-300 rounded-full px-6 py-3 text-lg shadow focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button type="submit" className="hidden">Search</button>
        </form>
      </div>
    );
  }
  