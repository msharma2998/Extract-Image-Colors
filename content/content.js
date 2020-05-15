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

    breakElement = document.createElement("hr"); 

    modalDialogImageDiv = document.createElement("div"); 
    modalDialogImageDiv.setAttribute("style" , "margin: auto; margin-top:10px; margin-bottom:10px; background-color:white;border: 2px solid white;border-radius:25px; height: 350px;width:400px");
    image = document.createElement("img");
    image.setAttribute("src",src);
    image.setAttribute("style","height: 100%; width: 100%;border-radius:25px;");
    modalDialogImageDiv.appendChild(image);

    modalDialogColorDiv = document.createElement("div");
    modalDialogColorDiv.setAttribute("style","width:630px;height:200px; display:flex; margin:10px");
    modalDialogDominantColorDiv = document.createElement("div");
    modalDialogDominantColorDiv.setAttribute("style","height: 100%; width: 200px;");
    DominantColorTitle =  document.createElement("h3");
    DominantColorTitle.innerHTML = "Dominant Color";
    DominantColorTitle.setAttribute("style","text-align: left; margin-left:5px;");

    DominantColorContainer = document.createElement("div");
    DominantColorContainer.setAttribute("style","width: 50px;height: 80px;margin:10px;");
    DominantColor = document.createElement("div");
    DominantColor.setAttribute("style","margin-top:30px;background-color: red;border: 1px solid red;border-radius: 50%;height: 50px;width: 50px;")
    DominantColorContainer.appendChild(DominantColor);
    modalDialogDominantColorDiv.appendChild(DominantColorTitle);
    modalDialogDominantColorDiv.appendChild(DominantColorContainer);
    
    modalDialogColorPaletteDiv = document.createElement("div");
    modalDialogColorPaletteDiv.setAttribute("style","height: 100%; width: 430px ");
    PaletteTitle =  document.createElement("h3");
    PaletteTitle.innerHTML = "Palette";
    PaletteTitle.setAttribute("style","text-align: left; margin-left:5px;");
    modalDialogColorPaletteDiv.appendChild(PaletteTitle);
    PaletteColorsDiv = document.createElement("div");
    PaletteColorsDiv.setAttribute("style","height: 200px; width: 430px;margin:0;display: flex;flex-wrap: wrap;align-items: flex-start; ");
    for(var i=0;i<10;i++)
    {
        PaletteContainer = document.createElement("div");
        PaletteContainer.setAttribute("style","width: 50px;height: 80px;margin:4px;");
        PaletteColors = document.createElement("div");
        PaletteColors.setAttribute("style","background-color:red; border: 1px solid red;border-radius: 50%;height: 50px;width: 50px;")
        PaletteContainer.appendChild(PaletteColors);
        PaletteColorsDiv.appendChild(PaletteContainer);
    }
    
    modalDialogColorPaletteDiv.appendChild(PaletteColorsDiv); 
    modalDialogColorDiv.appendChild(modalDialogDominantColorDiv);
    modalDialogColorDiv.appendChild(modalDialogColorPaletteDiv);

    modalDialogParentDiv.appendChild(modalDialogHeaderDiv);
    modalDialogParentDiv.appendChild(breakElement);
    modalDialogParentDiv.appendChild(modalDialogImageDiv);
    modalDialogParentDiv.appendChild(modalDialogColorDiv);
    
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
