// pass here array of keys (phIds) from local.storage
function createPage (phIds) {
    const framesHolder = document.querySelector('.frames');
    phIds.forEach(function (phId) {
        const link = `<iframe 
                      id=\"${phId}\"
                      src=\"https://www.pornhub.com/embed/${phId}\" 
                      frameborder=\"0\"
                      width=\"340\" 
                      height=\"220\" 
                      scrolling=\"no\" 
                      allowfullscreen>
                      </iframe>`;
        framesHolder.insertAdjacentHTML('afterBegin',  link);
    });
}
//gets keys and calls createPage
chrome.storage.local.get(null, function(items) {
    let allKeys = Object.keys(items);
    createPage(allKeys);
});
