import vscode from 'vscode'
import fs from 'fs'
import path from 'path'

const tempFilePath = 'c:\\Users\\Matt\\Desktop'

/**
 *
 * @param {string} filename
 * @param {string} text
 * @returns {boolean} true if succesful
 */
export const writeToFile = (filename, text) => {
    const filepath = path.join(vscode.workspace.rootPath || tempFilePath, filename)
    console.log('[util::fsutil] creating file: ', filepath)

    try {
        fs.writeFileSync(filepath, text, 'utf-8')
        return true
    } catch (e) {
        console.error(`Failed to write file ${filepath}:`, e)
        return false
    }
}

/**
 *
 * @param {string} filename
 * @returns {string}
 */
export const readRulesetFileText = filename => {
    const filepath = path.join(vscode.workspace.rootPath || tempFilePath, filename)
    console.info('[util::fsutil] reading text from file:', filepath)

    try {
        return fs.readFileSync(filepath, 'utf-8')
    } catch (e) {
        console.log(`[util::fsutil::FAILED] failed to read file ${filepath}:`, e)
        return undefined
    }
}

/**
 *
 * @param {string} filename
 */
export const openFileInVSCode = filename => {
    const filepath = path.join(vscode.workspace.rootPath || tempFilePath, filename)
    const openPath = vscode.Uri.file(filepath)
    console.log('[util::fsutil] opening file:', openPath.path)

    vscode.workspace.openTextDocument(openPath)
        .then(vscode.window.showTextDocument)
}
