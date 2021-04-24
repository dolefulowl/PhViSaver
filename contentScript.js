// closes your tab if 's' has been pressed
function closeTab(e) {
    let key = e.code;
    if(key === 'KeyS') {
        chrome.runtime.sendMessage({close: "theTab"});
    }

}
document.addEventListener('keypress', closeTab);