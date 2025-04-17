//Draw bar chart
function drawBarChart(svgSelector, data, selectedYear) {
    const svg = d3.select(svgSelector);
    svg.selectAll("*").remove();

    const width = +svg.attr("width");
    const height = +svg.attr("height");
    if (data.length > 0) {
            svg.append("text")
                .attr("x", width / 2)
                .attr("y", 16)
                .attr("text-anchor", "middle")
                .style("font-size", "16px")
                .style("font-weight", "bold")
                .text(`Top 5 most produced items in ${data[0].area} \n ${selectedYear}`);
    }
    const margin = { top: 20, right: 20, bottom: 40, left: 150 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const x = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value)])
        .range([0, chartWidth]);

    const y = d3.scaleBand()
        .domain(data.map(d => d.item))
        .range([0, chartHeight])
        .padding(0.2);

    const color = d3.scaleOrdinal(d3.schemeSet2);

    const chart = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Bars
    chart.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("y", d => y(d.item))
        .attr("width", d => x(d.value))
        .attr("height", y.bandwidth())
        .attr("fill", (d, i) => color(i));

    // Labels (value)
    chart.selectAll("text.value")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "value")
        .attr("x", d => x(d.value) + 5)
        .attr("y", d => y(d.item) + y.bandwidth() / 2 + 4)
        .text(d => d3.format(".2s")(d.value))
        .style("font-size", "12px");

    // Y axis
    chart.append("g")
        .call(d3.axisLeft(y));

    // X axis
    chart.append("g")
        .attr("transform", `translate(0,${chartHeight})`)
        .call(d3.axisBottom(x).ticks(5).tickFormat(d3.format(".2s")));
}

//to check if the data is loaded.
//not used now, used in hte past and maybe usefull in hte future
function when_bananaFaostatData_Ready(callback) {
      if (window.bananaFaostatData.length > 0) {
              callback(1);
              callback(2);
              callback(3);
            } else {
                    setTimeout(() => when_bananaFaostatData_Ready(callback), 100); // wait and retry
                  }
}


//get the top items from the selected area and year
function top_items(howMany, areaCode, year) {                                                                                                                                                
    const yearKey = `Y${year}`;                                                                                                                                                                         
    const filtered = window.productionData.filter(d =>                                                                                                                                                  
        d["Area Code (M49)"] === areaCode &&                                                                                                                                                            
        d.Element === "Production" &&                                                                                                                                                                   
        d[yearKey] !== ""                                                                                                                                                                               
    );                                                                                                                                                                                                  

    const top5 = filtered                                                                                                                                                                               
        .map(d => ({                                                                                                                                                                                    
            item: d.Item,                                                                                                                                                                               
            value: +d[yearKey],                                                                                                                                                                         
            area: d.Area                                                                                                                                                                                
        }))                                                                                                                                                                                             
        .sort((a, b) => b.value - a.value)                                                                                                                                                              
        .slice(0, howMany);                                                                                                                                                                                   

    return top5;                                                                                                                                                                                        
}                                                                                                                                                                                                       




