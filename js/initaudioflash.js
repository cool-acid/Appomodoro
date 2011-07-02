var myListener = new Object();
                
myListener.onInit = function()
{
    this.position = 0;
};
myListener.onUpdate = function()
{
    var pass = ':)';
};
                
function getFlashObject()
{
    return document.getElementById("flashAudio");
}
function play()
{
    console.log('Alarma (flash)')
    getFlashObject().SetVariable("method:setUrl", "/sounds/alarm.mp3");
    getFlashObject().SetVariable("method:play", "");
    getFlashObject().SetVariable("enabled", "true");
}