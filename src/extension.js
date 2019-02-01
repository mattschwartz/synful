import * as vscode from 'vscode'
import * as addRule from './commands/addRule'
import * as reloadRuleset from './commands/reloadRuleset'

/**
 *
 * @param {vscode.ExtensionContext} context
 */
const registerCommands = context => {
    addRule.register(context)
    reloadRuleset.register(context)
}

/**
 * Run when synful is first invoked by the user
 * @param {vscode.ExtensionContext} context
 */
export function activate(context) {
    console.log('[main] loading synful')
    console.log('[main] registering commands')

    registerCommands(context)

    console.log('[main] all commands registered')
    console.log('[main] loading complete')
}

// this method is called when your extension is deactivated
export function deactivate() { }
