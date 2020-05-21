function resultpopup(src,color,palette)
{
    mainDiv = document.createElement("div");
    mainDiv.setAttribute("id","mainDiv");
    
    iframeElement = document.createElement("iframe");
    iframeElement.setAttribute("id","iframeElement");

    mainDiv.appendChild(iframeElement);

    modalDialogParentDiv = document.createElement("div");
    modalDialogParentDiv.setAttribute("id","modalDialogParentDiv");
   
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
    DominantColor.setAttribute("style","margin-top:30px;border: 0px solid white;border-radius: 50%;height: 50px;width: 50px;")
    DominantColor.style.backgroundColor = color;
    DominantColorName =  document.createElement("p");
    DominantColorName.setAttribute("style","font-size:12px; font-weight:700;");
    DominantColorName.innerHTML = color;
    DominantColorContainer.appendChild(DominantColor);
    DominantColorContainer.appendChild(DominantColorName);
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
        PaletteContainer.setAttribute("style","width: 45px;height: 65px;margin:4px;");
        PaletteColors = document.createElement("div");
        PaletteColors.setAttribute("style","border: 0px solid white;border-radius: 50%;height: 45px;width: 45px;")
        PaletteColors.style.backgroundColor = palette[i];
        ColorName =  document.createElement("p");
        ColorName.setAttribute("style","font-size:11px;font-weight:700; margin-top:5px; margin-bottom:5px");
        ColorName.innerHTML = palette[i];
        PaletteContainer.appendChild(PaletteColors);
        PaletteContainer.appendChild(ColorName);
        PaletteColorsDiv.appendChild(PaletteContainer);
    }
    
    modalDialogColorPaletteDiv.appendChild(PaletteColorsDiv); 
    modalDialogColorDiv.appendChild(modalDialogDominantColorDiv);
    modalDialogColorDiv.appendChild(modalDialogColorPaletteDiv);

    breakElement = document.createElement("hr");
    breakElement.setAttribute("id","breakElement");

    modalDialogQuestionDiv = document.createElement("div");
    modalDialogQuestionDiv.setAttribute("id","modalDialogQuestionDiv");
    Question = document.createElement("strong");
    Question.setAttribute("id","Question");
    Question.innerHTML = "Do you want to save these colors?";
    QuestionDiv = document.createElement("div");
    QuestionDiv.setAttribute("id","QuestionDiv");
    ButtonYes = document.createElement("button");
    ButtonYes.setAttribute("class","Button");
    ButtonYes.setAttribute("id","Yes");
    ButtonNo = document.createElement("button");
    ButtonNo.setAttribute("class","Button");
    ButtonNo.setAttribute("id","No"); 
    ButtonYes.innerHTML = "YES";
    ButtonNo.innerHTML = "NO";
    QuestionDiv.appendChild(ButtonYes);
    QuestionDiv.appendChild(ButtonNo);
    modalDialogQuestionDiv.appendChild(Question);
    modalDialogQuestionDiv.appendChild(QuestionDiv);

    modalDialogParentDiv.appendChild(modalDialogImageDiv);
    modalDialogParentDiv.appendChild(modalDialogColorDiv);
    modalDialogParentDiv.appendChild(breakElement);
    modalDialogParentDiv.appendChild(modalDialogQuestionDiv);
    
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
                var port = chrome.runtime.connect({name: "Content"});
                port.postMessage({imgsrc : source});
                port.onMessage.addListener(function(response)
                {
                    console.log(response);
                    var hexarray=[];
                    var hexdominantcolor = rgbToHex(response.color[0],response.color[1],response.color[2]);
                    for(var i=0;i<10;i++)
                    {
                        hexarray.push(rgbToHex(response.paletteColors[i][0],response.paletteColors[i][1],response.paletteColors[i][2]));
                    }
                    console.log(hexarray);
                    resultpopup(response.imgsrc,hexdominantcolor,hexarray);
                    $(document).on('click', '.Button', function() {
                        var id = $(this).attr("id");
                        port.postMessage({doWeStore : id});
                        var div1 = document.getElementById('mainDiv');
                        var div2 = document.getElementById('modalDialogParentDiv');
                        document.body.removeChild(div1);
                        div2.parentNode.removeChild(div2);
                    });
                    sendResponse(response);
                })
                
            })
        }
    }
    return true;
});