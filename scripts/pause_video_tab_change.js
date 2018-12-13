'use strict';

//this is taken from https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
let hidden, visibilityChange; 
if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support 
  hidden = "hidden";
  visibilityChange = "visibilitychange";
} else if (typeof document.msHidden !== "undefined") {
  hidden = "msHidden";
  visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
  hidden = "webkitHidden";
  visibilityChange = "webkitvisibilitychange";
}
//stolen stuff end


document.addEventListener(visibilityChange, function(){
    
  if(document[hidden])
  {
    //does pause the video but takes a while to update the "speaker" icon in the tab. May look not paused but if you look at the time, it pauses.
    video_player.pause();  
  }
  else
  {
    video_player.play();
  }
});