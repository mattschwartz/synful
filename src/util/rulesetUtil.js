import * as fsutil from './fsutil'

const createRuleFromName = ruleName => ({
    regex: '//',
    highlight: {
        ruleName,
        fontWeight: 'bold',
        fontSize: '1rem',
        color: 'yellow',
        transpose: null
    }
})

/**
 *
 * @param {string} rulesetName the name of the ruleset
 * @param {object} ruleset the ruleset as an object
 */
const saveRuleset = (rulesetName, ruleset) => {
    const text = JSON.stringify(ruleset, null, 4) + '\r\n'
    fsutil.writeToFile(rulesetName + '.js', text)
}

export const saveNewRuleset = (rulesetName, activeFilepath) => {
    const ruleset = {
        __type: 'synful_ruleset',
        appliesTo: [
            activeFilepath
        ],
        rules: []
    }
    saveRuleset(rulesetName, ruleset)
}

export const addRuleToRuleset = (rulesetName, ruleName) => {
    const rulesetText = fsutil.readRulesetFileText(rulesetName + '.js')
    const ruleset = JSON.parse(rulesetText)

    ruleset.rules.push(createRuleFromName(ruleName))
    saveRuleset(rulesetName, ruleset)
}


