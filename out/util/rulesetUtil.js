"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addRuleToRuleset = exports.saveNewRuleset = void 0;

var fsutil = _interopRequireWildcard(require("./fsutil"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var createRuleFromName = function createRuleFromName(ruleName) {
  return {
    regex: '//',
    highlight: {
      ruleName: ruleName,
      fontWeight: 'bold',
      fontSize: '1rem',
      color: 'yellow',
      transpose: null
    }
  };
};
/**
 *
 * @param {string} rulesetName the name of the ruleset
 * @param {object} ruleset the ruleset as an object
 */


var saveRuleset = function saveRuleset(rulesetName, ruleset) {
  var text = JSON.stringify(ruleset, null, 4) + '\r\n';
  fsutil.writeToFile(rulesetName + '.js', text);
};

var saveNewRuleset = function saveNewRuleset(rulesetName, activeFilepath) {
  var ruleset = {
    __type: 'synful_ruleset',
    appliesTo: [activeFilepath],
    rules: []
  };
  saveRuleset(rulesetName, ruleset);
};

exports.saveNewRuleset = saveNewRuleset;

var addRuleToRuleset = function addRuleToRuleset(rulesetName, ruleName) {
  var rulesetText = fsutil.readRulesetFileText(rulesetName + '.js');
  var ruleset = JSON.parse(rulesetText);
  ruleset.rules.push(createRuleFromName(ruleName));
  saveRuleset(rulesetName, ruleset);
};

exports.addRuleToRuleset = addRuleToRuleset;