// Listen for the custom event
window.addEventListener("bananaDataLoaded", () => {
    console.log("Banana Data:", window.bananaData);

    const variables = ["emissions_kg", "land_use_kg"]; // Variables to choose from

    // Create a container for filters
    const filterContainer = d3.select("#food-comparison")
        .append("div")
        .attr("class", "filter-container")
        .style("margin-bottom", "20px");

    // Dropdown for selecting the variable
    filterContainer.append("label")
        .text("Select Variable: ")
        .style("margin-right", "10px");

    const variableDropdown = filterContainer.append("select")
        .attr("id", "variable-dropdown")
        .on("change", updateChart);

    variableDropdown.selectAll("option")
        .data(variables)
        .enter()
        .append("option")
        .text(d => d)
        .attr("value", d => d);

    // Dropdown checklist for selecting items
    filterContainer.append("label")
        .text("Select Items: ")
        .style("margin-left", "20px")
        .style("margin-right", "10px");

    const uniqueItems = [...new Set(window.bananaData.map(d => d.entity))]; // Get unique entities

    const itemDropdown = filterContainer.append("select")
        .attr("id", "item-dropdown")
        .attr("multiple", true) // Allow multiple selections
        .style("width", "200px")
        .style("height", "100px") // Adjust height to show multiple options
        .on("change", updateChart);

    itemDropdown.selectAll("option")
        .data(uniqueItems)
        .enter()
        .append("option")
        .text(d => d)
        .attr("value", d => d);

    // Initial chart rendering
    updateChart();

    function updateChart() {
        const selectedVariable = d3.select("#variable-dropdown").property("value");

        // Get selected items from the dropdown
        const selectedItems = Array.from(
            d3.select("#item-dropdown").node().selectedOptions
        ).map(option => option.value);

        // Filter the data for the selected items
        const foodData = window.bananaData
            .filter(d => selectedItems.includes(d.entity)) // Filter by selected items
            .map(d => ({
                food: d.entity,
                value: +d[selectedVariable] // Convert the selected variable to a number
            }));

        console.log("Filtered Food Data:", foodData);

        // Clear the existing chart
        d3.select("#food-comparison-chart").selectAll("*").remove();

        const chartContainer = d3.select("#food-comparison-chart");
        const containerWidth = document.getElementById("food-comparison").offsetWidth;
        const containerHeight = 300;
        const margin = { top: 20, right: 30, bottom: 30, left: 60 };
        const width = containerWidth - margin.left - margin.right;
        const height = containerHeight - margin.top - margin.bottom;

        const svg = chartContainer
            .attr("width", containerWidth)
            .attr("height", containerHeight);

        const g = svg.append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const x = d3.scaleBand()
            .domain(foodData.map(d => d.food))
            .rangeRound([0, width])
            .padding(0.1);

        const y = d3.scaleLinear()
            .domain([0, d3.max(foodData, d => d.value)])
            .rangeRound([height, 0]);

        g.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x))
            .selectAll("text")
            .style("font-size", "12px");

        g.append("g")
            .call(d3.axisLeft(y))
            .selectAll("text")
            .style("font-size", "12px");

        g.selectAll(".bar")
            .data(foodData)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", d => x(d.food))
            .attr("y", d => y(d.value))
            .attr("width", x.bandwidth())
            .attr("height", d => height - y(d.value))
            .attr("fill", "steelblue");
    }
});
