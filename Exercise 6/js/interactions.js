const populateFilters = (data) => {

    d3.select("#filters_screen")
        .selectAll(".filter")
        .data(filters_screen)
        .join("button")
            .attr("class", d => `filter ${d.isActive ? "active" : ""}`)
            .text(d => d.label)

            .on("click", (e, d) => {
                console.log("Clicked filter:", e);
                console.log("Clicked filter data:", d);
                
                if(!d.isActive) {
                    filters_screen.forEach(filter => {
                        filter.isActive = d.id === filter.id ? true : false;
                    });

                    d3.selectAll("#filters_screen .filter")
                        .classed("active", filter => filter.id === d.id ? true : false);

                    updateHistogram(d.id, data);
                }
            });
};

const populateSizeFilters = (data) => {
    
    d3.select("#filters_size")
        .selectAll(".filter")
        .data(filters_size)
        .join("button")
            .attr("class", d => `filter ${d.isActive ? "active" : ""}`)
            .text(d => d.label)
            .on("click", (e, d) => {
                if(!d.isActive){
                    filters_size.forEach(filter => {
                        filter.isActive = d.id === filter.id ? true : false;
                    });

                    d3.selectAll("#filters_size .filter")
                        .classed("active", filter => filter.id === d.id ? true: false);

                    updateHistogram(d.id, data);
                }
            })
};

const updateHistogram = (filterId, data) => {

    const techId = filters_screen.find(f => f.isActive).id;
    const sizeId = filters_size.find(f => f.isActive).id;
        
    const filtered = data.filter(tv =>
    (techId === "all" || tv.screenTech === techId) &&
    (sizeId === "all" || Number(tv.screenSize) === sizeId)
    );

    const updatedBins = binGenerator(filtered);

        d3.selectAll("#histogram rect")
            .data(updatedBins)
            .transition()
                .duration(500)
                .ease(d3.easeCubicInOut)
                .attr("y", d => yScale(d.length))
                .attr("height", d => innerHeight - yScale(d.length));
    };