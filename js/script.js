// Load the data from the CSV file
d3.csv(
  "https://raw.githubusercontent.com/chumo/Data2Serve/master/transition_clusters.csv",
  d3.autoType
)
  .then(function (data) {
    // Define the SVG element
    const svg = d3.select("svg");

    // Create the circles
    const circles = svg
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => d.Xi)
      .attr("cy", (d) => d.Yi)
      .attr("r", 2)
      .attr("fill", (d) => d.color);

    // Define the transition
    const transition = d3.transition().duration(2000).ease(d3.easeLinear);

    // Animate the circles
    function animateCircles() {
      circles
        .transition(transition)
        .attr("cx", (d) => d.Xf)
        .attr("cy", (d) => d.Yf);
    }

    // Move circles back to initial coordinates on mouseover
    svg.on("mouseover", function () {
      circles
        .transition()
        .duration(500)
        .attr("cx", (d) => d.Xi)
        .attr("cy", (d) => d.Yi);
    });

    // Execute circle transition again on mouseout
    svg.on("mouseout", function () {
      animateCircles();
    });

    // Animate the circles initially
    animateCircles();
  })
  .catch(function (error) {
    console.log("Error loading file:", error);
  });
