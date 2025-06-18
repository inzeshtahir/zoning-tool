export async function geocodeAddress(address) {
    const url = new URL("https://nominatim.openstreetmap.org/search");
    url.search = new URLSearchParams({
      q: address,
      format: "json",
      addressdetails: 1,
      limit: 1
    });
  
    const res = await fetch(url);
    const data = await res.json();
  
    if (data.length === 0) throw new Error("Address not found");
  
    const { lat, lon } = data[0];
    return { lat, lng: lon };
  }
  