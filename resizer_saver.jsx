#target photoshop

//use case: this loops over a folder of images, executes a photoshop action on them, and saves the result

// Folder to process
var inputFolder = Folder.selectDialog("Select the folder with PNG images");
var outputFolder = Folder.selectDialog("Select the folder to save processed images");

var theApp = app;

if (inputFolder && outputFolder) {
    var pngFiles = inputFolder.getFiles("*.png");

    for (var i = 0; i < pngFiles.length; i++) {
        var file = pngFiles[i];
        var doc = app.open(file);

        // Run your pre-recorded actions here
        theApp.doAction("resize_up_then_down", "clipart");

        // Export to PNG
        var pngSaveOptions = new PNGSaveOptions();
        // doc.saveAs(new File(outputFolder + "/" + doc.name), pngSaveOptions, true, Extension.LOWERCASE);
		
		var opts = new ExportOptionsSaveForWeb();
		opts.format = SaveDocumentType.PNG;
		opts.PNG8 = false; // Use PNG-24
		opts.transparency = true;
		opts.interlaced = false;
		opts.quality = 100;
		theApp.activeDocument.exportDocument(new File(outputFolder + "/" + doc.name), ExportType.SAVEFORWEB, opts);

		// var opts = new ExportOptionsSaveForWeb();
		// opts.format = SaveDocumentType.SVG;
		// theApp.activeDocument.exportDocument(new File(outputFolder + "/scriptsvg/" + doc.name), ExportType.SAVEFORWEB, opts);

        // Close the document
        doc.close(SaveOptions.DONOTSAVECHANGES);
    }
}
