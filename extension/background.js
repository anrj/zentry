const filteredURLs = [
  "https://www.youtube.com/",
  "facebook.com",
  "twitter.com",
  "instagram.com",
  "reddit.com",
  "twitch.tv",
  "x.com",
  "https://www.messenger.com/t/6959179037446661/",
];

function parseDomain(domain) {
  if (!domain) return null;

  let clean = domain.trim().toLowerCase();


  try {
      if (!clean.startsWith('http://') && !clean.startsWith('https://')) {
         clean = 'https://' + clean;
      }
      const urlObject = new URL(clean);
      console.log('urlObject:', urlObject);
      return urlObject.hostname;
  } catch (e) {
      const parts = clean.replace(/^https?:\/\//, '').split('/');
      const potentialHostname = parts[0];
      if (potentialHostname && potentialHostname.includes('.')) {
          return potentialHostname;
      }
      console.warn(`Could not parse domain entry: "${domain}". Skipping.`);
      return null;
  }
}

const blockedDomains = filteredURLs
                           .map(parseDomain)
                           .filter(domain => domain !== null);

console.log("Service worker starting/restarting...");
console.log("Cleaned block list for matching:", blockedDomains);

async function checkAndBlockOpenTabs() {
  console.log("Checking currently open tabs...");
  const blockPageUrl = chrome.runtime.getURL('blocked/blocked.html');

  try {
    const tabs = await chrome.tabs.query({});

    for (const tab of tabs) {
      if (tab.url && (tab.url.startsWith('http:') || tab.url.startsWith('https:'))) {
        try {
          const url = new URL(tab.url);
          const currentHostname = url.hostname.toLowerCase();

          const isBlocked = blockedDomains.some(blockedDomain => {
            return currentHostname === blockedDomain || currentHostname.endsWith('.' + blockedDomain);
          });

          if (isBlocked) {
            console.log(`Found open blocked tab: ${currentHostname} (Tab ID: ${tab.id}). Redirecting.`);
            await chrome.tabs.update(tab.id, { url: blockPageUrl });
          }
        } catch (e) {
          // Ignore invalid URLs (e.g., chrome://, file://) which might throw URL constructor error
          // console.log(`Skipping tab with invalid URL: ${tab.url}`);
        }
      } else {
        // Optional: Log tabs being skipped
        // console.log(`Skipping tab without http/https URL: ${tab.url} (Tab ID: ${tab.id})`);
        // MILV 😎 Man I Love Vibecoding
      }
    }
    console.log("Finished checking open tabs.");

  } catch (error) {
    console.error("Error querying or updating tabs:", error);
  }
}

chrome.webNavigation.onBeforeNavigate.addListener(async (details) => {
  if (details.frameId !== 0) {
    return;
  }

  if (blockedDomains.length === 0) {
      return;
  }

  const url = new URL(details.url);
  const currentHostname = url.hostname.toLowerCase();
  console.log(currentHostname);

  const isBlocked = blockedDomains.some(blockedDomain => {
      return currentHostname === blockedDomain || currentHostname.endsWith('.' + blockedDomain);
  });

  if (isBlocked) {
    console.log(`Blocking navigation to ${currentHostname}`);
    const blockPageUrl = chrome.runtime.getURL('blocked/blocked.html');

    try {
        await chrome.tabs.update(details.tabId, { url: blockPageUrl });
        console.log(`Redirected tab ${details.tabId} to ${blockPageUrl}`);
    } catch (error) {
        console.error(`Failed to redirect tab ${details.tabId}: ${error}`);
    }
  }
}, { url: [{ urlMatches: 'https://*/*' }, { urlMatches: 'http://*/*' }] });


checkAndBlockOpenTabs();
