
export function downloadDrawing(original) {
  function stylesToInline(original, copied)
  {
    for(var i=0; i<copied.childNodes.length; i++){
      var child=copied.childNodes[i];
      if(child.tagName==="g" || child.tagName==="defs")
      {
        stylesToInline(original.childNodes[i],child);
      }
      var cssStyle=window.getComputedStyle(original.childNodes[i])
      for(var j=0; j<cssStyle.length; j++)
      {
        child.style.setProperty(cssStyle[j],cssStyle.getPropertyValue(cssStyle[j]));
      }
    }
  }
  
  var copied = original.cloneNode(true);
  stylesToInline(original,copied);
  const boundaryBox=original.getBBox();
  var canvas=document.createElement("canvas");
  canvas.width=boundaryBox.width;
  canvas.height=boundaryBox.height;
  var context=canvas.getContext("2d");
  context.clearRect(0,0,canvas.width,canvas.height);
  var data=(new XMLSerializer()).serializeToString(copied);
  var DOMURL=window.URL || window.webkitURL;
  var svgBlob=new Blob([data], {type:"image/svg+xml;charset=utf-8"});
  var image= new Image();
  var url=DOMURL.createObjectURL(svgBlob);
  image.src=url;
  image.onload=function onLoad() {
    context.drawImage(image, 0,0);
    DOMURL.revokeObjectURL(url);
    var imgURL=canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    const downloadLink=document.createElement("a");
    var today=new Date();
    var filename:string=original.id+String(today.getFullYear())+String(today.getMonth()+1)+String(today.getDate())+String(today.getHours())+String(today.getMinutes())+String(today.getSeconds())+".png";
    downloadLink.download=filename;
    downloadLink.target='_blank';
    downloadLink.href=imgURL;
    downloadLink.dispatchEvent(new MouseEvent("click",{
      view:window,
      bubbles:false,
      cancelable:true
    }))
    


    document.removeChild(canvas);
  }
}