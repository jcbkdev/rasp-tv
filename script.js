const mongoose = require("mongoose");

function toggleView(id){
    let element = document.getElementById(id);
    if(element){
        element.classList.toggle("hidden");
    }
}

function quickShow(id){
    let element = document.getElementById(id);
    element.classList.add("quickShow");
    setTimeout(() => {
        element.classList.remove("quickShow")
    }, 3000);
}

function findChannel(number){
    const channelList = document.getElementById("channel-list");
    const channels = channelList.children;
    for(let x in channels) {
        let channel = channels[x]
        let channelNumber = channel.getAttribute("channel-number");
        if(channelNumber){
            if(parseInt(channelNumber) === number){
                channel.classList.add("select")
                return channel;
            }
        }
    }
}

function getCurrentChannelNumber(){
    const channelSelected = document.getElementsByClassName("select");
    if(channelSelected){
        const channelNumber = parseInt(channelSelected[0].getAttribute("channel-number"));
        return [channelNumber, channelSelected[0]];
    }
    return 1;
}

function channelUp(){
    let [channelNumber, channelSelected] = getCurrentChannelNumber()
    console.log(channelNumber)
    channelSelected.classList.remove("select")
    const channel = findChannel(++channelNumber);
    channel.scrollIntoView({behavior: "smooth", block: "center"})
}

function channelDown(){
    let [channelNumber, channelSelected] = getCurrentChannelNumber()
    console.log(channelSelected)
    if(channelNumber === 0){
        return;
    }
    channelSelected.classList.remove("select")
    const channel = findChannel(--channelNumber);
    channel.scrollIntoView({behavior: "smooth", block: "center"})
}

function setOverlayImage(base64Logo){
    const overlay = document.getElementById("overlay-info");
    const img = overlay.getElementsByTagName("img")[0];
    img.src = base64Logo;
}

async function getChannels (){
    mongoose.connect("mongodb://127.0.0.1:27017/channels")
    const Channel = mongoose.model('Channel', { name: String, url: String, base64Logo: String });

    return await Channel.find({});
}