// Make the dataset globally accessible via window
window.productionData = [];
window.bananaData = [];

// Load the cleaned FAOSTAT dataset
d3.csv("https://raw.githubusercontent.com/com-480-data-visualization/EcoBite/master/data/Country_only_Production_tons_FAOSTAT.csv")
  .then(data => {
    window.productionData = data;
    console.log("Clean FAOSTAT dataset loaded:", data.length, "rows");
  })
  .catch(error => {
    console.error("Failed to load clean FAOSTAT dataset:", error);
  });

// Load the cleaned and combined banan index and FAOSTAT dataset 
d3.csv("https://raw.githubusercontent.com/com-480-data-visualization/EcoBite/master/data/world_Production_tons_FAOSTAT_bananaIndex.csv")
  .then(data => {
    window.bananaFaostatData = data;
    console.log("Clean and combined  banan index and FAOSTAT dataset loaded:", data.length, "rows");
  })
  .catch(error => {
    console.error("Failed to load clean and combined banana index and FAOSTAT dataset:", error);
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

