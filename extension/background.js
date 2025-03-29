const blockedDomains = [
  "youtube.com",
  "facebook.com",
  "twitter.com",
  "instagram.com",
  "reddit.com",
  "twitch.tv",
  "x.com",
];

console.log("Background service worker started. Blocking:", blockedDomains);

async function checkAndBlockOpenTabs() {
  console.log("Checking currently open tabs...");
  const blockPageUrl = chrome.runtime.getURL('blocked/blocked.html');

  try {
    // Query all tabs in all windows
    const tabs = await chrome.tabs.query({}); // Get all tabs

    for (const tab of tabs) {
      // Ensure the tab has a URL and it's an http/https URL
      if (tab.url && (tab.url.startsWith('http:') || tab.url.startsWith('https:'))) {
        try {
          const url = new URL(tab.url);
          const currentHostname = url.hostname.toLowerCase();

          const isBlocked = blockedDomains.some(blockedDomain => {
            const cleanBlockedDomain = blockedDomain.replace(/^www\./, '');
            return currentHostname === cleanBlockedDomain || currentHostname.endsWith('.' + cleanBlockedDomain);
          });

          if (isBlocked) {
            console.log(`Found open blocked tab: ${currentHostname} (Tab ID: ${tab.id}). Redirecting.`);
            // Redirect the already open tab
            await chrome.tabs.update(tab.id, { url: blockPageUrl });
          }
        } catch (e) {
          // Ignore invalid URLs (e.g., chrome://, file://) which might throw URL constructor error
          // console.log(`Skipping tab with invalid URL: ${tab.url}`);
        }
      } else {
        // Optional: Log tabs being skipped
        // console.log(`Skipping tab without http/https URL: ${tab.url} (Tab ID: ${tab.id})`);
      }
    }
    console.log("Finished checking open tabs.");

  } catch (error) {
    console.error("Error querying or updating tabs:", error);
  }
}

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
    const blockPageUrl = chrome.runtime.getURL('blocked/blocked.html'); // Get the extension's local URL

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

// --- Run the check for open tabs when the service worker starts ---
// This covers install, update, browser start, and enabling the extension.
checkAndBlockOpenTabs();
