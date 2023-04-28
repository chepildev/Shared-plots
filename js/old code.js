
// Define the data
const data = [10, 20, 30, 40, 50];

// Define the dimensions of the chart
const width = 500;
const height = 300;

// Create the SVG element
const svg = d3
  .select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

// Define the scales
const xScale = d3
  .scaleBand()
  .domain(d3.range(data.length))
  .range([0, width])
  .padding(0.1);

const yScale = d3
  .scaleLinear()
  .domain([0, d3.max(data)])
  .range([height, 0]);

// Create the bars
svg
  .selectAll("rect")
  .data(data)
  .enter()
  .append("rect")
  .attr("x", (d, i) => xScale(i))
  .attr("y", (d) => yScale(d))
  .attr("width", xScale.bandwidth())
  .attr("height", (d) => height - yScale(d))
  .attr("fill", "steelblue");

// Add the x-axis
svg
  .append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(d3.axisBottom(xScale));

// Add the y-axis
svg.append("g").call(d3.axisLeft(yScale));
