$(document).ready(function(){

//$('#nurdas').attr({title: 'jQuery-Kurs', href: 'http://www.html-seminar.de/jquery.htm'});
//$('#nurdas').text("der ist neu");
//alert($('#nurdas').html());
$('h1').click(function(){addWarning("h1")});

function addWarning(it)
{
	alert(it);
	//$('h1').addClass('warn');
	$(it).addClass('warn');
}


xmlfilePath.onchange = function(e) {
alert(e.value);
xmlSource=xmlfilePath.value;



if(xmlSource.contains(".xmind"))
{
	alert("read stuff!");
	var xmlDoc=loadXMLDoc(xmlSource);
	alert("write stuff!");
	writeXML(xmlDoc,"title");
	alert("done!");
}
else{
alert("no path");
}


}
//andere Funktionen wie hier bearbeiten! wegen neuen Browsern...  Leerzeilen == empty textnode

String.prototype.contains = function(it) { return this.indexOf(it)  > 0; };

function getFirstChild(n)
{
y=n.firstChild;
while (y.nodeType!=1)
  {
  y=y.nextSibling;
  }
return y;
}

function loadXMLDoc(filename)
{

if (window.XMLHttpRequest)
  {
  xhttp=new XMLHttpRequest();
  }
else // code for IE5 and IE6
  {
  xhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
xhttp.open("GET",filename,false);
xhttp.send();
return xhttp.responseXML;
}

function loadXMLString(txt) 
{
if (window.DOMParser)
  {
  parser=new DOMParser();
  xmlDoc=parser.parseFromString(txt,"text/xml");
  }
else // code for IE
  {
  xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
  xmlDoc.async=false;
  xmlDoc.loadXML(txt); 
  }
return xmlDoc;
}
function writeXML(xml,elementName)
{

x=xml.getElementsByTagName(elementName);
for (i=0;i<x.length;i++)
  { 
    var n=x[i];
    document.write(n.childNodes[1].childNodes[0].nodeValue + "<br>");
         
    for (j=1;j<n.childNodes.length;j++)
    {
       if (x[i].childNodes[j].nodeType==1)
       {
          document.write(" -- "+ n.childNodes[j].nodeName +" --> "+    n.childNodes[j].childNodes[0].nodeValue);
          document.write("<br>");
       }
    }
  }
}

});
