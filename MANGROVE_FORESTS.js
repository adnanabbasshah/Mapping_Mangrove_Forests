var geometry = 
    /* color: #ffffff */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[67.32546370231863, 24.184891733758544],
          [67.61934797966238, 24.255026697745564],
          [67.50948469841238, 24.482697896621733],
          [67.47652571403738, 24.565158530288105],
          [67.53969710075613, 24.739895396679852],
          [67.47103254997488, 24.809721555366195],
          [67.30074446403738, 24.874524929470624],
          [67.17989485466238, 24.86455738871038],
          [67.09749739372488, 24.86455738871038],
          [66.91896956169363, 24.882000057492927],
          [66.85579817497488, 24.882000057492927],
          [66.86678450309988, 24.837142508432787],
          [66.96291487419363, 24.774813385384917],
          [67.07003157341238, 24.752367233439568],
          [67.13869612419363, 24.704967599462076],
          [67.15242903434988, 24.61261128137412],
          [67.23207991325613, 24.512689845546998],
          [67.23207991325613, 24.43019478362771],
          [67.25679915153738, 24.420191710699104],
          [67.29799788200613, 24.380171491324795],
          [67.28151838981863, 24.34514340333168],
          [67.27877180778738, 24.27005059159018],
          [67.28151838981863, 24.20242909463478],
          [67.33095686638113, 24.154822077845928],
          [67.34194319450613, 24.09967599445018],
          [67.44082014763113, 24.154822077845928],
          [67.56716292106863, 24.257530803356396],
          [67.61934797966238, 24.252522542822778]]]);


Map.centerObject(geometry, 10);
Map.addLayer(geometry, {color: 'FF0000'}, 'Study Area');
var mangrov = ee.ImageCollection("LANDSAT/MANGROVE_FORESTS")
  .toBands()
  .clip(geometry);

// Display the mangrove layer on the map
Map.addLayer(mangrov.updateMask(mangrov), {palette: 'red'}, 'Mangrove');

var state = mangrov.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: geometry,
  maxPixels: 20000000 // Increase the maxPixels limit
});

// Print the mangrove area
print("Mangrove area (square meters):", state);


// Define the legend colors and labels
var legendColors = ['d40115']; // Color corresponding to mangroves
var legendLabels = ['Mangrove Forests'];

// Create the legend
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }
});

// Create and add color boxes and labels to the legend
for (var i = 0; i < legendColors.length; i++) {
  // Create a color box
  var colorBox = ui.Label({
    style: {
      backgroundColor: legendColors[i],
      padding: '8px',
      margin: '0 0 5px 0'
    }
  });

  // Create a label
  var label = ui.Label({
    value: legendLabels[i],
    style: {margin: '0 0 4px 6px'}
  });

  // Add the color box and label to the legend
  legend.add(colorBox);
  legend.add(label);
}

// Add the legend to the map
Map.add(legend);
