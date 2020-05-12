
chrome.runtime.onConnect.addListener(function(port)
{
        // check if msg is from correct extension
        if(port.name == "Extract Palette")
        {
            // add event listener to listen for messages
            port.onMessage.addListener(function(msg){
                // display user guide if asked to
                if(msg.text == "Activate")
                    console.log("Are we done yet");
            })
        }
})