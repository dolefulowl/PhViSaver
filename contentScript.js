function closeTab(event) {
    const currentKey = event.code;
    let theKey;

    // get theKey from local storage
    chrome.storage.local.get('theKey', function(result){
        theKey = result.theKey;
        // if it's the first run, set the default value for theKey
        if(!theKey) {
            chrome.storage.local.set({'theKey': ['Digit3', '3']});
        }
        if(currentKey === theKey[0]) {
            chrome.runtime.sendMessage({close: "theTab"});
        }
    });
}
document.addEventListener('keypress', closeTab);
