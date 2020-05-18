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
chrome.storage.local.get('userColors',function(result)
   {
    if(result.userColors == undefined)
    {
       var colorBody = document.getElementById("colorBody");
       var image = document.createElement("img");
       image.setAttribute("src","/icons/popup-image.png");
       image.setAttribute("id","colorimg");
       image.setAttribute("style","height:100px; width: 120px; margin-left:140px;");
       var text = document.createElement("h3");
       text.innerHTML = "OOPS! Nothing to show. Try saving some colors!";
       text.setAttribute("style","text-align: center;");
       text.setAttribute("id","text");
       colorBody.appendChild(image);
       colorBody.appendChild(text);
       window.onload = handler;
    
    }   
    else
    {
        var image = document.getElementById("colorimg");
        var text = document.getElementById("text");
        if(image != null && text != null)
        {
            image.parentNode.removeChild(image);
            text.parentNode.removeChild(text);

        }
        window.onload = handler;
    }
   });

