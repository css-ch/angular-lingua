#!/usr/bin/env  node

import program from 'commander';
import opn from 'opn';

import server from './server';
import {ApplicationOption} from './types/application-option';

program
	.command('translation-gui <locales-dir>', '<locales-dir> is the directory with the translations and the local-entry')
	.option('-d, --doubleQuote', 'Use double quotes')
	.version('0.0.1')
	.parse(process.argv);

const applicationOption: ApplicationOption = {
	IS_PRODUCTION: process.env.GLOBALIZER_ENV === 'PRODUCTION',
	LANGUAGES_FILE_NAME: 'locales-entry.type.ts',
	LOCALES_DIR: program.args[0],
	TRANSLATION_FILE_NAME: 'locales.ts',
	USE_DOUBLE_QUOTES: program.doubleQuote === true,
};

server(applicationOption, (url) => {
	opn(url);
});
