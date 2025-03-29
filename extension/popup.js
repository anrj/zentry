function setBadgeText(enabled) {
    const text = enabled ? "ON" : "OFF"
    chrome.action.setBadgeText({text: text})
}

//ON/OFF switch
const checkbox = document.getElementById("enabled")
chrome.storage.sync.get("enabled", (data) => {
    checkbox.checked = !!data.enabled
    setBadgeText(data.enabled)
})
checkbox.addEventListener("change", (event) => {
    if (event.target instanceof HTMLInputElement) {
        chrome.storage.sync.set({"enabled": event.target.checked})
        setBadgeText(event.target.checked)
    }
})
