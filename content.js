
chrome.runtime.onConnect.addListener(function(port)
{
        // check if msg is from correct extension
        if(port.name == "Extract Palette")
        {
            // add event listener to listen for messages
            port.onMessage.addListener(function(msg){
                // display user guide if asked to
                if(msg.text == "Activate")
                {
                    console.log("Are we done yet");
                    var imgs = document.getElementsByTagName("img");
                    for(var i = 0; i < imgs.length; ++i) 
                    {
                        imgs[i].addEventListener("click", function() {
                            var source = this.src;
                            console.log(source);
                            var port =chrome.runtime.connect({name : "From Content Script"});
                            port.postMessage({imgsrc : source});
                        });
                    }
                }
                    
            })
        }
})