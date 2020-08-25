function buildMetadata(sample) {
    d3.json(`/metadata/${sample}`).then((data) => {
      var PANEL = d3.select("#sample-metadata");
      PANEL.html("");
      Object.entries(data).forEach(([key, value]) => {
        PANEL.append("h6").text(`${key}: ${value}`);
      });

      // BONUS: Build the Gauge Chart
      buildGauge(data.WFREQ);
    });
  }

  function buildCharts(sample){
    d3.json(`/samples/${sample}`).then((data) => {
        var ids = data.otu_ids;
        var labels = data.otu_labels;
        var values = data.sample_values;
        
    var LayoutBubble = {
        margin: { t: 0 },
        xaxis: { title: "Id's" }
        hovermode: "closest",
        };
    var DataBubble = [
        {
            x: ids,
            y: values,
            text: labels,
            mode: "markers",
            marker: {
                color: ids,
                size: values,
            }
        }
        ]; 
    Plotly.plot("bubble", DataBubble, LayoutBubble);     
  };
  var pie_data = [
    {
      values: values.slice(0, 10),
      labels: ids.slice(0, 10),
      hovertext: labels.slice(0, 10),
      hoverinfo: "hovertext",
      type: "pie"
    }
  ];

  var pie_layout = {
    margin: { t: 0, l: 0 }
  };

  Plotly.plot("pie", pie_data, pie_layout);
});
function init() {
    var selector = d3.select("#selDataset");
  
    d3.json("/names").then((sampleNames) => {
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });

    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}
function optionChanged(newSample) {
    buildCharts(newSample);
    buildMetadata(newSample);
  }
init();