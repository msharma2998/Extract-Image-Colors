window.onload = function()
{   
    var buttonclicked = document.getElementById("click");
    buttonclicked.addEventListener("click",handler)
}
var message =  
{
    text : "Activate"
};
function handler()
{
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) 
    {
        var port =chrome.tabs.connect(tabs[0].id, {name : "Extract Palette"});
        port.postMessage(message);
    })
}