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
    var colorBody = document.getElementById("colorBody");
    if(result.userColors == undefined)
    {
       var image = document.createElement("img");
       image.setAttribute("src","/icons/popup-image.png");
       image.setAttribute("id","colorimg");
       var text = document.createElement("h3");
       text.innerHTML = "OOPS! Nothing to show. Try saving some colors!";
       text.setAttribute("id","text");
       colorBody.appendChild(image);
       colorBody.appendChild(text);
       handler();
    
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
        var container = document.createElement("div");
        container.setAttribute("id","container");
        var userColors= result.userColors;
        var len = userColors.length;
        if(len < 11)
        {
            for(var i=len-1;i>=0;i--)
            {
                color = document.createElement("div");
                color.setAttribute("class","color")
                color.style.backgroundColor = userColors[i];
                container.appendChild(color);
            }
        }
        else
        {
            for(var i=len-1;i >= len-11;i--)
            {
                color = document.createElement("div");
                color.setAttribute("class","color")
                color.style.backgroundColor = userColors[i];
                container.appendChild(color);
            }
        }
        var buttondiv = document.createElement("div");
        buttondiv.setAttribute("id","buttondiv")
        var button= document.createElement("button");
        button.setAttribute("id","button");
        button.innerHTML="View All";
        buttondiv.appendChild(button);
        colorBody.appendChild(container);
        colorBody.appendChild(buttondiv);
        $(document).on('click', '#button', function() {
            chrome.tabs.create({url : "/allColors/allColors.html"});
        })
        handler();   
    }
   });