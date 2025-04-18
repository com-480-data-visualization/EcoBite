
//to ensure it only draws when all the data is loaded
when_bananaFaostatData_Ready(draw_scatter);

function draw_scatter(scatterChart_idx){
    //Draws the scatter plot of production vs banana index. The banana index used is defined by the variable scatterChart_idx

    //Do everything inside the div. this is needed to use tooltips to display info of eahc point
    const svg = d3.select("#div_scatter_banana_faostat"+scatterChart_idx)
    .append("svg")
    .attr("id", "scatter_banana_faostat"+scatterChart_idx)
    .attr("width", 550)
    .attr("height", 600);

    //a normal svg tag
    const svgScatter = d3.select("#scatter_banana_faostat"+scatterChart_idx);
    const widthScatter = +svgScatter.attr("width");
    const heightScatter = +svgScatter.attr("height");


    const margin = { top: 40, right: 40, bottom: 60, left: 60 };

    const innerWidth = widthScatter - margin.left - margin.right;
    const innerHeight = heightScatter - margin.top - margin.bottom;

    const g = svgScatter.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    //controls which banan index is used
    let bananaIndex;
    //Relationship between the banana index used and the index on the div
    if (scatterChart_idx == 1){
        bananaIndex = "Bananas index (kg)"
    } else if (scatterChart_idx == 2){
        bananaIndex = "Bananas index (1000 kcal)"
    } else {
        bananaIndex = "Bananas index (100g protein)"
    };

    //filter the data 
    const data = window.bananaFaostatData.filter(d =>                                                                                                                                               
        d["Production"] !== "" &&   
        d[bananaIndex] !== "" &&      
        +d["Production"] > 0 &&
        +d[bananaIndex] > 0
    );                    
   
    //scale x
    // logarithmic scale due to data dispersion
    // maybe there is a better way to display
    const x = d3.scaleLog()                                                                                                                                                                     
        .domain(d3.extent(data, d => +d["Production"]))
        .range([0, innerWidth])                                                                                                                                                                       
        .nice();             

    //scale y
    const y = d3.scaleLog()
        .domain(d3.extent(data, d => +d[bananaIndex]))
        .range([innerHeight, 0])
        .nice()


    // Horizontal grid
    g.append("g")
        .attr("class", "grid grid-horizontal")
        .call(
            d3.axisLeft(y)
            .tickSize(-innerWidth) // ← extend ticks across the width
            .tickFormat("")        // ← hide labels
        )
        .selectAll("Line")
        .style("stroke", "#A9A9A9");

    // Vertical grid
    g.append("g")
        .attr("class", "grid grid-vertical")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(
            d3.axisBottom(x)
            .tickSize(-innerHeight) // ← extend ticks upward
            .tickFormat("")         // ← hide labels
        )
        .selectAll("Line")
        .style("stroke", "#A9A9A9");

    //Axes
    g.append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(d3.axisBottom(x).ticks(10, "~s") );
    g.append("g")
        .call(d3.axisLeft(y).ticks(10,"~s") );

    //Axes labels
    svgScatter.append("text")
        .attr("x", widthScatter / 2)
        .attr("y", heightScatter -10)
        .attr("text-anchor", "middle")
        .text("Production [log scale]")

    svgScatter.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -heightScatter / 2)
        .attr("y", 15)
        .attr("text-anchor", "middle")
        .text(bananaIndex + " [log scale]")

    //tooltip to display info of each point 
    const tooltip = d3.select("#div_scatter_banana_faostat"+scatterChart_idx)
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "1px")
        .style("border-radius", "5px")
        .style("padding", "10px");

    //show info when is on
    const mouseover = function(d) {
        tooltip.style("opacity", 1);
    };

    //where to show info
    const mousemove = function(event, d) {
        tooltip
            .html("<b> "+ d["Item"] + " </b> <br/> Production: "+d["Production"]+ "<br/> "+bananaIndex+": "+d[bananaIndex] )
            .style("left", (event.pageX + 10) + "px" )
            .style("top", (event.pageY + 10) + "px" );
    };

    //hide info 
    const mouseleave = function(d) {
        tooltip
            .transition()
            .duration(200)
            .style("opacity", 0);
    };

    // Add the points
    g.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => x(+d["Production"]) )
        .attr("cy", d => y(+d[bananaIndex]) )
        .attr("r", 5)
        //.attr("fill", "#69b3a2");
        .style("fill", d => d["Item"] === "Bananas" ? "#ff0000" : "#69b3a2")
        .style("opacity", 0.7)
        .style("stroke", "white")
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave);








}



