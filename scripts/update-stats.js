#!/usr/bin/env node

/**
 * Messi Stats Updater Script
 *
 * This script can be run periodically (e.g., via cron job or GitHub Actions)
 * to fetch the latest Messi statistics and update the data.js file.
 *
 * Usage:
 *   node scripts/update-stats.js
 *
 * To set up automated updates:
 *
 * 1. CRON JOB (weekly update):
 *    0 0 * * 0 cd /path/to/MessiLover && node scripts/update-stats.js
 *
 * 2. GITHUB ACTIONS: See .github/workflows/update-stats.yml
 *
 * 3. MANUAL: Simply edit js/data.js with the latest numbers
 *
 * This script provides a template for fetching from football data APIs.
 * Replace the API_CONFIG with your preferred data source.
 */

const fs = require("fs");
const path = require("path");

const API_CONFIG = {
  // Replace with your football data API key and endpoint
  // Popular options: football-data.org, api-football.com, sofascore
  endpoint: null, // e.g., "https://api-football-v1.p.rapidapi.com/v3"
  apiKey: null,
  playerId: 154, // Messi's common API ID
};

const DATA_FILE = path.join(__dirname, "..", "js", "data.js");

/**
 * Fetch latest stats from configured API
 * This is a template - implement based on your chosen API
 */
async function fetchLatestStats() {
  if (!API_CONFIG.endpoint || !API_CONFIG.apiKey) {
    console.log("No API configured. To enable automatic updates:");
    console.log("1. Sign up for a football data API (e.g., api-football.com)");
    console.log("2. Set the endpoint and apiKey in this script");
    console.log("3. Run this script periodically via cron or GitHub Actions");
    console.log("\nFor now, please update js/data.js manually.");
    return null;
  }

  try {
    const response = await fetch(
      `${API_CONFIG.endpoint}/players?id=${API_CONFIG.playerId}&season=2025`,
      {
        headers: {
          "X-RapidAPI-Key": API_CONFIG.apiKey,
          "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
        },
      }
    );

    if (!response.ok) throw new Error(`API responded with ${response.status}`);
    const data = await response.json();
    return transformApiData(data);
  } catch (error) {
    console.error("Failed to fetch stats:", error.message);
    return null;
  }
}

/**
 * Transform API response into our data format
 */
function transformApiData(apiData) {
  // This transformation depends on your chosen API's response format
  // Below is a template for api-football.com's format
  const player = apiData?.response?.[0];
  if (!player) return null;

  const stats = player.statistics?.[0];
  if (!stats) return null;

  return {
    lastUpdated: new Date().toISOString().split("T")[0],
    currentSeason: {
      appearances: stats.games?.appearences || 0,
      goals: stats.goals?.total || 0,
      assists: stats.goals?.assists || 0,
    },
  };
}

/**
 * Update the data.js file with new current season stats
 */
function updateDataFile(newStats) {
  if (!newStats) return false;

  let content = fs.readFileSync(DATA_FILE, "utf-8");

  // Update the lastUpdated field
  content = content.replace(
    /lastUpdated:\s*"[^"]*"/,
    `lastUpdated: "${newStats.lastUpdated}"`
  );

  // Update current season in goalsBySeason (last entry)
  if (newStats.currentSeason?.goals !== undefined) {
    const seasonRegex = /(\{\s*season:\s*"25\/26",\s*goals:\s*)\d+/;
    if (seasonRegex.test(content)) {
      content = content.replace(seasonRegex, `$1${newStats.currentSeason.goals}`);
    }
  }

  fs.writeFileSync(DATA_FILE, content, "utf-8");
  console.log(`Stats updated successfully! (${newStats.lastUpdated})`);
  return true;
}

/**
 * Main execution
 */
async function main() {
  console.log("=== Messi Stats Updater ===\n");

  const stats = await fetchLatestStats();
  if (stats) {
    updateDataFile(stats);
  }

  console.log("\nDone.");
}

main().catch(console.error);
