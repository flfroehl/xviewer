
/// Pre Code
if (typeof String.prototype.contains === 'undefined') {
String.prototype.contains = function (it){
return this.indexOf(it) > -1; }
}

if (window.File && window.FileReader && window.FileList && window.Blob) {
  // Great success! All the File APIs are supported.
} else {
  alert('The File APIs are not fully supported in this browser.');
}

///// Start Code

var App = {}; //Singleton
App.Config = {
   sourceFile : "",
   fileContent: "",
   fileInformation: [],
   isXmindFile : function() {
	return this.sourceFile.contains(".xmind");
   }
};

var Logger = {
	firstLogDate: "Today",
	Add: function(text){
		
		var now = new Date();
		var date = now.getDate() +"."+now.getMonth()+"."+now.getFullYear();
		if(date != this.firstLogDate){
			this.firstLogDate = date;
			$("#logger").prepend('<li> ########## ' + date + ' ########## </li>');
		}
		$("#logger").prepend('<li>'+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds()+" | "+text+'</li>');
	},
	Clear: function(){ 
		$("#logger").empty();
		this.firstLogDate = "";}
};


/////////////// Reader Methods

function updateProgress(evt) {
    // evt is an ProgressEvent.
    if (evt.lengthComputable) {
      var percentLoaded = Math.round((evt.loaded / evt.total) * 100);
      // Increase the progress bar length.
      if (percentLoaded < 100) {
        progress.style.width = percentLoaded + '%';
        progress.textContent = percentLoaded + '%';
      }
    }
  }

function errorHandler(evt) {
    switch(evt.target.error.code) {
      case evt.target.error.NOT_FOUND_ERR:
        Logger.Add('ERROR: File Not Found!');
        break;
      case evt.target.error.NOT_READABLE_ERR:
        Logger.Add('ERROR: File is not readable');
        break;
      case evt.target.error.ABORT_ERR:
        break; // noop
      default:
        Logger.Add('ERROR: An error occurred reading this file.');
    };
  }


/////////////// END Reade Methods




//OnChange Methods definieren
$("#fileChooser").on('change', function(evt){
    App.Config.sourceFile = $("#fileChooser").val();
    
    var files = evt.target.files; // FileList object
    // files is a FileList of File objects. List some properties.
    App.Config.fileInformation = "";
    var f = files[0];


	var output= [];
	output.push('<strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                  f.size, ' bytes, last modified: ',
                  f.lastModifiedDate.toLocaleDateString());
    
    App.Config.fileInformation = output.join('');

//    if (!f.type.match('text.*')) 
//	return;
    var reader = new FileReader("UTF-8");
	reader.onerror = errorHandler;
    	reader.onprogress = updateProgress;
	reader.onabort = function(e) {alert('File read cancelled');};
      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
	  App.Config.fileContent = e.target.result;
          $("#textOutput").val( App.Config.fileContent );
	 
        };
      })(f);

      // Read in the image file as a data URL.
      reader.readAsText(f);
      Logger.Add("loaded "+App.Config.fileInformation);
});


//Button events hinzufügen

$("#save").click(function(){
	App.Config.fileContent = $("#textOutput").val();
	//14:02 08.05.2014  $("textOutput").text($("#textOutput").val());
	Logger.Add("Content saved!");
});

$("#restore").click(function(){
	$("#textOutput").val(App.Config.fileContent);
	Logger.Add("Content restored!");
});

$("#clearLogger").click(function(){
	Logger.Clear();
});

