// use case:  images extracted from a lazily contructed PDF come out  in strips, and are sideways in orientation.
// here we grab each pair of images, flip them upright, and put them on the same canvas to save as a single full-page image

//TODO: this one i did on the quick and i just did it with open documents. This would work much better if it 
// looped through images in a given directory

// Get current document
var doc = app.activeDocument;

var docPath = doc.fullName.path.replace(/^~/, '/Users/userpath');

// Get current file name 
var currentFile = doc.name;

var pad = '000';

// Extract the number from the file name.  this line will obviously be different
// depending on the filename. I went with the filename to make sure the pages were in order.
var currentNumber = parseInt(currentFile.replace(/^image\-(\d+)\..*$/i, '$1'), 10) ;


//flip the image 90 clockwise
doc.rotateCanvas(90);

// nextfile2num

var nextfile2num = (pad + (currentNumber+1)).slice(-pad.length)


var nextFile1 = currentFile.replace(/\-(\d+)\.jpg/, '-' + nextfile2num + '.jpg')

// Open the next two files
var nextDoc1 = app.open(File(docPath + '/' + nextFile1)); 

//flip the image 90 clockwise
nextDoc1.rotateCanvas(90);

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


var pastedLayer = doc.paste();
pastedLayer.translate(-(parseInt(nextDoc1.width) / 2),0);

// Close the new docs
nextDoc1.close(SaveOptions.DONOTSAVECHANGES);



// if (confirm('is this ok?')) {
	var jpegOptions = new JPEGSaveOptions();
	jpegOptions.quality = 7;
	doc.saveAs(new File(docPath + '/../' + doc.name), jpegOptions, true, Extension.LOWERCASE);
// }

doc.close(SaveOptions.DONOTSAVECHANGES);