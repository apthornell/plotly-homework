function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
  d3.json(`../data/samples.json`).then((data) => {
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");
    // Use `.html("") to clear any existing metadata
    PANEL.html("");
    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(data.metadata).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key}:${value.ethnicity}`);});
});
}
function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  d3.json(`../data/samples.json`).then((data) => {
    // @TODO: Build a Bubble Chart using the sample data
    const otu_ids = data.samples[0].otu_ids.slice(0,10);
    const otu_labels = data.samples[0].otu_labels.slice(0,10);
    const sample_values = data.samples[0].sample_values.slice(0,10);
    var bubbleFormat = {
      margin: { t: 0 },
      hovermode: "closest",
      xaxis: { title: "OTU IDs" }};
console.log(otu_ids);
    let bubbleData = [{
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: "markers",
        marker: {
          size: sample_values,
          color: "blue",
          colorscale: "Electric"}}];

    Plotly.newPlot("bubble", bubbleData, bubbleFormat);

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
    let pieData = [{
        values: sample_values,
        labels: otu_ids,
        hovertext: otu_labels,
        hoverinfo: "hovertext",
        type: "pie"}];
    
    var pieFormat = {
      margin: { t: 0, l: 0 }};
    
    Plotly.newPlot("pie", pieData, pieFormat);
});
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("../data/samples.json").then((sampleNames) => {
    console.log(sampleNames)
    sampleNames.names.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
};

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
};

// Initialize the dashboard
init();