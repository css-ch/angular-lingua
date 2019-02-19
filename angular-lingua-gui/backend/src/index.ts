#!/usr/bin/env  node
import program from 'commander';
import opn from 'opn';
import path from 'path';

import server from './server';
import {ApplicationOption} from './types/application-option';


program
	.command('translation-gui <locales> [languages...]', '<locales> The file with the translations. <languages...> the languages to show')
	.option('-d, --doubleQuote [useDoubleQuotes]', 'Use double quotes', false)
	.option('-b, --browser [open]', 'if it should open browser', true)
	.version('0.0.1')
	.parse(process.argv);

const LOCALES_FILE_PATH = path.normalize(program.args[0]);
const [, ...LANGUAGES] = program.args;
const USE_DOUBLE_QUOTES = program.doubleQuote === true;
const OPEN_BROWSER = program.browser === true;

if (LANGUAGES.length === 0) {
	console.error('you need to have at least 1 language defined');
	process.exit(1);
}

const applicationOption: ApplicationOption = {
	IS_PRODUCTION: process.env.GLOBALIZER_ENV === 'PRODUCTION',
	USE_DOUBLE_QUOTES,
	LOCALES_FILE_PATH,
	LANGUAGES,
};

server(applicationOption, (url) => {
	if (OPEN_BROWSER) {
		opn(url);
	}
});
