"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.openFileInVSCode = exports.readRulesetFileText = exports.writeToFile = void 0;

var _vscode = _interopRequireDefault(require("vscode"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tempFilePath = "c:\\Users\\Matt\\Desktop";
/**
 *
 * @param {string} filename
 * @param {string} text
 * @returns {boolean} true if succesful
 */

var writeToFile = function writeToFile(filename, text) {
  var filepath = _path.default.join(_vscode.default.workspace.rootPath || tempFilePath, filename);

  console.log('[util::fsutil] creating file: ', filepath);

  try {
    _fs.default.writeFileSync(filepath, text, 'utf-8');

    return true;
  } catch (e) {
    console.error("Failed to write file ".concat(filepath, ":"), e);
    return false;
  }
};
/**
 *
 * @param {string} filename
 * @returns {string}
 */


exports.writeToFile = writeToFile;

var readRulesetFileText = function readRulesetFileText(filename) {
  var filepath = _path.default.join(_vscode.default.workspace.rootPath || tempFilePath, filename);

  console.info('[util::fsutil] reading text from file:', filepath);

  try {
    return _fs.default.readFileSync(filepath, 'utf-8');
  } catch (e) {
    console.log("[util::fsutil::FAILED] failed to read file ".concat(filepath, ":"), e);
    return undefined;
  }
};
/**
 *
 * @param {string} filename
 */


exports.readRulesetFileText = readRulesetFileText;

var openFileInVSCode = function openFileInVSCode(filename) {
  var filepath = _path.default.join(_vscode.default.workspace.rootPath || tempFilePath, filename);

  var openPath = _vscode.default.Uri.file(filepath);

  console.log('[util::fsutil] opening file:', openPath.path);

  _vscode.default.workspace.openTextDocument(openPath).then(_vscode.default.window.showTextDocument);
};

exports.openFileInVSCode = openFileInVSCode;