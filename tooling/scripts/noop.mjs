#!/usr/bin/env node

const [, , task = "task", workspace = "workspace"] = process.argv;

console.log(`[foundation] ${workspace}: ${task} placeholder passed`);
