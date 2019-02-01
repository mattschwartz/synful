# synful README

## Motivation
The motivation behind synful was constant parsing of logs during debugging sessions. Log formats can vary wildly between applications so having a single
syntax highlighting ruleset doesn't always help very much. synful provides a means of arbitrarily applying highlighting rules in real time to help in
visually parsing any text.

## Features

Fundamentally, synful is a syntax highlighter that allows you to apply arbitrary highlighting to text using various matching rules using regular expressions. The motivation behind
this is to provide an easier way to process text visually by highlighting important text or by dimming or even removing bits that are just in the way.

You can even save the configurations for later use!

synful commands:
1. Add synful Rule
    - Specify a regular expression to match and style to apply to those matches.
    - (Optional) specify a name and description to the rule. This may help you identify which rules do what later
2. Remove synful Rule
    - Removes a rule from the synful ruleset
3. Clear synful Rules
    - Remove all rules from the synful ruleset
4. Save synful Ruleset
    - Persists the current synful ruleset for reuse
5. Load synful Ruleset
    - Load a previously saved synful ruleset to be applied to the current file

-----------------------------------------------------------------------------------------------------------

## Working with Markdown

**Note:** You can author your README using Visual Studio Code.  Here are some useful editor keyboard shortcuts:

* Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux)
* Toggle preview (`Shift+CMD+V` on macOS or `Shift+Ctrl+V` on Windows and Linux)
* Press `Ctrl+Space` (Windows, Linux) or `Cmd+Space` (macOS) to see a list of Markdown snippets

### For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
