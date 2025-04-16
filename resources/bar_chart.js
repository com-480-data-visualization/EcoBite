const foodData = [
    { food: 'Beef', emissions: 50 },
    { food: 'Chicken', emissions: 20 },
    { food: 'Rice', emissions: 10 },
    { food: 'Lentils', emissions: 5 }
];

const chartContainer = d3.select('#food-comparison-chart');
const containerWidth = document.getElementById('food-comparison').offsetWidth;
const containerHeight = 300;
const margin = { top: 20, right: 30, bottom: 30, left: 60 };
const width = containerWidth - margin.left - margin.right;
const height = containerHeight - margin.top - margin.bottom;

const svg = chartContainer
    .attr('width', containerWidth)
    .attr('height', containerHeight);

const g = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

const x = d3.scaleBand()
    .domain(foodData.map(d => d.food))
    .rangeRound([0, width])
    .padding(0.1);

const y = d3.scaleLinear()
    .domain([0, d3.max(foodData, d => d.emissions)])
    .rangeRound([height, 0]);

g.append('g')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(x))
    .selectAll("text")
        .style("font-size", "12px");

g.append('g')
    .call(d3.axisLeft(y))
    .selectAll("text")
        .style("font-size", "12px");


g.selectAll('.bar')
    .data(foodData)
    .enter().append('rect')
    .attr('class', 'bar')
    .attr('x', d => x(d.food))
    .attr('y', d => y(d.emissions))
    .attr('width', x.bandwidth())
    .attr('height', d => height - y(d.emissions))
    .attr('fill', 'steelblue');
