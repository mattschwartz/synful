"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.activate = activate;
exports.deactivate = deactivate;

var vscode = _interopRequireWildcard(require("vscode"));

var addRule = _interopRequireWildcard(require("./commands/addRule"));

var reloadRuleset = _interopRequireWildcard(require("./commands/reloadRuleset"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/**
 *
 * @param {vscode.ExtensionContext} context
 */
var registerCommands = function registerCommands(context) {
  addRule.register(context);
  reloadRuleset.register(context);
};
/**
 * Run when synful is first invoked by the user
 * @param {vscode.ExtensionContext} context
 */


function activate(context) {
  console.log('[main] loading synful');
  console.log('[main] registering commands');
  registerCommands(context);
  console.log('[main] all commands registered');
  console.log('[main] loading complete');
} // this method is called when your extension is deactivated


function deactivate() {}