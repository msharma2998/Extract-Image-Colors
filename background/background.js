window.paletteGenerator = {};
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) 
{  
    var src = request.imgsrc;
    console.log(src);
    //Load Color Thief Script
    $.getScript("background/color-thief-master/dist/color-thief.min.js",function()
    {
        var img = document.createElement('img');
        img.setAttribute('crossOrigin', '')
        img.setAttribute('src', src)            
        img.addEventListener('load', function()
        {
            var colorThief = new ColorThief();
            var dominantColor = colorThief.getColor(img);
            console.log(dominantColor);
            var paletteArray = colorThief.getPalette(img, 10);
            console.log(paletteArray);
            window.paletteGenerator =
            {
                imgsrc : src,
                color : dominantColor,
                paletteColors : paletteArray
            }
            sendResponse({palette: paletteGenerator});           
        });
            
    });    
    return true;
});