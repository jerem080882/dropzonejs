 // disable auto discover
Dropzone.autoDiscover = true;

$(document).ready(function () {


//soit on passe par "class=dropzone" soit par "dropzones programmatically" cad new Dropzone("#myDropzone",{}) 
//et verifier alors Dropzone.autoDiscover = true ou false
//
// 
//Create dropzones programmatically (c'est different que de déclarer une dropzone avec la class=dropzone)
// peut etre utile pour les element HTML autre que les forms
//                var myDropzone = new Dropzone("#myDropzone", {
//                    url: "uploads.php",
//                    paramName: "file",
//                    autoProcessQueue: false,
//                    uploadMultiple: true, // uplaod files in a single request
//                    parallelUploads: 100, // use it with uploadMultiple
//                    maxFilesize: 100, // MB
//                    maxFiles: 10,
//                    acceptedFiles: ".jpg, .jpeg, .png, .gif, .pdf, .jfif",
//                    addRemoveLinks: true,
//                    // Language Strings
//                    dictFileTooBig: "Fichier trop lourd ({{filesize}}mb). Le poids max permis est {{maxFilesize}}mb",
//                    dictInvalidFileType: "Type de fichier invalide",
//                    dictCancelUpload: "Annuler",
//                    dictRemoveFile: "Supprimer",
//                    dictMaxFilesExceeded: "Seulement {{maxFiles}} fichiers sont permis",
//                    dictDefaultMessage: "Déposez les fichiers ici pour upload...",
//                });

            });

//Si l'on passe par la class=dropzone et la découverte automatique 
//"uploadForm" is the camelized version of the HTML element's ID, ici le formulaire
Dropzone.options.uploadForm = {

	// The setting up of the dropzone
	//url: "uploads.php",
	method: "post",
	paramName: "file",
	autoProcessQueue: false,
	parallelUploads: 5,
	uploadMultiple: true, // uplaod files in a single request
	parallelUploads: 100, // use it with uploadMultiple
	maxFilesize: 200, // MB
	maxFiles: 20, //nombre de fichiers
	acceptedFiles: ".jpg, .jpeg, .png, .gif, .jfif, .pdf, .xls, .bulk", //extensions acceptés
	addRemoveLinks: true,
	ignoreHiddenFiles: true,

	// Language Strings Traduction
	dictFileTooBig: "Fichier trop lourd ({{filesize}} mb). Le poids max permis est {{maxFilesize}} mb",
	dictInvalidFileType: "Type de fichier invalide!",
	dictCancelUpload: "Annuler",
	dictRemoveFile: "Supprimer",
	dictRemoveFileConfirmation: "Confirmer la suppression!",
	dictMaxFilesExceeded: "Seulement {{maxFiles}} fichiers sont permis!",
	dictDefaultMessage: "Déposez les fichiers ici pour upload...",

	previewsContainer: null,

//                renameFile: function (file) {
//                    let newName = 'TEST_' + file.name;
//                    return newName;
//                },

	accept: function (file, done) {
		if (file.name == "téléchargement.jpeg") {
			done("Upload impossible, fichier interdit.");
		} else {
			done();
		}
	},

	init: function () {
		var myDropzone = this;

		// First change the button to actually tell Dropzone to process the queue.
		$("#dropzoneSubmit").on("click", function (e) {
			// Make sure that the form isn't actually being sent.
			e.preventDefault();
			e.stopPropagation();

			if (myDropzone.files != "") {
				console.log('processQueue');
				myDropzone.processQueue();

			} else {
				//soumission du formulaire
				console.log('Formulaire validé');
				$("#uploadForm").submit();

			}

		});

		$("#dropzonedeleteAll").on("click", function (e) {
			// Make sure that the form isn't actually being sent.
			e.preventDefault();
			e.stopPropagation();

			if (myDropzone.files != "") {
				console.log('Suppression de tous les fichiers');
				myDropzone.removeAllFiles();
			}
		});

		$("#dropzonedeleteRejetes").on("click", function (e) {
			// Make sure that the form isn't actually being sent.
			//e.preventDefault();
			//e.stopPropagation();

			if (myDropzone.getRejectedFiles() != "") {
				console.log('suppression des fichiers rejetés');
				console.log(myDropzone.getRejectedFiles());
				var fileRejTab = myDropzone.getRejectedFiles();
				for (var i = 0; i < fileRejTab.length; i++) {
					console.log(fileRejTab[i]);
					myDropzone.removeFile(fileRejTab[i]);
				}
//                            for (var fileRej in myDropzone.getRejectedFiles()) {
//                                console.log(fileRej);
//                                //myDropzone.removeFile(myDropzone.getRejectedFiles());
//                            }
//                            ;
			}
		});

		// on add file
		this.on("drop", function (event) {
			//console.log('drop');
		});

		// on add file
		this.on("dragover", function (event) {
			//console.log('dragover');
		});

		// on add file
		this.on("dragleave", function (event) {
			//console.log('dragleave');
		});

		// on add file
		this.on("addedfile", function (file) {
			console.log('Fichier ajouté : ' + file.name);
			//console.log(file);
			var ext = file.name.split('.').pop();

			if (ext == "pdf") {
				$(file.previewElement).find(".dz-image img").attr("src", "Images/pdf.png");
			} else if (ext.indexOf("doc") != -1) {
				$(file.previewElement).find(".dz-image img").attr("src", "Images/word.png");
			} else if (ext.indexOf("xml") != -1) {
				$(file.previewElement).find(".dz-image img").attr("src", "Images/xml.png");
			} else if (ext.indexOf("csv") != -1) {
				$(file.previewElement).find(".dz-image img").attr("src", "Images/csv.png");
			} else if (ext.indexOf("bulk") != -1) {
				$(file.previewElement).find(".dz-image img").attr("src", "Images/bulk.png");
			} else if (ext.indexOf("xls") != -1) {
				$(file.previewElement).find(".dz-image img").attr("src", "Images/xls.png");
			}
		});

		//on remove filre
		this.on("removedfile", function (file) {
			console.log('Fichier supprimé : ' + file.name);
			//console.log(file);
		});

		// on error
		this.on("error", function (file, response) {
			console.error(response);
		});

		// on start
		this.on("sendingmultiple", function (file) {
			console.log('sendingmultiple');
			console.log(file);
		});

		// on success
		this.on("successmultiple", function (file) {
			// submit form
			console.log('successmultiple');
			//$("#uploadForm").submit();

		});

		this.on("complete", function (file) {
			console.log('complete');
			//myDropzone.removeFile(file);
		});

		this.on("queuecomplete", function (file) {
			console.log('queuecomplete');
			//myDropzone.removeFile(file);
		});

		this.on("success", function (file, responseText) {
			// Handle the responseText here. For example, add the text to the preview element:
			//file.previewTemplate.appendChild(document.createTextNode(responseText));
			console.log('success : ' + file.name);
		});

		this.on("sending", function (file, xhr, formData) {
			// Will send the filesize along with the file as POST data.
			console.log('sending');
			formData.append("filesize", file.size);
		});

	}
};