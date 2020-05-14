function handler()
{   
    var buttonclicked = document.getElementById("click");
    buttonclicked.addEventListener("click",function()
    {
        var message ={text : "Activate"};
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) 
        {
            chrome.tabs.sendMessage(tabs[0].id, message, function(response) {
              console.log(response);
            });
        });
    })
}
chrome.runtime.getBackgroundPage(function(bgpage)
{
    if(bgpage.paletteGenerator == null)
    {
        window.onload = handler;
    }
    else
    {
        $("img").attr("src",bgpage.paletteGenerator.imgsrc).css({
            height: "100%", 
            width: "100%"
        });
        window.onload = handler;
    }
})
