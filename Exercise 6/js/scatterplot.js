const drawScatterplot = (data) => {

    const svg = d3.select("#scatterplot")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)

    innerChartS = svg
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const maxStar = d3.max(data, d => d.star);
    const maxEnergy = d3.max(data, d => d.energyConsumption);

    console.log("maxStar:", maxStar, "maxEnergy:", maxEnergy);

    xScaleS
        .domain([0, maxStar])
        .range([0, innerWidth])
        .nice();

    yScaleS
        .domain([0, maxEnergy])
        .range([innerHeight, 0])
        .nice();

    colorScale
        .domain(data.map(d => d.screenTech))
        .range(d3.schemeCategory10);

    innerChartS
        .selectAll("circle")
        .data(data)
        .join("circle")
            .attr("r", 4)
            .attr("cx", d => xScaleS(d.star))
            .attr("cy", d => yScaleS(d.energyConsumption))
            .attr("fill", d => colorScale(d.screenTech));

    const bottomAxis = d3.axisBottom(xScaleS);
    const leftAxis = d3.axisLeft(yScaleS);
    
    innerChartS
        .append("g")
        .attr("transform", `translate(0,${innerHeight})`)
        .call(bottomAxis);

    innerChartS
        .append("g")
        .call(leftAxis);

    innerChartS
        .append("text")
        .text("Labeled Energy Consumption (kWh/year)")
        .attr("x", -margin.left + 5)
        .attr("y", -15)
        .attr("text-anchor", "start")

    innerChartS
        .append("text")
        .attr("class", "axis-label")
        .attr("x", innerWidth)
        .attr("y", innerHeight + 40)
        .attr("text-anchor", "end")
        .text("Star Rating");

    const legend = svg
        .append("g")
        .attr("transform", `translate(${width - 100}, ${margin.top})`);

    colorScale.domain().forEach((screenTech, i) => {
        
        const legendRow = legend
            .append("g")
            .attr("transform", `translate(0, ${i * 20})`);

        legendRow.append("rect")
            .attr("width", 10)
            .attr("height", 10)
            .attr("fill", colorScale(screenTech));

        legendRow.append("text")
            .attr("x", 20)
            .attr("y", 10)
            .attr("text-anchor", "start")
            .style("alignment-baseline", "middle")
            .text(screenTech);
    });
};