// use case:  resize all open images your current Photoshop session.
// this checks if images are portrait or landscape and gets the dimensions right for each

// Define the widths to which you want to scale your images
var widths = [300, 250, 180];
var heights = [200, 160, 150];
// Define the folder where the output files will be saved
// var outputFolder = Folder.desktop;  // This gets the user's desktop folder
var outputFolder = "~/Desktop/sizedimages/";

// Check if there are open documents
if (app.documents.length === 0) {
    alert("No open documents to process.");
} else {
    // Loop through all open documents
    // for (var i = 0; i < 2; i++) {
    for (var i = 0; i < app.documents.length; i++) {
        var doc = app.documents[i];  // Current document

        // Bring the document to the front
        app.activeDocument = doc;

        // Check if the active layer is locked
        if (doc.activeLayer.allLocked) {
            alert("The active layer of the document " + doc.name + " is locked. Please unlock and try again.");
            continue;  // Skip to the next document
        }


        // Loop through all desired widths
        for (var j = 0; j < widths.length; j++) {
            // Scale image
            // on my particular images, cropping to a tighter ratio than about .63 will result in the top and bottom
            // of the image dropping off when resizing width and then specifying canvas height. 
            // for these images, we need do the reverse: set the overall height, and then adjust the canvas width

            if ((parseFloat(heights[j]) / parseFloat(widths[j]) ) < 0.63) {
                // reverse it
                // Scale image
                doc.resizeImage(null, UnitValue(heights[j], 'px'), 72, ResampleMethod.BICUBICSHARPER);
                doc.resizeCanvas(UnitValue(widths[j], 'px'), UnitValue(heights[j], 'px'), AnchorPosition.MIDDLECENTER);
            } else {
                // do it like before
                // Scale image
                doc.resizeImage(UnitValue(widths[j], 'px'), null, 72, ResampleMethod.BICUBICSHARPER);
                doc.resizeCanvas(UnitValue(widths[j], 'px'), UnitValue(heights[j], 'px'), AnchorPosition.MIDDLECENTER);
            }


            // Define the output file
            var outputFile = new File(outputFolder + "/" + doc.name.split('.')[0] + '_' + widths[j] + '.png');

            // Set PNG save options
            var pngSaveOptions = new PNGSaveOptions();
            pngSaveOptions.interlaced = false;

            // Save image
            doc.saveAs(outputFile, pngSaveOptions, true, Extension.LOWERCASE);
        }
    }
}
