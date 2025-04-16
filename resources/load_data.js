// Make the dataset globally accessible via window
window.productionData = [];
window.bananaData = [];

// Load the production data
d3.csv("https://raw.githubusercontent.com/com-480-data-visualization/EcoBite/master/data/Country_only_Production_tons_FAOSTAT.csv")
  .then(data => {
    window.productionData = data;
    console.log("Production Data loaded:", data.length, "rows");
  })
  .catch(error => {
    console.error("Failed to load production data:", error);
  });

// Load the banana data
d3.csv("https://raw.githubusercontent.com/com-480-data-visualization/EcoBite/master/data/bananaindex.csv")
  .then(data => {
    window.bananaData = data;
    console.log("Banana Data loaded:", data.length, "rows");

    // Dispatch a custom event to notify that the data is ready
    const event = new Event("bananaDataLoaded");
    window.dispatchEvent(event);
  })
  .catch(error => {
    console.error("Failed to load banana data:", error);
  });

