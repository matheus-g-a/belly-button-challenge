const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

function init() {
  d3.json(url).then(function (data) {

    const dataDrop = d3.select("#selDataset");
    for (let index = 0; index < data.names.length; index++) {
      const element = data.names[index];
      dataDrop.append("option").text(element).property("value", element);
    };
    metaData(data.names[0]);
    createCharts(data.names[0])
  });
};

function metaData(id) {
  console.log(id)
  d3.json(url).then(function (data) {
    
    const sample = data.samples.find(o=> o.id ==id)
    console.log(sample)
    const metaData = data.metadata.find(o=> o.id == id)
    console.log(metaData)
    let pchart = d3.select('#sample-metadata')
    pchart.html('')
    Object.entries(metaData).forEach(function([key, value]){
        pchart.append('h6').text(`${key}: ${value}`)
    })
  });
};


function createCharts(id) {
    console.log(id)
    d3.json(url).then(function (data) {
      
      const sample = data.samples.filter(o=> o.id ==id)
      const metaData = data.metadata.find(o=> o.id == id)
      var result = sample[0];
      var otu_ids = result.otu_ids;
      var sample_values = result.sample_values;
      var otu_labels = result.otu_labels;
  
      var y_data = otu_ids.slice(0,10).map(ids => `OTU ${ids}`).reverse();
      var data = [
        {
            y:y_data,
            x:sample_values.slice(0,10).reverse(),
            text: otu_labels.slice(0,10).reverse(),
            type: "bar",
            orientation: "h"
        }
      ]
      var bubbleData = {
        
          x: otu_ids,
        
          y: sample_values,
          text: otu_labels,
          mode: 'markers',
          marker: {
            size: sample_values,
            color: otu_ids

          }
        };
        
        var bubbleLayout = {
          height: 500,
          width: 1000,
          xaxis: {title: {
            text: 'OTU ID'
  
          }}
        };

      Plotly.newPlot("bubble", [bubbleData], bubbleLayout,{responsive:true});
      Plotly.newPlot("bar", data);

    });
  };



function optionChanged(id) {
  metaData(id);
  createCharts(id);
};
init();
