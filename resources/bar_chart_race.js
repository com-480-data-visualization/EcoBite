// Wait for the production data to be loaded
window.addEventListener("productionDataLoaded", () => {
  console.log("Starting bar chart race with production data");

  // Configuration
  const margin = { top: 80, right: 120, bottom: 50, left: 250 };
  const containerWidth = 1200;
  const containerHeight = 600;

  const config = {
    top_n: 12,
    tickDuration: 500,
    year: 1962,
    endYear: 2023,
    barPadding: (containerHeight - (margin.top + margin.bottom)) / (12 * 5),
    margin: margin
  };
  const width = containerWidth - margin.left - margin.right;
  const height = containerHeight - margin.top - margin.bottom;

  // Create SVG
  const svg = d3.select("#bar-chart-race")
    .append("svg")
    .attr("width", containerWidth)
    .attr("height", containerHeight)
    .style("background", "#fff")
    .style("border", "1px solid var(--color-secondary)")
    .style("border-radius", "5px");

  const g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // Title
  const title = svg.append("text")
    .attr("class", "scatter_title")
    .attr("x", containerWidth / 2)
    .attr("y", 40)
    .style("text-anchor", "middle")
    .text("Top Food Producers by Year");

  // Year label
  const yearText = svg.append("text")
    .attr("class", "yearText")
    .attr("x", width - margin.right)
    .attr("y", height - 25)
    .style("text-anchor", "end")
    .style("font-size", "64px")
    .style("font-weight", "bold")
    .style("fill", "var(--color-accent)")
    .style("opacity", 0.5)
    .text(config.year);

  // Process data
  let yearSlice = [];
  const foodColors = {};

  // Use custom color palette matching the theme
  const customColors = [
    "var(--color-primary)",      // Green
    "var(--color-accent)",       // Yellow
    "var(--color-secondary)",    // Brown
    "#4E8B5F",                   // Medium Green
    "#FFC947",                   // Light Yellow
    "#6B4226",                   // Medium Brown
    "#2E7D32",                   // Dark Green
    "#FFD770",                   // Pale Yellow
    "#8B6B4E",                   // Light Brown
    "#1B5E20",                   // Very Dark Green
    "#FFE599",                   // Very Light Yellow
    "#5D4037"                    // Dark Brown
  ];

  let colorIndex = 0;

  // Prepare data for each year
  for (let year = 1962; year <= 2023; year++) {
    const yearCol = `Y${year}`;
    const yearData = window.productionData
      .filter(d => d[yearCol] && !isNaN(d[yearCol]) && d[yearCol] > 0)
      .map(d => ({
        country: d.Area,
        food: d.Item,
        value: +d[yearCol],
        year: year,
        id: d.Area + "_" + d.Item
      }));

    // Group by food item and sum values
    const foodTotals = d3.rollup(yearData,
      v => d3.sum(v, d => d.value),
      d => d.food
    );

    // Convert to array and sort
    const sortedData = Array.from(foodTotals, ([food, value]) => ({ food, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, config.top_n)
      .map((d, i) => ({ ...d, rank: i }));

    yearSlice.push({
      year: year,
      data: sortedData
    });

    // Assign colors to foods
    sortedData.forEach(d => {
      if (!foodColors[d.food]) {
        foodColors[d.food] = customColors[colorIndex % customColors.length];
        colorIndex++;
      }
    });
  }

  // Scales
  const x = d3.scaleLinear()
    .domain([0, 1])
    .range([0, width]);

  const y = d3.scaleLinear()
    .domain([config.top_n, 0])
    .range([height, 0]);

  // X-axis
  const xAxis = d3.axisBottom(x)
    .ticks(5)
    .tickFormat(d3.format(".2s"))
    .tickSizeOuter(0);

  const xAxisG = g.append("g")
    .attr("class", "x-axis axis")
    .attr("transform", `translate(0,${height})`)
    .call(xAxis);

  // Add axis label
  g.append("text")
    .attr("class", "scatter_axis")
    .attr("x", width / 2)
    .attr("y", height + 40)
    .style("text-anchor", "middle")
    .text("Production (tons)");

  // Initialize bars
  g.selectAll(".bar")
    .data(yearSlice[0].data, d => d.food)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", 0)
    .attr("y", d => y(d.rank) + config.barPadding / 2)
    .attr("width", d => x(d.value))
    .attr("height", y(1) - y(0) - config.barPadding)
    .attr("rx", 4)
    .attr("ry", 4)
    .style("fill", d => foodColors[d.food])
    .style("opacity", 0.8);

  // Initialize labels
  g.selectAll(".label")
    .data(yearSlice[0].data, d => d.food)
    .enter()
    .append("text")
    .attr("class", "label")
    .attr("x", d => -8)
    .attr("y", d => y(d.rank) + (y(1) - y(0)) / 2 + 1)
    .style("text-anchor", "end")
    .style("font-weight", "bold")
    .style("font-size", "14px")
    .style("fill", "var(--color-secondary)")
    .text(d => d.food);

  // Initialize value labels
  g.selectAll(".valueLabel")
    .data(yearSlice[0].data, d => d.food)
    .enter()
    .append("text")
    .attr("class", "valueLabel")
    .attr("x", d => x(d.value) + 5)
    .attr("y", d => y(d.rank) + (y(1) - y(0)) / 2 + 1)
    .style("font-size", "13px")
    .style("fill", "var(--color-secondary)")
    .text(d => d3.format(",.0f")(d.value));

  // Animation function
  let ticker;
  let yearIndex = 0;

  function animate() {
    const yearData = yearSlice[yearIndex];
    config.year = yearData.year;

    // Update x scale domain
    x.domain([0, d3.max(yearData.data, d => d.value) * 1.1]);

    // Update x-axis with transition
    g.select(".x-axis")
      .transition()
      .duration(config.tickDuration)
      .ease(d3.easeLinear)
      .call(xAxis);

    // Update bars
    const bars = g.selectAll(".bar")
      .data(yearData.data, d => d.food);

    bars.enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", 0)
      .attr("y", d => y(config.top_n + 1))
      .attr("width", 0)
      .attr("height", y(1) - y(0) - config.barPadding)
      .attr("rx", 4)
      .attr("ry", 4)
      .style("fill", d => foodColors[d.food])
      .style("opacity", 0.8)
      .transition()
      .duration(config.tickDuration)
      .ease(d3.easeLinear)
      .attr("y", d => y(d.rank) + config.barPadding / 2)
      .attr("width", d => x(d.value));

    bars.transition()
      .duration(config.tickDuration)
      .ease(d3.easeLinear)
      .attr("y", d => y(d.rank) + config.barPadding / 2)
      .attr("width", d => x(d.value));

    bars.exit()
      .transition()
      .duration(config.tickDuration)
      .ease(d3.easeLinear)
      .attr("y", y(config.top_n + 1))
      .attr("width", 0)
      .remove();

    // Update labels
    const labels = g.selectAll(".label")
      .data(yearData.data, d => d.food);

    labels.enter()
      .append("text")
      .attr("class", "label")
      .attr("x", -8)
      .attr("y", y(config.top_n + 1))
      .style("text-anchor", "end")
      .style("font-weight", "bold")
      .style("font-size", "14px")
      .style("fill", "var(--color-secondary)")
      .text(d => d.food)
      .transition()
      .duration(config.tickDuration)
      .ease(d3.easeLinear)
      .attr("y", d => y(d.rank) + (y(1) - y(0)) / 2 + 1);

    labels.transition()
      .duration(config.tickDuration)
      .ease(d3.easeLinear)
      .attr("y", d => y(d.rank) + (y(1) - y(0)) / 2 + 1);

    labels.exit()
      .transition()
      .duration(config.tickDuration)
      .ease(d3.easeLinear)
      .attr("y", y(config.top_n + 1))
      .remove();

    // Update value labels
    const valueLabels = g.selectAll(".valueLabel")
      .data(yearData.data, d => d.food);

    valueLabels.enter()
      .append("text")
      .attr("class", "valueLabel")
      .attr("x", d => x(d.value) + 5)
      .attr("y", y(config.top_n + 1))
      .style("font-size", "13px")
      .style("fill", "var(--color-secondary)")
      .text(d => d3.format(",.0f")(d.value))
      .transition()
      .duration(config.tickDuration)
      .ease(d3.easeLinear)
      .attr("y", d => y(d.rank) + (y(1) - y(0)) / 2 + 1);

    valueLabels.transition()
      .duration(config.tickDuration)
      .ease(d3.easeLinear)
      .attr("x", d => x(d.value) + 5)
      .attr("y", d => y(d.rank) + (y(1) - y(0)) / 2 + 1)
      .tween("text", function(d) {
        const i = d3.interpolate(this.textContent.replace(/,/g, ""), d.value);
        return function(t) {
          this.textContent = d3.format(",.0f")(i(t));
        };
      });

    valueLabels.exit()
      .transition()
      .duration(config.tickDuration)
      .ease(d3.easeLinear)
      .attr("y", y(config.top_n + 1))
      .remove();

    // Update year text
    yearText.text(config.year);

    // Continue animation
    yearIndex++;
    if (yearIndex < yearSlice.length) {
      ticker = setTimeout(animate, config.tickDuration);
    } else {
      // Reset to beginning
      yearIndex = 0;
      setTimeout(() => {
        ticker = setTimeout(animate, config.tickDuration);
      }, 1000);
    }
  }

  // Control buttons
  let isPlaying = false;

  d3.select("#play").on("click", () => {
    if (!isPlaying) {
      isPlaying = true;
      animate();
    }
  });

  d3.select("#pause").on("click", () => {
    isPlaying = false;
    clearTimeout(ticker);
  });

  // Add some styling
  d3.select("#play")
    .style("margin", "10px")
    .style("padding", "10px 20px")
    .style("font-size", "16px")
    .style("cursor", "pointer");

  d3.select("#pause")
    .style("margin", "10px")
    .style("padding", "10px 20px")
    .style("font-size", "16px")
    .style("cursor", "pointer");
});

