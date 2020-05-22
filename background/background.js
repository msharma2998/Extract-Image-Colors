chrome.runtime.onInstalled.addListener(function() 
{
    chrome.storage.local.set({status : false});
    chrome.storage.local.get('userColors',function(result)
    {
        if(result.userColors == undefined)
        {
            chrome.storage.local.clear();
        }   
    });
})
function rgbToHex(r, g, b) 
{
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

chrome.runtime.onConnect.addListener(function(port) {
    if(port.name == "Content")
    {
        port.onMessage.addListener(function(request) 
        {
            var src = request.imgsrc;
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
                    var paletteArray = colorThief.getPalette(img, 10);
                    var paletteGenerator =
                    {
                        imgsrc : src,
                        color : dominantColor,
                        paletteColors : paletteArray
                    }
                    port.postMessage(paletteGenerator);   
                    port.onMessage.addListener(function(msg) {
                        if(msg.doWeStore == "Yes")
                        {
                            chrome.storage.local.get('userColors', function (result) {
                                if(result.userColors == undefined)
                                {
                                    var updateColors = [];
                                }
                                else
                                {
                                    var updateColors = result.userColors;
                                }
                                for(var i=0;i<10;i++)
                                {
                                    updateColors.push(rgbToHex(paletteArray[i][0],paletteArray[i][1],paletteArray[i][2]));
                                }
                                updateColors.push(rgbToHex(dominantColor[0],dominantColor[1],dominantColor[2]));
                                chrome.storage.local.set({userColors: updateColors}, function () {
                                    chrome.storage.local.get('userColors', function (result) {
                                        console.log(result.userColors);
                                    });
                                })
                        
                            });   
                        }
                    })      
                });
                    
            });  
        })  
    }
});