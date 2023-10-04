window.IsDisplayed=function(element) {
    return window.getComputedStyle(element).display !== "none";
};

window.Hide=function(element) {
    element.style.display = "none";
};

window.Show=function(element) {
    element.style.display = "block";
};

window.ShowAs=function(element,str) {
    element.style.display = str;
};

window.IsNull=function(element) {
    if (element) return false;
    return true;
};

function goTo(id,offset=3.125)
{
    let element=document.getElementById(id);
    var rect = element.getBoundingClientRect();
    window.scrollBy(0,rect.y-convertRemToPixels(offset));
}

function convertRemToPixels(rem) 
{
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}