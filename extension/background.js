const blockedDomains = [
  "youtube.com",
  "facebook.com",
  "twitter.com",
  "instagram.com",
  "reddit.com",
];

console.log("Background service worker started. Blocking:", blockedDomains);

// Listener for navigation events
chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
  // Only act on top-level navigation events
  if (details.frameId !== 0) {
    return;
  }

  // Skip if the blocklist is empty (though it's hardcoded here)
  if (blockedDomains.length === 0) {
      return;
  }

  const url = new URL(details.url);
  const currentHostname = url.hostname.toLowerCase(); // e.g., "www.youtube.com"

  // Check if the current hostname matches or is a subdomain of any blocked domain
  const isBlocked = blockedDomains.some(blockedDomain => {
      // Normalize blocked domain (remove potential www.)
      const cleanBlockedDomain = blockedDomain.replace(/^www\./, '');

      // Match exact domain or subdomains
      return currentHostname === cleanBlockedDomain || currentHostname.endsWith('.' + cleanBlockedDomain);
  });

  if (isBlocked) {
    console.log(`Blocking navigation to ${currentHostname}`);
    const blockPageUrl = chrome.runtime.getURL('blocked.html'); // Get the extension's local URL

    // Redirect the tab
    try {
        // Using 'await' here ensures we wait for the update attempt.
        // Although in MV3, the service worker might terminate shortly after an async event handler finishes.
        await chrome.tabs.update(details.tabId, { url: blockPageUrl });
        console.log(`Redirected tab ${details.tabId} to ${blockPageUrl}`);
    } catch (error) {
        console.error(`Failed to redirect tab ${details.tabId}: ${error}`);
        // This can happen if the tab is closed quickly, etc.
    }
  }
}, { url: [{ urlMatches: 'https://*/*' }, { urlMatches: 'http://*/*' }] }); // Filter for http/https URLs
