"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = void 0;

var vscode = _interopRequireWildcard(require("vscode"));

var fsutil = _interopRequireWildcard(require("../util/fsutil"));

var rulesetUtil = _interopRequireWildcard(require("../util/rulesetUtil"));

var _commandNames = require("../commandNames");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var CURRENT_WORKING_RULESET = 'synful/current_working_ruleset';
var ALL_WORKING_RULESETS = 'synful/all_working_rulesets';
/**
 * Opens the config file for the ruleset so that the user can quickly get to
 * editing the rule
 */

var openConfigToEdit = function openConfigToEdit(filename) {
  console.log('[cmd::addRule] opening config file to edit rule');
  fsutil.openFileInVSCode(filename); // todo should we call this on config file save?
  // vscode.commands.executeCommand(RELOAD_RULESET_COMMAND_NAME)
};
/**
 * Adds the new rule to the config file for the ruleset
 * @param {string} rulesetName
 * @param {string} ruleName
 */


var addRuleToConfig = function addRuleToConfig(rulesetName, ruleName) {
  console.log("[cmd::addRule] adding rule '".concat(ruleName, "' to ruleset '").concat(rulesetName, "' config"));
  rulesetUtil.addRuleToRuleset(rulesetName, ruleName);
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

    var progressOptions = {
      location: vscode.ProgressLocation.Notification,
      title: 'Creating ruleset...'
    };

    var task = function task() {
      return new Promise(function (resolve) {
        addRuleToConfig(rulesetName, ruleName);
        openConfigToEdit(rulesetName + '.js');
        resolve();
      });
    };

    vscode.window.withProgress(progressOptions, task);
  });
};
/**
 * Performs the addRule command
 * @param {vscode.ExtensionContext} context
 */


var enact = function enact(context) {
  var activeFilepath = vscode.window.activeTextEditor && vscode.window.activeTextEditor.document.fileName;

  if (!activeFilepath) {
    console.error('[cmd::addRule::FAILED] no file open - cannot apply rules!');
    vscode.window.showErrorMessage('[synful::FAILED] No active file open: cannot apply rules.');
    return;
  }

  console.log('[cmd::addRule] called on current file:', activeFilepath);
  var workingRuleset = false; // context.workspaceState.get(CURRENT_WORKING_RULESET)
  // If no currently selected ruleset, ask user what ruleset should be named

  if (!workingRuleset) {
    console.log('[cmd::addRule] no ruleset found');
    showSetRulesetNameInputBox().then(function (value) {
      console.log('[cmd::addRule] creating file with name:', value);
      rulesetUtil.saveNewRuleset(value, activeFilepath);
      return value;
    }).then(function (value) {
      if (!value) {
        console.log('[cmd::addRule] user cancelled');
      } else {
        showSetRuleNameInputBox(value);
      }
    }).catch(function (reason) {
      console.error('[cmd::addRule::FAILED] received an error:', reason);
    });
  } else {
    console.log('[cmd::addRule] found ruleset:', workingRuleset);
    showSetRuleNameInputBox(workingRuleset);
  }
};
/**
 * @param {vscode.ExtensionContext} context
 */


var register = function register(context) {
  var disposable = vscode.commands.registerCommand(_commandNames.ADD_RULE_COMMAND_NAME, function () {
    return enact(context);
  });
  context.subscriptions.push(disposable);
};

exports.register = register;