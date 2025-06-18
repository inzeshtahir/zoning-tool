export function sendZoningReport(userInfo, zoningInfo) {
    console.log("Sending zoning report to:", userInfo.email);
    console.log("With info:", zoningInfo);
    alert(`Zoning report sent to ${userInfo.email}!`);
    return Promise.resolve();
  }
  