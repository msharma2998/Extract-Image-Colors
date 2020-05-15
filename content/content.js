function resultpopup(src)
{
    mainDiv = document.createElement("div");
    mainDiv.setAttribute("style","position: absolute; left: 0px; top: 0px; background-color: rgb(255, 255, 255); opacity: 0.5; z-index: 2000; height: 1083px; width: 100%;");
    
    iframeElement = document.createElement("iframe");
    iframeElement.setAttribute("style","width: 100%; height: 100%;");

    mainDiv.appendChild(iframeElement);

    modalDialogParentDiv = document.createElement("div");
    modalDialogParentDiv.setAttribute("style","position: absolute; width: 500px; border: none; background-color: rgb(255, 255, 255); z-index: 2001; overflow: auto; text-align: center; top: 149px; left: 450px;");

    modalDialogHeaderDiv = document.createElement("div");
    modalDialogHeaderDiv.setAttribute("style" , "background-color: red; width: 100%; height: 40px;");
    modalDialogImageDiv = document.createElement("div"); 
    modalDialogImageDiv.setAttribute("style" , "margin: auto; margin-top:10px; margin-bottom:10px; background-color:white;border: 2px solid white;border-radius:25px; height: 400px;width:400px");
    image = document.createElement("img");
    image.setAttribute("src",src);
    image.setAttribute("style","height: 100%; width: 100%;border-radius:25px;");
    modalDialogImageDiv.appendChild(image);
    /* 
        modalDialogTextSpan = document.createElement("span"); 
        modalDialogText = document.createElement("strong"); 
        modalDialogText.innerHTML = "Processing...  Please Wait.";
        breakElement = document.createElement("br"); 
    */

   modalDialogParentDiv.appendChild(modalDialogHeaderDiv);
   modalDialogParentDiv.appendChild(modalDialogImageDiv);

    /*
        modalDialogTextSpan.appendChild(modalDialogText);
        modalDialogTextDiv.appendChild(modalDialogTextSpan);
        modalDialogTextDiv.appendChild(breakElement);
        modalDialogTextDiv.appendChild(breakElement);
        modalDialogHeaderDiv.appendChild(modalDialogTextDiv);
    */
document.body.appendChild(mainDiv);
document.body.appendChild(modalDialogParentDiv);
}
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
                    resultpopup(response.imgsrc);
                    
// $('.close-div').on('click', function(){
//     $(this).closest("#clients-edit-wrapper").remove();
// });
                    sendResponse(response);
                })
            })
        }
    }
    return true;
});
