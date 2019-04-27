import React from 'react';
import * as d3 from 'd3';

class Chart extends React.Component {
  componentDidUpdate() {
    this.drawChart()
  }

  drawChart() {
  console.log("DATA", this.props.data)
  let width = this.props.width
  let height = this.props.height
  const data = this.props.data
  const parser = d3.timeParse("%Y")
  const xAxisValue = 'yearbuilt'
  const yAxisValue = 'energystarscore'

  let margin = ({top: 20, right: 30, bottom: 30, left: 40})
  let x = d3.scaleTime()
    .domain(d3.extent(data, d => parser(d[xAxisValue])))
    .range([margin.left, width - margin.right])

  let y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d[yAxisValue])]).nice()
    .range([height - margin.bottom, margin.top])

  let xAxis = g => g
      .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(3))

  let yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y))
    .call(g => g.select(".domain").remove())
    .call(g => g.select(".tick:last-of-type text").clone()
        .attr("x", 3)
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text(data.y))

  let line = d3.line()
    .defined(d => !isNaN(d[yAxisValue]))
    .x(d => x(parser(d[xAxisValue])))
    .y(d => y(d[yAxisValue]))

  const svg = d3.select("body")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .style("margin-left", 100);

    svg.append("g")
      .call(xAxis);

    svg.append("g")
      .call(yAxis);

    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", line);

  }
  render() {
    return <div id={"#" + this.props.id}></div>
  }


}


export default Chart;
