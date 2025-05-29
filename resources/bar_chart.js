// Listen for the custom event
window.addEventListener("bananaDataLoaded", () => {
    console.log("Banana Data:", window.bananaData);

    const variables = ["emissions_kg", "land_use_kg"]; // Variables to choose from

    // Create a container for filters
    const filterContainer = d3.select("#food-comparison")
        .append("div")
        .attr("class", "filter-container");

    // Move variable selector to its own div for positioning
    const variableSelector = filterContainer.append("div")
        .attr("class", "variable-selector");

    variableSelector.append("label")
        .text("Select Variable: ")
        .style("margin-right", "10px");

    const variableDropdown = variableSelector.append("select")
        .attr("id", "variable-dropdown")
        .on("change", updateChart);

    variableDropdown.selectAll("option")
        .data(variables)
        .enter()
        .append("option")
        .text(d => d)
        .attr("value", d => d);

    // --- Move filter label and clear button below variable selector ---
    const filterRow = filterContainer.append("div")
        .style("margin-top", "16px")
        .style("margin-bottom", "4px");

    filterRow.append("label")
        .text("Filter food options: ")
        .style("margin-right", "10px");

    // Clear All button
    const clearBtn = filterRow.append("button")
        .text("Clear All")
        .attr("type", "button")
        .style("margin-left", "10px")
        .on("click", () => {
            selectedItems.clear();
            searchInput.property("value", "");
            renderChecklist([]);
            updateChart();
        });

    // --- Search bar and dropdown below filter row ---
    // Search bar
    const searchInput = filterContainer.append("input")
        .attr("type", "text")
        .attr("placeholder", "Search foods...")
        .attr("id", "food-search")
        .style("margin-right", "10px")
        .on("input", filterFoodList);

    // Dropdown checklist container using <details> (placed directly after search bar)
    const details = filterContainer.append("details")
        .style("display", "block")
        .style("margin-top", "4px")
        .attr("id", "food-dropdown");

    details.append("summary")
        .text("See food options")
        .style("cursor", "pointer")
        .style("font-size", "14px")
        .style("outline", "none");

    // Checklist container inside the dropdown, scrollable
    const checklistContainer = details.append("div")
        .attr("id", "item-checklist")
        .style("padding", "8px 0")
        .style("max-height", "200px") // Set max height for scroll
        .style("overflow-y", "auto");

    const uniqueItems = [...new Set(window.bananaData.map(d => d.entity))];
    let selectedItems = new Set(); // Start with nothing selected

    // Render checklist (initially empty)
    function renderChecklist(filteredItems) {
        checklistContainer.html(""); // Clear previous
        filteredItems.forEach(item => {
            const label = checklistContainer.append("label")
                .style("margin-right", "10px")
                .style("font-size", "14px")
                .style("display", "block");
            label.append("input")
                .attr("type", "checkbox")
                .attr("class", "item-checkbox")
                .attr("value", item)
                .property("checked", selectedItems.has(item))
                .on("change", function() {
                    if (this.checked) {
                        selectedItems.add(item);
                    } else {
                        selectedItems.delete(item);
                    }
                    updateChart();
                });
            label.append("span").text(item);
        });
    }

    // Filter checklist as you type
    function filterFoodList() {
        const query = searchInput.property("value").toLowerCase();
        if (query.length === 0) {
            renderChecklist([]); // Show nothing if search is empty
        } else {
            const filtered = uniqueItems.filter(item => item.toLowerCase().includes(query));
            renderChecklist(filtered);
        }
    }

    // Initial render: show nothing
    renderChecklist([]);

    // Initial chart rendering
    updateChart();

    function updateChart() {
        const selectedVariable = d3.select("#variable-dropdown").property("value");
        // Use selectedItems set
        const foodData = window.bananaData
            .filter(d => selectedItems.has(d.entity))
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
        const margin = { top: 20, right: 30, bottom: 60, left: 60 }; // bottom was 30, now 60
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
            .attr("class", "axis")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x))
            .selectAll("text")
            .style("font-size", "14px")
            .style("fill", "#4E1F00"); // Match scatter axis color

        g.append("g")
            .attr("class", "axis")
            .call(d3.axisLeft(y))
            .selectAll("text")
            .style("font-size", "14px")
            .style("fill", "#4E1F00"); // Match scatter axis color

        // X axis label
        g.append("text")
            .attr("class", "scatter_axis")
            .attr("x", width / 2)
            .attr("y", height + margin.bottom) // moved lower
            .attr("text-anchor", "middle")
            .text("Food");

        // Y axis label
        g.append("text")
            .attr("class", "scatter_axis")
            .attr("transform", "rotate(-90)")
            .attr("x", -height / 2)
            .attr("y", -margin.left + 18)
            .attr("text-anchor", "middle")
            .text(selectedVariable === "emissions_kg" ? "Emissions (kg CO₂e)" : "Land Use (m²/yr)");

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
