function showWarehousePage(info, tab) {
    let url = chrome.runtime.getURL("/WarehousePage/index.html");
    chrome.tabs.create({ url });
}
chrome.action.onClicked.addListener((tab) => {showWarehousePage()});

chrome.runtime.onMessage.addListener(
    function(request, sender) {
        const timestamp = Date.now();
        const tabId = sender.tab.id
        const tabUrl = sender.tab.url
        const parsedUrl = new URL(tabUrl);
        const phId = parsedUrl.searchParams.get("viewkey");


        chrome.tabs.remove(tabId);
        chrome.storage.local.set({[timestamp]: phId}, function() {
            console.log('Value is set to ' + phId);
        });
    }
);
