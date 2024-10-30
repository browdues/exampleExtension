// Initialize button with user's preferred color
let changeColor = document.getElementById('changeColor');
chrome.storage.sync.get('color', ({ color }) => {
  changeColor!.style.backgroundColor = color;
});

// When the button is clicked, inject a content script into the current tab that will change the background color
changeColor!.addEventListener('click', async (): Promise<void> => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab.url && !/^chrome:\/\//.test(tab.url)) {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id! },
      func: setPageBackgroundColor,
    });
  } else {
    console.error('Scripts cannot be executed on chrome:// URLs.');
  }
});

function setPageBackgroundColor() {
  chrome.storage.sync.get('color', ({ color }) => {
    document.body.style.backgroundColor = color;
  });
}
