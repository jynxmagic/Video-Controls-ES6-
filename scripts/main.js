//Written in ES6 =)
//Allman style for brackets -> easier to read
//underscores instead of camelCase -> THIS_IS_A_CONSTANT (functional argument for underscores)
//use strict improves efficiency
'use strict';


//VARIABLES
const video_player = document.querySelector("video");
const play_button = document.getElementById("playPause");
const mute_button = document.getElementById("muteVideo");
const scrub_slider = document.getElementById("seekBar");
const volume_slider = document.getElementById("volumeBar");
const duration_display = document.getElementById ( "durationField" );
const current_time_display = document.getElementById("currentTimeField");
const playback_speed_select = document.getElementById("playbackSpeedField");
//set time before video is played
current_time_display.value = "0:00";
const rewind_button = document.getElementById("rewindButton");
const forward_button = document.getElementById("forwardButton");
//needs to be accessed on a global level - let only lets you access inside the bloc
var volume = video_player.volume;


//EVENT LISTENERS
//all event handlers can be found in functions file

//keydown event used so keys can be held down to speed up rewind/forward/volumeup/volumedown
window.addEventListener("keydown", handle_key_action);
play_button.addEventListener("click", toggle_play);
mute_button.addEventListener("click", toggle_mute);
scrub_slider.addEventListener ("input", scrub_video);
video_player.addEventListener ( "timeupdate", update_play_slider_position );
volume_slider.addEventListener("input", update_volume);
video_player.addEventListener("timeupdate", display_duration);
video_player.addEventListener("timeupdate", display_current_time);
//fix for applying video duration before video is played
video_player.addEventListener("loadedmetadata", display_duration);

playback_speed_select.addEventListener("change", update_playback_speed);
rewind_button.addEventListener("click", jump_back);
rewind_button.addEventListener("dblclick", jump_start);
forward_button.addEventListener("click", jump_forward);