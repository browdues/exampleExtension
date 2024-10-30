"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Initialize button with user's preferred color
let changeColor = document.getElementById('changeColor');
chrome.storage.sync.get('color', ({ color }) => {
    changeColor.style.backgroundColor = color;
});
// When the button is clicked, inject a content script into the current tab that will change the background color
changeColor.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    let [tab] = yield chrome.tabs.query({ active: true, currentWindow: true });
    if (tab.url && !/^chrome:\/\//.test(tab.url)) {
        yield chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: setPageBackgroundColor,
        });
    }
    else {
        console.error('Scripts cannot be executed on chrome:// URLs.');
    }
}));
function setPageBackgroundColor() {
    chrome.storage.sync.get('color', ({ color }) => {
        document.body.style.backgroundColor = color;
    });
}
