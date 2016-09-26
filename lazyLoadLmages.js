/* Author:
 * Manuel T. Schrempf
 * 
 * Description:
 * A pure JavaScript lazy image loader.
 * 
 * Usage:
 * Put all the content of you "src" attribute of the "img" tag into the "data-url" attribute. 
 * For safety, on page load the "src" attribute of an image with an "data-url" attribute is removed.
 * Now, if the image gets visible on screen its "src" will be set and "data-url" removed.*/ 

if (window.addEventListener) {
  window.addEventListener('load', start, false);
}
else if (window.attachEvent) {
  window.attachEvent('onload', start);
}

function start(){
    const attributeName="data-url";
    
    // Get the current window width
    function getWidth(){
        return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    };

    // Get the current window height
    function getHeight(){
        return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    };
    
    var screenWidth=getWidth();
    var screenHeight=getHeight();

    // Make sure the width and height are always correct
    window.addEventListener("resize", function(){
        screenWidth = getWidth();
        screenHeight = getHeight();
    }, true);

    //Add to check the images on each scroll event
    window.addEventListener("scroll", check, true);

    var images = document.getElementsByTagName("img"); // Get all images

    for(var i = 0; i < images.length; i++) // Remove all not needed src attributes
        if(images[i].hasAttribute(attributeName) && images[i].hasAttribute("src"))
            images[i].removeAttribute("src");
    
    // Get the current scroll position x
    function getScrollX(){
        return window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
    };
    
    // Get the current scroll position y
    function getScrollY(){
        return window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;
    };
    
    // Source: http://javascript.info/tutorial/coordinates
    function getOffsetRect(elem) {
    	    var box = elem.getBoundingClientRect();
    	    var body = document.body;
    	    var docElem = document.documentElement;
    	    var scrollTop = getScrollY();
    	    var scrollLeft = getScrollX();
    	    var clientTop = docElem.clientTop || body.clientTop || 0;
    	    var clientLeft = docElem.clientLeft || body.clientLeft || 0;
    	    var top  = box.top +  scrollTop - clientTop;
    	    var left = box.left + scrollLeft - clientLeft;
    	    return { x: Math.round(left),y: Math.round(top) };
    };
        
    function check(){
        var scrollX = getScrollX() + screenWidth;
        var scrollY = getScrollY() + screenHeight;
        
        for(var i = 0; i < images.length; i++){
        	if(images[i].hasAttribute(attributeName)){
	        	var rect = getOffsetRect(images[i]);
	            if(scrollY >= rect.y && scrollX >= rect.x){
	                images[i].setAttribute("src", images[i].getAttribute(attributeName));
	                images[i].removeAttribute(attributeName);
	            }
        	}
        }
    };

    check(); 
};

