const svgMAP = d3.select("#map");
const widthMAP = +svgMAP.attr("width");
const heightMAP = +svgMAP.attr("height");

const projection = d3.geoNaturalEarth1()
    .scale(100)
    .translate([widthMAP / 2, heightMAP / 2]);

const path = d3.geoPath().projection(projection);

let active_chart_idx = 0;

let selectedCountries = [];
const color = d3.scaleOrdinal(d3.schemeTableau10);
const countryList = d3.select("#country-list");

d3.json("https://unpkg.com/world-atlas@1.1.4/world/110m.json").then(worldData => {
    const countries = topojson.feature(worldData, worldData.objects.countries).features;

    //Fix inconsistent M49 codes from the dataset with the map
    const idFixes = {
          "729": "736", // Sudan 
          "728": "736", // south sudan became Sudan
        //Maybe more will be added in the future if found and needed
         };

    svgMAP.append("g")
        .selectAll("path")
        .data(countries)
        .join("path")
        .attr("class", "country")
        .attr("d", path)
        .attr("fill", "#000000")
        .attr("stroke", "#FEBA17")
        .attr("stroke-width", 0.5)
        .style("cursor", "pointer")
        .on("click", function (event, d) {
            const id = d.id; //m49 code as id
            handle_selected_country(id); //whne a country is slected pass the m49 code as id
            d3.select(this).attr("fill", "#008112");
        });



    svgMAP.append("defs").append("clipPath")
        .attr("id", "clip-circle")
        .append("circle")
        .attr("id", "clip-circle-shape")
        .attr("r", 20) // radius of magnifier
        .attr("cx", -999) // start offscreen
        .attr("cy", -999);

    const zoomedMap = svgMAP.append("g")
        .attr("class", "zoomed-map")
        .attr("clip-path", "url(#clip-circle)")
        .attr("pointer-events", "none");


    zoomedMap.selectAll("path")
        .data(countries)
        .join("path")
        .attr("d", path)
        .attr("class", "country_zoom")
        .style("pointer-events", "auto")
        .on("click", function (event, d) {
            const id = d.id; //m49 code as id
            handle_selected_country(id); //whne a country is slected pass the m49 code as id
            d3.select(this).attr("fill", "#008112");
            });

    //dissapear zoom when mouse not on map
    svgMAP.on("mouseleave", () => {
        d3.select("#clip-circle-shape").style("display", "none");
        });

    //appear zoom when mouse is on map
    svgMAP.on("mouseenter", () => {
        d3.select("#clip-circle-shape").style("display", "block");
        });



    svgMAP.on("mousemove", function (event) {
        const [x, y] = d3.pointer(event);

        // Move the circle
        svgMAP.select("#clip-circle-shape")
            .attr("cx", x)
            .attr("cy", y);

        // Zoomed transform
        zoomedMap.attr("transform", `translate(${x * -6 + x}, ${y * -6 + y}) scale(6)`);
    });



});

let selectedYear = 2023; // default year

// update year when slider move. only changes whne click on map (to compare same contry different year)
d3.select("#year-slider").on("input", function () {
    selectedYear = +this.value; 
    d3.select("#year-label").text(selectedYear);
});

//when a country is selected
function handle_selected_country(m49_code) {
    //change one of the available charts. the las one updated
    const chart_idx = active_chart_idx == 0 ? "chart1" : "chart2";
    //get the top 5 itesm by country 
    const top5 = top_items(5, `'${m49_code}`, selectedYear);
    //console.log(top5)
    //draw the bar chart in the selected div
    drawBarChart(`#${chart_idx}`, top5, selectedYear);
    //modify the selected div
    active_chart_idx = 1 - active_chart_idx;
}

