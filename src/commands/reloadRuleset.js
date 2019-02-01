import * as vscode from 'vscode'
import { RELOAD_RULESET_COMMAND_NAME } from '../commandNames'

/**
 * Reloads the current working ruleset and applies the rules to the current file
 */
const enact = () => {
    console.log('[cmd::reloadRuleset] called')
}

/**
 *
 * @param {vscode.ExtensionContext} context
 */
export const register = context => {
    const disposable = vscode.commands.registerCommand(
        RELOAD_RULESET_COMMAND_NAME,
        enact
    )

    context.subscriptions.push(disposable)
}
