import * as vscode from 'vscode'
import { ADD_RULE_COMMAND_NAME, RELOAD_RULESET_COMMAND_NAME } from '../commandNames'

/**
 * Opens the config file for the ruleset so that the user can quickly get to
 * editing the rule
 */
const openConfigToEdit = () => {
    console.log('[cmd::addRule] opening config file to edit rule')

    // todo can we call this on config file save?
    vscode.commands.executeCommand(RELOAD_RULESET_COMMAND_NAME)
}

/**
 * Adds the new rule to the config file for the ruleset
 * @param {string} rulesetName
 * @param {string} ruleName
 */
const addRuleToConfig = (rulesetName, ruleName) => {
    console.log(`[cmd::addRule] adding rule '${ruleName}' to ruleset '${rulesetName}' config`)
}

/**
 * Asks the user what the new ruleset should be called
 * @returns {Thenable<string>}
 */
const showSetRulesetNameInputBox = () =>
    vscode.window.showInputBox({
        prompt: "Enter Ruleset Name",
        placeHolder: "Ruleset Name..."
    })

/**
 * Asks the user what the new rule should be called
 * @param {string} rulesetName
 */
const showSetRuleNameInputBox = (rulesetName) => {
    vscode.window.showInputBox({
        prompt: `Enter Rule Name for ruleset ${rulesetName}`,
        placeHolder: "rule name"
    }).then(ruleName => {
        if (!ruleName) {
            console.log('[cmd::addRule] user cancelled')
            return
        }

        addRuleToConfig(rulesetName, ruleName)
        openConfigToEdit()
    })
}

/**
 * Gets the current working ruleset name and returns it
 * @returns {string} the name of the current working ruleset, or undefined if not exists
 */
const getWorkingRulesetName = () => undefined

/**
 * Performs the addRule command
 */
const enact = () => {
    console.log('[cmd::addRule] called')

    // If no currently selected ruleset, ask user what ruleset should be named
    let rulesetName = getWorkingRulesetName()
    if (!rulesetName) {
        console.log('[cmd::addRule] no ruleset found')
        showSetRulesetNameInputBox()
            .then(value => {
                if (!value) {
                    console.log('[cmd::addRule] user cancelled')
                } else {
                    showSetRuleNameInputBox(value)
                }
            })
    } else {
        console.log('[cmd::addRule] found ruleset:', rulesetName)
        showSetRuleNameInputBox(rulesetName)
    }
}

/**
 * @param {vscode.ExtensionContext} context
 */
export const register = (context) => {
    const disposable = vscode.commands.registerCommand(
        ADD_RULE_COMMAND_NAME,
        enact
    )

    context.subscriptions.push(disposable)
}
