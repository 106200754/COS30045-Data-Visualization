d3.csv("../Exercise 5/data/Data_exercise 5.3.csv", d => {
  return{
    Screensize_Category: d.Screensize_Category,
    Count: +d.Count
  };
}).then(data =>{
    console.log(data);
    
    drawDonutChart(data);
});

const drawDonutChart = data => {
    const width = 1000;
    const height = 500;
    const radius = Math.min(width, height) / 2 - 20;

    const color = d3.scaleOrdinal()
        .domain(data.map(d => d.Screensize_Category))
        .range(d3.schemeSet2);

    const pie = d3.pie()
        .value(d => d.Count)
        .sort(null);

    const arcGenerator = d3.arc()
        .innerRadius(radius * 0.6)
        .outerRadius(radius * 1)
        .padAngle(0.02)
        .cornerRadius(6);

    const svg = d3.select("#donut-chart")
        .append("svg")
        .attr("viewBox", `0, 0, ${width}, ${height}`)

    const innerChart = svg
        .append("g")
        .attr("transform", `translate(${width/2}, ${height/2})`)

    innerChart
        .selectAll("path")
        .data(pie(data))
        .join("path")
            .attr("d", arcGenerator)
            .attr("fill", d => color(d.data.Screensize_Category))
            .attr("stroke", "white")
            .attr("stroke-wdith", 2);

    const arcs = innerChart
        .selectAll(".arc")
        .data(pie(data))
        .join("g")
            .attr("class", "arc");

    arcs
        .append("text")
            .attr("transform", d => `translate(${arcGenerator.centroid(d)})`)
            .attr("text-anchor", "middle")
            .attr("alignment-baseline", "middle")
            .attr("fill", "white")
            .text(d => d.data.Screensize_Category);
    }