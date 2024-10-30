let color = '#3aa757';
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({color: color}, ()=> {
        console.log('Default background color set to %cgreen', `color: ${color}`);
    });
});