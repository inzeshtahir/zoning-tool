export async function fetchZoneCode(lat, lng) {
    const url = new URL("https://maps.ottawa.ca/arcgis/rest/services/Zoning/MapServer/identify");
  
    url.search = new URLSearchParams({
      f: "json",
      tolerance: "3",
      returnGeometry: "false",
      imageDisplay: "800,600,96",
      mapExtent: `${lng - 0.01},${lat - 0.01},${lng + 0.01},${lat + 0.01}`,
      geometry: `${lng},${lat}`,
      geometryType: "esriGeometryPoint",
      sr: "4326"
    });
  
    try {
      const res = await fetch(url);
      const data = await res.json();
      const zone = data?.results?.[0]?.attributes?.ZONE_CODE || data?.results?.[0]?.attributes?.zone_code;
      if (zone) {
        console.log(`✅ Found zoning code: ${zone}`);
        return zone;
      } else {
        console.warn("No zoning features returned in 'results'.", data);
      }
    } catch (error) {
      console.error("Failed to fetch zoning info from Ottawa API:", error);
    }
  
    return null;
  }
  