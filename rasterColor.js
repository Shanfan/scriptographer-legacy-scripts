// Pickup colors from a raster//
//NOTE: An image must be placed within the artboard and rasterized//
var rasters = document.getItems({
type: Raster,
selected: true
});

var paths = document.getItems({
type: Path,
selected: true
});

if(rasters.length >0 && paths.length >0){
var raster = rasters[0];
for(var i=0; i<paths.length; i++) {
var path = paths[i];
var color = raster.getAverageColor(path);
path.fillColor = color;
}
}else{
Dialog.alert('Please select one raster and at least one path on top of the raster.');
}