"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = void 0;

var vscode = _interopRequireWildcard(require("vscode"));

var _commandNames = require("../commandNames");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/**
 * Reloads the current working ruleset and applies the rules to the current file
 */
var enact = function enact() {
  console.log('[cmd::reloadRuleset] called');
};
/**
 *
 * @param {vscode.ExtensionContext} context
 */


var register = function register(context) {
  var disposable = vscode.commands.registerCommand(_commandNames.RELOAD_RULESET_COMMAND_NAME, enact);
  context.subscriptions.push(disposable);
};

exports.register = register;