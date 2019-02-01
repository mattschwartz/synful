import * as vscode from 'vscode'
import * as fsutil from '../util/fsutil'
import * as rulesetUtil from '../util/rulesetUtil'
import { ADD_RULE_COMMAND_NAME } from '../commandNames'

const CURRENT_WORKING_RULESET = 'synful/current_working_ruleset'
const ALL_WORKING_RULESETS = 'synful/all_working_rulesets'

/**
 * Opens the config file for the ruleset so that the user can quickly get to
 * editing the rule
 */
const openConfigToEdit = filename => {
    console.log('[cmd::addRule] opening config file to edit rule')
    fsutil.openFileInVSCode(filename)

    // todo should we call this on config file save?
    // vscode.commands.executeCommand(RELOAD_RULESET_COMMAND_NAME)
}

/**
 * Adds the new rule to the config file for the ruleset
 * @param {string} rulesetName
 * @param {string} ruleName
 */
const addRuleToConfig = (rulesetName, ruleName) => {
    console.log(`[cmd::addRule] adding rule '${ruleName}' to ruleset '${rulesetName}' config`)
    rulesetUtil.addRuleToRuleset(rulesetName, ruleName)
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
const showSetRuleNameInputBox = rulesetName => {
    vscode.window.showInputBox({
        prompt: `Enter Rule Name for ruleset ${rulesetName}`,
        placeHolder: "rule name"
    }).then(ruleName => {
        if (!ruleName) {
            console.log('[cmd::addRule] user cancelled')
            return
        }

        const progressOptions = {
            location: vscode.ProgressLocation.Notification,
            title: 'Creating ruleset...'
        }
        const task = () => new Promise(resolve => {
            addRuleToConfig(rulesetName, ruleName)
            openConfigToEdit(rulesetName + '.js')
            resolve()
        })

        vscode.window.withProgress(progressOptions, task)
    })
}

/**
 * Performs the addRule command
 * @param {vscode.ExtensionContext} context
 */
const enact = context => {
    const activeFilepath = vscode.window.activeTextEditor && vscode.window.activeTextEditor.document.fileName
    if (!activeFilepath) {
        console.error('[cmd::addRule::FAILED] no file open - cannot apply rules!')
        vscode.window.showErrorMessage('[synful::FAILED] No active file open: cannot apply rules.')
        return
    }

    console.log('[cmd::addRule] called on current file:', activeFilepath)
    const workingRuleset = false // context.workspaceState.get(CURRENT_WORKING_RULESET)

    // If no currently selected ruleset, ask user what ruleset should be named
    if (!workingRuleset) {
        console.log('[cmd::addRule] no ruleset found')
        showSetRulesetNameInputBox()
            .then(value => {
                console.log('[cmd::addRule] creating file with name:', value)
                rulesetUtil.saveNewRuleset(value, activeFilepath)

                return value
            })
            .then(value => {
                if (!value) {
                    console.log('[cmd::addRule] user cancelled')
                } else {
                    showSetRuleNameInputBox(value)
                }
            })
            .catch(reason => {
                console.error('[cmd::addRule::FAILED] received an error:', reason)
            })
    } else {
        console.log('[cmd::addRule] found ruleset:', workingRuleset)
        showSetRuleNameInputBox(workingRuleset)
    }
}

/**
 * @param {vscode.ExtensionContext} context
 */
export const register = (context) => {
    const disposable = vscode.commands.registerCommand(
        ADD_RULE_COMMAND_NAME,
        () => enact(context)
    )

    context.subscriptions.push(disposable)
}
