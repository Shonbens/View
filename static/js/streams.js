const APP_ID = 'Your ID'
const CHANNEL = 'main'
const TOKEN = 'Your Token'
let UID;

//Provides a basic Interface for voice and video calls
const client = AgoraRTC.createClient({mode:'rtc', codec:'vp8'})

//Stores our audio and video tracks.
let localTracks = []

//Stores users audio and video.
let remoteUsers = {}

//joins the audio and videos from all users and displays it.
let joinAndDisplayLocalStream = async () => {
    UID = await client.join(APP_ID, CHANNEL, TOKEN, null)
    //gets audio and video tracks.
    localTracks = await AgoraRTC.createMicrophoneAndCameraTracks()
    //creates a player and appends it to the local html.
    let player = `<div class="video-container" id="user-container-${UID}">
                    <div class="username-wrapper"><span class="user-name">Name</span></div>
                    <div class="video-player" id="user-${UID}"></div>
                </div>`
    document.getElementById('video-streams').insertAdjacentHTML('beforeend', player)
    
    //plays the video in a tag
    localTracks[1].play(`user-${UID}`)

    //publishes our audio and video to the channel so others can see it.
    await client.publish([localTracks[0], localTracks[1]])
}

joinAndDisplayLocalStream()




