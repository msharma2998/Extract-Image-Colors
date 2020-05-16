function resultpopup(src)
{
    mainDiv = document.createElement("div");
    mainDiv.setAttribute("id","mainDiv");
    
    iframeElement = document.createElement("iframe");
    iframeElement.setAttribute("id","iframeElement");

    mainDiv.appendChild(iframeElement);

    modalDialogParentDiv = document.createElement("div");
    modalDialogParentDiv.setAttribute("id","modalDialogParentDiv");

    modalDialogHeaderDiv = document.createElement("div");
    modalDialogHeaderDiv.setAttribute("id" , "modalDialogHeaderDiv");

    breakElement = document.createElement("hr");
    
    modalDialogImageDiv = document.createElement("div"); 
    modalDialogImageDiv.setAttribute("id" , "modalDialogImageDiv");
    image = document.createElement("img");
    image.setAttribute("src",src);
    image.setAttribute("id","image");
    modalDialogImageDiv.appendChild(image);

    modalDialogColorDiv = document.createElement("div");
    modalDialogColorDiv.setAttribute("id","modalDialogColorDiv");
    modalDialogDominantColorDiv = document.createElement("div");
    modalDialogDominantColorDiv.setAttribute("id","modalDialogDominantColorDiv");
    DominantColorTitle =  document.createElement("h3");
    DominantColorTitle.innerHTML = "Dominant Color";
    DominantColorTitle.setAttribute("id","DominantColorTitle");

    DominantColorContainer = document.createElement("div");
    DominantColorContainer.setAttribute("id","DominantColorContainer");
    DominantColor = document.createElement("div");
    DominantColor.setAttribute("style","margin-top:30px;background-color: red;border: 1px solid red;border-radius: 50%;height: 50px;width: 50px;")
    DominantColorContainer.appendChild(DominantColor);
    modalDialogDominantColorDiv.appendChild(DominantColorTitle);
    modalDialogDominantColorDiv.appendChild(DominantColorContainer);
    
    modalDialogColorPaletteDiv = document.createElement("div");
    modalDialogColorPaletteDiv.setAttribute("id","modalDialogColorPaletteDiv");
    PaletteTitle =  document.createElement("h3");
    PaletteTitle.innerHTML = "Palette";
    PaletteTitle.setAttribute("id","PaletteTitle");
    modalDialogColorPaletteDiv.appendChild(PaletteTitle);
    PaletteColorsDiv = document.createElement("div");
    PaletteColorsDiv.setAttribute("id","PaletteColorsDiv");
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

function rgbToHex(r, g, b) 
{
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
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
                    var hexarray=[];
                    for(var i=0;i<10;i++)
                    {
                        hexarray.push(rgbToHex(response.paletteColors[i][0],response.paletteColors[i][1],response.paletteColors[i][2]));
                    }
                    console.log(hexarray);
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
