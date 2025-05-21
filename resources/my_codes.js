//Draw bar chart
function drawBarChart(svgSelector, data, selectedYear) {
    const svg = d3.select(svgSelector)
                .attr("class", "map_bar_bg");
    svg.selectAll("*").remove();

    const width = +svg.attr("width");
    const height = +svg.attr("height");
    if (data.length > 0) {
            svg.append("text")
                .attr("x", width / 2)
                .attr("y", 20)
                .attr("text-anchor", "middle")
                .attr("class", "map_bar_title")
                .style("font-size", "18px")
                .style("font-weight", "bold")
                //.text(`Top 5 most produced items in ${data[0].area} \n ${selectedYear}`);
                .text(`${data[0].area} (${selectedYear})`);
    const margin = { top: 30, right: 5, bottom: 30, left: 170 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;


    const x = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value)])
        .range([0, chartWidth])

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
        .attr("class", "map_bar")
        .attr("y", d => y(d.item))
        .attr("width", d => x(d.value))
        .attr("height", y.bandwidth())
        //.attr("fill", (d, i) => color(i));
        .attr("fill", "#000000");

    // Labels (value)
    chart.selectAll("text.value")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "value")
        //.attr("x", d => x(d.value) + 5)
        //.attr("x", d => x(0) + 15 )
        .attr("x", d => {
            const barEnd = x(d.value);
            const textWidth = 35; // approx
            const padding =15;
            //Put it inside if there is space, if not outside
            return barEnd >textWidth+padding+10 ? barEnd - padding - textWidth : barEnd + padding;
        })
        .attr("y", d => y(d.item) + y.bandwidth() / 2 + 4)
        .text(d => d3.format(".2s")(d.value))
        .style("font-size", "16px")
        .attr("class", d => {
            const barEnd = x(d.value);
            const textWidth = 35; // approx
            const padding =15;
            //Put it inside if there is space, if not outside
            return barEnd >textWidth+padding+10 ? "map_bar_text1" : "map_bar_text2";
        });

    // Y axis
    chart.append("g")
        .attr("class", "axis")
        .call(d3.axisLeft(y))
        .selectAll("text")
        .attr("class", "map_bar_title")
        .style("font-size", "14px")
        .each(function(d) {
            const text=d3.select(this);
            text.text(null);
            const words = d.split(" ");

            //If its too long. crop it on or
            if (words.length > 7){
                const index = words.indexOf("or");
                if (index !== -1) {
                    words.splice(index);
                }
            }

            //split lable in two
            const firsthalf = words.slice(0, Math.ceil(words.length / 2));
            const secondhalf = words.slice( Math.ceil(words.length / 2), words.length);
            const name1 = firsthalf.join(" ");
            const name2 = secondhalf.join(" ");

            //console.log(words);

            //place it
            //if 2, in the middle of both
            if (name2 !== ""){
                text.append("tspan")
                            .text(name1)
                            .attr("x", -10)
                            .attr("dy", -5)
                text.append("tspan")
                            .text(name2)
                            .attr("x", -10)
                            .attr("dy", 15); // move down for second line
            //if one, in the middle of it
            } else {
                text.append("tspan")
                            .text(name1)
                            .attr("x", -10)
                            .attr("dy", 3)
            }


        })

    // X axis
    chart.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(0,${chartHeight})`)
        .call(d3.axisBottom(x).ticks(5).tickFormat(d3.format(".2s")))
        .selectAll("text")
        .attr("class", "map_bar_title")
        .style("font-size", "14px");


    } else {
        svg.append("text")
        .attr("x",250)
        .attr("y",150)
        .attr("text-anchor","middle")
        .style("font-size", "16px")
        .style("fill", "#000000")
        //.text("No information avaible.\nPlease select another country or anotkher year.")
        .selectAll("tspan")
        .data([
            "No information available.",
            "Please select a different country or year."
        ])
        .enter()
        .append("tspan")
        .attr("x", 250)  // Align all tspans to same x
        .attr("dy", (d, i) => i === 0 ? 0 : "1.2em")  // Line spacing
        .text(d => d);
    }

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




