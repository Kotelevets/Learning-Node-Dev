console.log('Starting app.js...');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const argv = yargs.argv;
let command = argv._[0];
console.log('Command: ', command);
console.log('Yargs: ', argv);

if (command === 'add') {
	let note = notes.addNote(argv.title, argv.body);
	if (note) {
		console.log(`Adding new note title: "${note.title}", body: "${note.body}"`);
	} else {
		console.log(`New note title "${argv.title}" duplicates the existing one`);
    console.log('You can use the remove parameter to delete the existing note');
	}
} else if (command === 'list') {
	notes.getAll();
} else if (command === 'read') {
	notes.getNote(argv.title);
} else if (command === 'remove') {
	notes.removeNote(argv.title);
} else {
	console.log(`Command "${command}" not recognized`);
}
