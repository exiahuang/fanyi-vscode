import * as vscode from 'vscode';

const fanyi = require('./fanyi');

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand('dictionary.fanyi', () => {
		console.log(selectedText());
		showMsg(selectedText());
		fanyi(selectedText(), { log: showMsg });
	}));
}

// this method is called when your extension is deactivated
export function deactivate() {}

const channel = vscode.window.createOutputChannel('dictionary');
function showMsg(msg: any, indentNum?: number){
	indentNum = indentNum || 1;
	let indent = '';
	for (let i = 1; i < indentNum; i += 1) {
	  indent += '  ';
	}
	channel.appendLine(indent + (msg || '').toString());
	channel.show();
}

function selectedText(): string {
	var editor = vscode.window.activeTextEditor;
	if (!editor) {
		return "";
	}
	var selection = editor.selection;
	var text = editor.document.getText(selection);
	return text;
}