'use strict';
//functions


//TOGGLE PLAY FUNTION
let toggle_play = () =>
{
    if(video_player.paused)
    {
        video_player.play()
        play_button.innerHTML = "Pause &#10074;";
    }
    else
    {
        video_player.pause();
        play_button.innerHTML = "Play &#x25BA;";
    }
}; //semi colons after functions ensure minification works properly https://stackoverflow.com/questions/1834642/why-should-i-use-a-semicolon-after-every-function-in-javascript



//TOGGLE MUTE FUNCTION
let toggle_mute = () =>
{
    if(video_player.muted)
    {
        //muted - apply last vlume and set unmute
        video_player.volume = volume;
        video_player.muted = false;
        mute_button.innerHTML = "Mute &#x1f507;";
    }
    else
    {     
        //Not muted - mute
        video_player.volume = 0.00;
        video_player.muted = true;
        mute_button.innerHTML = "Unmute &#x1f50a;";
    }
    
    //update volume slider value to represent the mute
    volume_slider.value = video_player.volume * 100;
};

//VIDEO SLIDER FUNCTIONS

//user update video function
let scrub_video = () =>
{
    let scrub_time = video_player.duration * (scrub_slider.value / 100);
    video_player.currentTime = scrub_time;
};

//auto upate video function
let update_play_slider_position = () =>
{
    scrub_slider.value = (video_player.currentTime / video_player.duration) * 100;
};


//VOLUME SLIDER FUNCTION
let update_volume = () =>
{
    //ensure that volume can carry across to mute functions
    volume = video_player.volume;
    
    
    //set volume
    let slider_volume = volume_slider.value;
    
    video_player.volume = slider_volume / 100;
    
};

//DISPLAY DURATION FUNCTION
let display_duration = () =>
{
	let current_time = video_player.currentTime;
	let video_duration = video_player.duration - current_time;
	let seconds = Math.floor(video_duration % 60);
	
	//cheating way to do if statements - only ever use for a one liner. dont use the ? method unless u got a boolean
	if(seconds < 10) 
		seconds = "0" + seconds;
	
	duration_display.value = Math.floor(video_duration / 60)  + ":" + seconds;
	
};

//DISPLAY CURRENT TIME FUNCTION
let display_current_time = () =>
{
	let current_time = Math.floor(video_player.currentTime);
	
	//build time string for time below 1 min
	if(current_time < 60 && current_time >= 10)
		current_time = "0:" + current_time;
	if(current_time <= 10)
		current_time = "0:0" + current_time;
	
	
	//build time string for time above 1 min
	if(current_time >= 60)
	{
		let mins = Math.floor(current_time / 60);
		
		let seconds = current_time % 60;
		
		if( seconds < 10)
		{
			seconds = "0" + seconds;
		}
		
		current_time = mins + ":" + seconds;
		
	}
	
	current_time_display.value = current_time;
};

//UPDATE PLAYBACK SPEED FUNCTION
let update_playback_speed = () =>
{
	let selected_value = playback_speed_select[playback_speed_select.selectedIndex].value;
	
	video_player.playbackRate = selected_value;
	
};

//JUMP BACK FUNCTION
let jump_back = () => 
{
	let current_time = video_player.currentTime;
	
	current_time = current_time - 30;
	
	if(current_time < 0)
	{
		current_time = 0;
	}

	video_player.currentTime = current_time;
};

//JUMP FORWARD FUNCTION
let jump_forward = () =>
{ 
	video_player.currentTime = video_player.currentTime+10;
};

//GO TO START FUNCTION
let jump_start = () =>
{
	video_player.currentTime = 0;
	video_player.pause();
	
	play_button.innerHTML = "Play &#x25BA;";
};

//RESOLVE WHICH KEY WAS PRESSED AND DO RELEVANT ACTION FUNCTION
let handle_key_action = (event) =>
{
    switch(event.keyCode)
    {
        case 38:
            //UP key pressed
            volume = video_player.volume*1.10;
            
            
            //dont let volume go above 100 - causes error (bugfix)
            if(volume > 1) volume = 1;
            
            video_player.volume = volume;
            volume_slider.value = volume*100;
            break;
        case 40:
            //DOWN key pressed
            volume = video_player.volume*0.90;
            
            //dont let volume get stuck on 0!! (bugfix)
            if(volume == 0) volume = 0.01;
            
            video_player.volume = volume;
            volume_slider.value = volume*100;
            break;
        case 37:
            //LEFT key pressed
            jump_back();
            break;
        case 39:
            //RIGHT key pressed
            jump_forward();
            break;
        case 77:
            //m or M key pressed
            toggle_mute();
            break;
        case 32:
            //spacebar pressed
            toggle_play();
            break;
        default:
            //no default required here - perhaps any other key could pause the video? this would help computer illiterates
            break;
    }
    
    //key down event used instead of key pressed, so you can hold the buttons to zoom the sliders (only really helpful with volume).    
};