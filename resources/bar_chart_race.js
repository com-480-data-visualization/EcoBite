window.addEventListener("productionDataLoaded", () => {
  const raw = window.productionData;
  // Convert wide to long
  const parsed = raw.flatMap(d =>
    Object.entries(d)
      .filter(([key]) => key.startsWith('Y'))
      .map(([key, val]) => ({
        item: d.Item,
        year: +key.slice(1),
        value: val === '' ? 0 : +val
      }))
  );
  // Group by year
  const dataByYear = d3.group(parsed, d => d.year);
  const years = Array.from(dataByYear.keys()).sort((a, b) => a - b);

  // Dimensions
  const margin = { top: 50, right: 150, bottom: 50, left: 150 };
  const width = 800 - margin.left - margin.right;
  const height = 600 - margin.top - margin.bottom;

  // SVG container
  const svg = d3.select("#bar-chart-race")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // Scales and axes
  const x = d3.scaleLinear().range([0, width]);
  const y = d3.scaleBand().range([0, height]).padding(0.1);
  const xAxis = svg.append("g").attr("transform", `translate(0,${height})`);
  const yAxis = svg.append("g");

  // Update function
  function update(year) {
    const yearData = Array.from(dataByYear.get(year) || [])
      .sort((a, b) => b.value - a.value)
      .slice(0, 10);

    x.domain([0, d3.max(yearData, d => d.value) || 0]);
    y.domain(yearData.map(d => d.item));

    xAxis.transition().duration(1000).call(d3.axisBottom(x).ticks(5));
    yAxis.transition().duration(1000).call(d3.axisLeft(y));

    // Bars
    const bars = svg.selectAll(".bar").data(yearData, d => d.item);
    bars.exit().transition().duration(1000).attr("width", 0).remove();
    const barsEnter = bars.enter()
      .append("rect")
      .attr("class", "bar")
      .attr("y", d => y(d.item))
      .attr("height", y.bandwidth())
      .attr("x", 0)
      .attr("width", 0);
    barsEnter.merge(bars)
      .transition().duration(1000)
      .attr("y", d => y(d.item))
      .attr("width", d => x(d.value));

    // Labels
    const labels = svg.selectAll(".label").data(yearData, d => d.item);
    labels.exit().transition().duration(1000).attr("x", 0).remove();
    const labelsEnter = labels.enter()
      .append("text")
      .attr("class", "label")
      .attr("y", d => y(d.item) + y.bandwidth() / 2 + 4)
      .attr("x", 0)
      .attr("text-anchor", "start");
    labelsEnter.merge(labels)
      .transition().duration(1000)
      .attr("y", d => y(d.item) + y.bandwidth() / 2 + 4)
      .attr("x", d => x(d.value) + 5)
      .text(d => d3.format(",")(d.value));

    // Year annotation
    const yearText = svg.selectAll(".yearText").data([year]);
    yearText.enter()
      .append("text")
      .attr("class", "yearText")
      .attr("x", width)
      .attr("y", height + margin.bottom - 10)
      .attr("text-anchor", "end")
      .attr("font-size", "48px")
      .attr("fill", "#cccccc")
      .merge(yearText)
      .text(year);
  }

  // Play/pause logic
  let i = 0;
  let interval;
  function play() {
    interval = d3.interval(() => {
      if (years.length === 0) return;
      update(years[i]);
      i = (i + 1) % years.length;
      if (i === years.length - 1) interval.stop();
    }, 1500);
  }
  function pause() {
    if (interval) interval.stop();
  }
  d3.select("#play").on("click", play);
  d3.select("#pause").on("click", pause);

  // Initialize
  update(years[0]);
});

