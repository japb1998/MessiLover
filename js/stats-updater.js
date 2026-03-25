/**
 * Stats Updater Module
 *
 * This module provides a mechanism to periodically check for and apply
 * updated statistics for Messi's career data. It uses a configuration-based
 * approach where updated stats can be served from a JSON endpoint.
 *
 * For local/static deployments, the stats in data.js are used directly.
 * For dynamic deployments, point STATS_CONFIG.endpoint to your data API.
 */

const StatsUpdater = (() => {
  const CONFIG = {
    // Set this to your API endpoint for live stat updates
    // e.g., "https://api.example.com/messi-stats.json"
    endpoint: null,

    // How often to check for updates (in milliseconds)
    updateInterval: 24 * 60 * 60 * 1000, // 24 hours

    // Local storage key for caching
    cacheKey: "messi_stats_cache",
    cacheTimestampKey: "messi_stats_timestamp",

    // Version for cache busting
    version: "1.0.0",
  };

  /**
   * Initialize the updater - checks cache, fetches if needed
   */
  function init() {
    // If no endpoint configured, use local data
    if (!CONFIG.endpoint) {
      console.log("[StatsUpdater] No endpoint configured, using local data.");
      return Promise.resolve(MESSI_DATA);
    }

    const cachedTimestamp = localStorage.getItem(CONFIG.cacheTimestampKey);
    const now = Date.now();

    // Check if cache is still valid
    if (cachedTimestamp && now - parseInt(cachedTimestamp) < CONFIG.updateInterval) {
      const cached = localStorage.getItem(CONFIG.cacheKey);
      if (cached) {
        try {
          const parsedData = JSON.parse(cached);
          applyUpdate(parsedData);
          console.log("[StatsUpdater] Using cached data.");
          return Promise.resolve(parsedData);
        } catch (e) {
          console.warn("[StatsUpdater] Cache parse error, fetching fresh data.");
        }
      }
    }

    return fetchUpdatedStats();
  }

  /**
   * Fetch updated stats from the configured endpoint
   */
  async function fetchUpdatedStats() {
    if (!CONFIG.endpoint) return MESSI_DATA;

    try {
      const response = await fetch(`${CONFIG.endpoint}?v=${CONFIG.version}&t=${Date.now()}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();

      // Validate the data structure
      if (validateData(data)) {
        applyUpdate(data);
        cacheData(data);
        console.log("[StatsUpdater] Stats updated from remote.");
        return data;
      } else {
        console.warn("[StatsUpdater] Invalid data structure from remote.");
        return MESSI_DATA;
      }
    } catch (error) {
      console.warn("[StatsUpdater] Fetch failed, using local data:", error.message);
      return MESSI_DATA;
    }
  }

  /**
   * Validate that the fetched data has the expected structure
   */
  function validateData(data) {
    return (
      data &&
      typeof data === "object" &&
      data.stats &&
      data.stats.all &&
      typeof data.stats.all.goals === "number" &&
      typeof data.stats.all.appearances === "number"
    );
  }

  /**
   * Apply fetched data to the global MESSI_DATA object
   */
  function applyUpdate(newData) {
    if (newData.stats) {
      Object.keys(newData.stats).forEach((key) => {
        if (MESSI_DATA.stats[key]) {
          Object.assign(MESSI_DATA.stats[key], newData.stats[key]);
        }
      });
    }

    if (newData.goalsBySeason) {
      MESSI_DATA.goalsBySeason = newData.goalsBySeason;
    }

    if (newData.lastUpdated) {
      MESSI_DATA.lastUpdated = newData.lastUpdated;
    }
  }

  /**
   * Cache data to localStorage
   */
  function cacheData(data) {
    try {
      localStorage.setItem(CONFIG.cacheKey, JSON.stringify(data));
      localStorage.setItem(CONFIG.cacheTimestampKey, Date.now().toString());
    } catch (e) {
      console.warn("[StatsUpdater] Could not cache data:", e.message);
    }
  }

  /**
   * Force a refresh of stats (bypass cache)
   */
  function forceRefresh() {
    localStorage.removeItem(CONFIG.cacheKey);
    localStorage.removeItem(CONFIG.cacheTimestampKey);
    return fetchUpdatedStats();
  }

  /**
   * Set a custom endpoint for stats updates
   */
  function setEndpoint(url) {
    CONFIG.endpoint = url;
  }

  /**
   * Set custom update interval
   */
  function setUpdateInterval(ms) {
    CONFIG.updateInterval = ms;
  }

  /**
   * Schedule periodic updates
   */
  function startPeriodicUpdates() {
    if (!CONFIG.endpoint) return;

    setInterval(async () => {
      console.log("[StatsUpdater] Running periodic update check...");
      await fetchUpdatedStats();
      // Dispatch event for UI to react
      window.dispatchEvent(new CustomEvent("messi-stats-updated", { detail: MESSI_DATA }));
    }, CONFIG.updateInterval);
  }

  return {
    init,
    forceRefresh,
    setEndpoint,
    setUpdateInterval,
    startPeriodicUpdates,
  };
})();
