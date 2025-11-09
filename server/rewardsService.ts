import { storage } from "./storage";

const SIX_HOURS_IN_MS = 6 * 60 * 60 * 1000;
const CHECK_INTERVAL_MS = 60 * 1000;

let intervalHandle: NodeJS.Timeout | null = null;

function getRandomIncrement(): number {
  const min = 10;
  const max = 7312;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function checkAndUpdateRewards() {
  try {
    let rewards = await storage.getAutomatedRewards();
    
    if (!rewards) {
      rewards = await storage.createAutomatedRewards();
      console.log(`[Rewards Service] Initialized automated rewards with $${rewards.currentTotal}`);
      return;
    }

    const now = new Date();
    const lastUpdated = new Date(rewards.lastUpdated);
    const timeDiff = now.getTime() - lastUpdated.getTime();

    if (timeDiff >= SIX_HOURS_IN_MS) {
      const increment = getRandomIncrement();
      const currentTotal = parseFloat(rewards.currentTotal);
      const newTotal = (currentTotal + increment).toFixed(2);

      const updated = await storage.updateAutomatedRewards(newTotal);
      console.log(`[Rewards Service] Updated rewards: $${rewards.currentTotal} → $${updated.currentTotal} (+$${increment})`);
    }
  } catch (error) {
    console.error("[Rewards Service] Error updating rewards:", error);
  }
}

export function startRewardsService() {
  if (intervalHandle) {
    console.log("[Rewards Service] Service already running, skipping duplicate start");
    return;
  }

  console.log("[Rewards Service] Starting automated rewards service...");
  
  checkAndUpdateRewards();
  
  intervalHandle = setInterval(checkAndUpdateRewards, CHECK_INTERVAL_MS);
  
  console.log("[Rewards Service] Service started. Checking every minute for 6-hour updates.");
}

export function stopRewardsService() {
  if (intervalHandle) {
    clearInterval(intervalHandle);
    intervalHandle = null;
    console.log("[Rewards Service] Service stopped");
  }
}
