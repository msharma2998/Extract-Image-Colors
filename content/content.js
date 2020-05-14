chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) 
{
    if (request.text == "Activate")
    {
        console.log("Are we done yet");
        var imgs = document.getElementsByTagName("img");
        for(var i = 0; i < imgs.length; ++i) 
        {
            imgs[i].addEventListener("click", function() 
            {
                var source = this.src;
                console.log(source);
                chrome.runtime.sendMessage({imgsrc : source}, function(response) 
                {
                    console.log(response);
                    sendResponse(response);
                })
            })
        }
    }
    return true;
});
