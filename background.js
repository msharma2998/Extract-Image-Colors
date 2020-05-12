chrome.runtime.onConnect.addListener(function(port) 
{
    if(port.name == "From Content Script")
    {
        port.onMessage.addListener(function(msg) 
        {
            var src = msg.imgsrc;
            console.log(src);
        })
    }
})