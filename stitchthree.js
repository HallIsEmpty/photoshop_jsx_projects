// use case:  basically the same thing as stitchfour.js. I want to add the next two open documents onto this current one, 
// resizing the canvas to accommodate the new addition

// Get current document
var doc = app.activeDocument;

var docPath = doc.fullName.path.replace(/^~/, '/Users/mhall');

// Get current file name 
var currentFile = doc.name;

var pad = '000';

// Extract the number from the file name 
var currentNumber = parseInt(currentFile.replace(/^image\-(\d+)\..*$/i, '$1'), 10) ;

// alert(currentNumber);

var nextfile2num = (pad + (currentNumber+1)).slice(-pad.length)
var nextfile3num = (pad + (currentNumber+2)).slice(-pad.length)

// Construct the next two file names 
// var nextFile1 = currentFile.slice(0,-5) + nextfile2num + ".jpg";
// var nextFile2 = currentFile.slice(0,-5) + nextfile3num + ".jpg";

var nextFile1 = currentFile.replace(/\-(\d+)\.jpg/, '-' + nextfile2num + '.jpg')
var nextFile2 = currentFile.replace(/\-(\d+)\.jpg/, '-' + nextfile3num + '.jpg')

// Open the next two files
var nextDoc1 = app.open(File(docPath + '/' + nextFile1)); 

// Select all of the layers in the new docs 
var nextLayer1 = nextDoc1.layers[0];

// Copy the layers
nextLayer1.copy();

// Select the first layer in the original doc
var layer = doc.layers[0];

// Calculate new canvas size
var oldCanvasWidth = doc.width;
var newCanvasWidth = oldCanvasWidth + nextDoc1.width;

// switch back to first dock
app.activeDocument = doc;

// Resize the canvas 
doc.resizeCanvas(newCanvasWidth, doc.height, AnchorPosition.MIDDLERIGHT);

// doc.selection.selectAll();

// doc.selection.deselect();

var pastedLayer = doc.paste();
pastedLayer.translate(-(parseInt(nextDoc1.width) / 2),0);

// doc.activeLayer.position({x: oldCanvasWidth, y: 0});
// doc.activeLayer.transform({translateX: oldCanvasWidth, translateY: 0});
// doc.activeLayer.translate(oldCanvasWidth, 0);
// doc.activeLayer.transform({translateX: oldCanvasWidth, translateY: 0});

// doc.activeLayer.appendChild(nextDoc1.activeLayer);

// Paste the copied layers at the right canvas edge 
// doc.paste();

// Close the new docs
nextDoc1.close(SaveOptions.DONOTSAVECHANGES);

// alert(nextFile2);
var nextDoc2 = app.open(File(docPath + '/' + nextFile2));
var nextLayer2 = nextDoc2.layers[0];
nextLayer2.copy();
var oldCanvasWidth = doc.width;
var newCanvasWidth2 = oldCanvasWidth + nextDoc2.width;

app.activeDocument = doc;

doc.resizeCanvas(newCanvasWidth2, doc.height, AnchorPosition.MIDDLERIGHT);
// var layer = doc.layers[0];
var pastedLayer2 = doc.paste();
// pastedLayer2.translate(-(parseInt(nextDoc2.width)),0);

pastedLayer2.translate(-(parseInt(parseInt(newCanvasWidth2) / 2) - parseInt(parseInt(nextDoc2.width) / 2)),0);

// var oldCanvasWidth = doc.width;
// var newCanvasWidth = oldCanvasWidth + nextDoc2.width;

// doc.resizeCanvas(newCanvasWidth, doc.height, AnchorPosition.LEFT);

// doc.paste(AnchorPosition.LEFT);

nextDoc2.close(SaveOptions.DONOTSAVECHANGES);  

// if (confirm('is this ok?')) {
	var jpegOptions = new JPEGSaveOptions();
	jpegOptions.quality = 7;
	doc.saveAs(new File(docPath + '/../' + doc.name), jpegOptions, true, Extension.LOWERCASE);
// }

doc.close(SaveOptions.DONOTSAVECHANGES);
