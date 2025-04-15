      // Make the dataset globally accessible via window
      window.productionData = [];

        // Load the CSV from the raw GitHub URL (not the regular GitHub page URL!)
        d3.csv("https://raw.githubusercontent.com/com-480-data-visualization/EcoBite/master/data/Country_only_Production_tons_FAOSTAT.csv")
          .then(data => {
                    window.productionData = data;
                    console.log("Data loaded:", data.length, "rows");
                  })
          .catch(error => {
                    console.error("Failed to load data:", error);
                  });


