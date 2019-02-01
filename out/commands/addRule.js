"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = void 0;

var vscode = _interopRequireWildcard(require("vscode"));

var _commandNames = require("../commandNames");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/**
 * Opens the config file for the ruleset so that the user can quickly get to
 * editing the rule
 */
var openConfigToEdit = function openConfigToEdit() {
  console.log('[cmd::addRule] opening config file to edit rule');
  vscode.commands.executeCommand(_commandNames.RELOAD_RULESET_COMMAND_NAME);
};
/**
 * Adds the new rule to the config file for the ruleset
 * @param {string} rulesetName
 * @param {string} ruleName
 */


var addRuleToConfig = function addRuleToConfig(rulesetName, ruleName) {
  console.log("[cmd::addRule] adding rule '".concat(ruleName, "' to ruleset '").concat(rulesetName, "' config"));
};
/**
 * Asks the user what the new ruleset should be called
 * @returns {Thenable<string>}
 */


var showSetRulesetNameInputBox = function showSetRulesetNameInputBox() {
  return vscode.window.showInputBox({
    prompt: "Enter Ruleset Name",
    placeHolder: "Ruleset Name..."
  });
};
/**
 * Asks the user what the new rule should be called
 * @param {string} rulesetName
 */


var showSetRuleNameInputBox = function showSetRuleNameInputBox(rulesetName) {
  vscode.window.showInputBox({
    prompt: "Enter Rule Name for ruleset ".concat(rulesetName),
    placeHolder: "rule name"
  }).then(function (ruleName) {
    if (!ruleName) {
      console.log('[cmd::addRule] user cancelled');
      return;
    }

    addRuleToConfig(rulesetName, ruleName);
    openConfigToEdit();
  });
};
/**
 * Gets the current working ruleset name and returns it
 * @returns {string} the name of the current working ruleset, or undefined if not exists
 */


var getWorkingRulesetName = function getWorkingRulesetName() {
  return undefined;
};
/**
 * Performs the addRule command
 */


var enact = function enact() {
  console.log('[cmd::addRule] called'); // If no currently selected ruleset, ask user what ruleset should be named

  var rulesetName = getWorkingRulesetName();

  if (!rulesetName) {
    console.log('[cmd::addRule] no ruleset found');
    showSetRulesetNameInputBox().then(function (value) {
      if (!value) {
        console.log('[cmd::addRule] user cancelled');
      } else {
        showSetRuleNameInputBox(value);
      }
    });
  } else {
    console.log('[cmd::addRule] found ruleset:', rulesetName);
    showSetRuleNameInputBox(rulesetName);
  }
};
/**
 * @param {vscode.ExtensionContext} context
 */


var register = function register(context) {
  var disposable = vscode.commands.registerCommand(_commandNames.ADD_RULE_COMMAND_NAME, enact);
  context.subscriptions.push(disposable);
};

exports.register = register;