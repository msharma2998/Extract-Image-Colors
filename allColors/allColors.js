function rgbvalues(color)
{
    var color = color;
    var matchColors = /rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/;
    var match = matchColors.exec(color);
    return match;
}
function rgbToHex(r, g, b) 
{
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
chrome.storage.local.get("userColors",function(result)
{
    var updateColors = result.userColors;
    var len = updateColors.length;
    for(var i=0;i<len;i++)
    {
        var container = document.createElement("div");
        container.setAttribute("class","container");
        var colors = document.createElement("div");
        colors.setAttribute("class","colors");
        colors.style.backgroundColor = updateColors[i];
        var del = document.createElement("button");
        del.setAttribute("class","delete");
        del.innerHTML = "Delete";
        container.appendChild(colors);
        container.appendChild(del);
        document.body.appendChild(container);
    }
    $(document).on('click','.delete',function()
    {
        var rgbColor = $(this).siblings().css("background-color");
        console.log(rgbColor);
        var match = rgbvalues(rgbColor);
        console.log(match);
        var hex = rgbToHex(Number(match[1]),Number(match[2]),Number(match[3]));
        console.log(hex);
        var index = updateColors.indexOf(hex);
        console.log(index);
        updateColors.splice(index,1);
        chrome.storage.local.set({userColors : updateColors});
    })
})