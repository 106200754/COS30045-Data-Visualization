const svg = d3.select(".responsive-svg-container")
    .append("svg")
      .attr("viewBox", "0 0 500 500")
      .style("border", "1px solid black");


d3.csv("../Exercise 4.4/data/tvBrandCount.csv", d => {
  return {
    brand: d.brand,
    count: +d.count
 };
}).then(data =>{
  console.log(data);
  createBarChart(data);
});

const createBarChart = data => {

  const xScale = d3.scaleLinear()
    .domain([0, 1100])
    .range([0, 500]);
  
  const yScale = d3.scaleBand()
    .domain(data.map(d => d.brand))
    .range([0, 500])
    .padding(0.1);

  svg
    .selectAll("rect")
    .data(data)
    .join("rect")
    .attr("class", d => {
      console.log(d);
      return `bar bar-${d.count}`;
    })
    .attr("width", d => xScale(d.count))
    .attr("height", yScale.bandwidth())
    .attr("fill", "blue")
    .attr("x", 0)
    .attr("y", (d,i) => yScale(d.brand));

};

