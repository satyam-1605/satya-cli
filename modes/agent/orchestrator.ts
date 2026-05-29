import {isCancel, text} from '@clack/prompts';
import chalk from 'chalk';
import {defaultAgentConfig} from './types';
import {ActionTracker} from './action-tracker';
import {ToolExecutor} from './tool-executor';



export async function runAgentMode(){
    console.log(chalk.green('Agent mode Activated!'));

    const goal = await text({
        message:"what would you like the agent to do?",
        placeholder:"Concrete task for this codebase...",
    });

    if(isCancel(goal) || !goal.trim()) return;



const config = defaultAgentConfig();
const tracker = new ActionTracker();

const executor = new ToolExecutor(tracker, config);

}

