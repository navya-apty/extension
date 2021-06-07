
export function selectDomElements<T>(message: T): void {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {

        if (tabs?.[0]?.id) {
            chrome.tabs.sendMessage(tabs[0].id, message);
        }
    });
}
export function savingDomElements<T>(message: T): void {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {

        if (tabs?.[0]?.id) {
            chrome.tabs.sendMessage(tabs[0].id, message);
        }
    });
}