#!/usr/bin/env  bun

// yeh jo uper h isse shebang kehte h, isse pata chalta h ki yeh file kis interpreter se run hogi, is case me bun se run hogi

import { Command } from "commander";
import { runWakeup } from "./tui/wakeup";

const program = new Command();

program
  .name("satya-cli")
  .description("A  CLI project using Bun and TypeScript")
  .version("1.0.0");


program
  .command("wakeup")
  .description("show the banner and pick cli or telegram mode")
  .action(
    async() => {
    await runWakeup();
  }
);


await program.parseAsync(process.argv);