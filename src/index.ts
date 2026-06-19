import { PlannerAgent } from "./agents/planner.agent.js";

async function main() {
  const planner = new PlannerAgent();

  const result = await planner.run("高考结束");

  console.log(result);
}

main();