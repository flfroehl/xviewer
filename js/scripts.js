$(document).ready(function() {
	
	$('h1').click(function() {
		addWarning("h1")
	});
	
	
	var ADD_AFTER_NODE_ID = "result";
	var XML_PATH_ID = "xmlContentFilePath";
	var XMIND_ENDING = ".xml";
	var XML_CONTENT = "";
	
	function addWarning(it) {
		alert(it);
		$(it).addClass('warn');
	}

    //on change of id="xmlContentFilePath"
	xmlContentFilePath.onchange = function(e) {
		var file = xmlContentFilePath.files[0];
		var path = xmlContentFilePath.value;

		if (path.contains(XMIND_ENDING)) {
			
			var reader = new FileReader();
			reader.onload = function(e){
          		XML_CONTENT = loadXMLString(e.target.result);
          		alert(XML_CONTENT);
			
          		writeXML(XML_CONTENT, "sheet", document.getElementById(ADD_AFTER_NODE_ID));
          		
        	};
			reader.readAsText(file);
			
		} else {
			alert("Wrong Format! (should be "+XMIND_ENDING+")");
		}

	}
	//andere Funktionen wie hier bearbeiten! wegen neuen Browsern...  Leerzeilen == empty textnode

	String.prototype.contains = function(it) {
		return this.indexOf(it) > 0;
	};

	function getFirstChild(n) {
		y = n.firstChild;
		while (y.nodeType != 1) {
			y = y.nextSibling;
		}
		return y;
	}

	function loadXMLDoc(filename) {

		if (window.XMLHttpRequest) {
			xhttp = new XMLHttpRequest();
		} else// code for IE5 and IE6
		{
			xhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		xhttp.open("GET", filename, false);
		xhttp.send();
		return xhttp.responseXML;
	}

	function loadXMLString(txt) {
		var xmlDoc;
		if (window.DOMParser) {
			parser = new DOMParser();
			xmlDoc = parser.parseFromString(txt, "text/xml");
		} else// code for IE
		{
			xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
			xmlDoc.async = false;
			xmlDoc.loadXML(txt);
		}
		return xmlDoc;
	}

	function writeXML(xml, elementName, addAfterNode) {

		x = xml.getElementsByTagName(elementName);
		$(addAfterNode).after(x);
		alert("TODO change writeXML");
		
		/*for ( i = 0; i < x.length; i++) {
			var n = x[i];
			
			document.write(n.childNodes[1].childNodes[0].nodeValue + "<br>");

			for ( j = 1; j < n.childNodes.length; j++) {
				if (x[i].childNodes[j].nodeType == 1) {
					document.write(" -- " + n.childNodes[j].nodeName + " --> " + n.childNodes[j].childNodes[0].nodeValue);
					document.write("<br>");
				}
			}
			
		}*/
	}

});
