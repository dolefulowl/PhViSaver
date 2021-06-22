const settingsIcon = document.querySelector('.settingsNav img');
const modalSettings = document.querySelector('.modal .modal-settings');
const acceptButton = document.querySelector('.modal-settings__button');
const modal = document.querySelector('.modal')
const theCurrentKey = document.querySelector('.theKey.current');
const theNewKey = document.querySelector('.theKey.new');
let areSettingsOpened = false
let temporaryKey;

/*------------------------Settings------------------------*/
function setTheNewKey (e) {
    temporaryKey = [e.code, e.key]
    theNewKey.textContent = temporaryKey[1];
}

function setTheCurrentKey () {
        chrome.storage.local.get('theKey', function(result) {
            const theKey = result.theKey[1];
            theCurrentKey.textContent = theKey;
        });
}

function toggleSettings() {
    areSettingsOpened = !areSettingsOpened
    if(areSettingsOpened) {
        setTheCurrentKey();
        document.addEventListener('keypress', setTheNewKey);
    } else {
        document.removeEventListener('keypress', setTheNewKey);
    }
    modal.classList.toggle('show');
}

function acceptTheNewKey () {
    chrome.storage.local.set({'theKey': temporaryKey});
    setTheCurrentKey()
}

settingsIcon.addEventListener('click', toggleSettings)
modal.addEventListener('click', toggleSettings)
modalSettings.addEventListener('click', (e) => {e.stopPropagation()})
acceptButton.addEventListener('click', acceptTheNewKey)


/*------------------------Creates and manages iframes------------------------*/
function deleteVideo () {
    const close = document.querySelectorAll('.close');
    close.forEach((video) => video.addEventListener('click', function  () {
        const currentVideo = video.getAttribute('data-id');
        chrome.storage.local.remove(currentVideo)
        document.getElementById(currentVideo).remove();
    }));
}

chrome.storage.local.get(null, function(items) {
    let allKeys = Object.keys(items)
    const framesHolder = document.querySelector('.frames');
    allKeys.forEach(function (timestamp) {
        if(timestamp === 'theKey') {return}
        const phId = items[timestamp]
        const iframe = `<div class="frame__inner" id="${timestamp}">
                          <div class="border-frame"><div class="close" data-id="${timestamp}"><img src="img/close-icon.png" alt=""></div></div>
                          <iframe 
                          src=\"https://www.pornhub.com/embed/${phId}\" 
                          frameborder=\"0\"
                          width=\"340\" 
                          height=\"220\" 
                          scrolling=\"no\" 
                          allowfullscreen>
                          </iframe>
                      </div>`;
        framesHolder.insertAdjacentHTML('afterbegin',  iframe);
    })
    deleteVideo();
});
