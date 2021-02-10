#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

class i18n{
    constructor(options){
        this.locales = options.locales;
        this.directory = options.directory;
        this.defaultLocale = options.defaultLocale;
        this.defaultTranslation = this.getDefaultTranslation();
    }

    getDefaultTranslation(){
        try
        {
            const filepath = path.resolve(this.directory, this.locales[this.defaultLocale].file);
            const jsonObj = fs.readFileSync(filepath);

            return JSON.parse(jsonObj);
        }
        catch(error)
        {
            console.error(error);
        }
    }

    $t(){
        try
        {
            const args = arguments;
            const numberOfArgs = args.length;
            if(numberOfArgs == 0)
            {
                return this.defaultTranslation;
            }
            else if(numberOfArgs == 1)
            {
                return eval('this.defaultTranslation.' + arguments[0]);
            }
            else if(numberOfArgs == 2)
            {
                const filepath = path.resolve(this.directory, this.locales[arguments[1]].file);
                const jsonObj = fs.readFileSync(filepath);
                const translation = JSON.parse(jsonObj);
                return eval('translation.' + arguments[0]);
            }
            else
            {
                throw "\nsimple-i18n Error: $t() cannot take more than 2 arguments.\n";
            }
        }
        catch(error)
        {
            console.error(error);
        }
    }

    updateDefaultLocale(requestedLocale)
    {
        try
        {
            if(this.locales[requestedLocale])
            {
                this.defaultLocale = requestedLocale;
                this.defaultTranslation = this.getDefaultTranslation();
            }
            else
            {
                throw "\nsimple-i18n Error: Locale does not exist.\n";
            }
        }
        catch(error)
        {
            console.error(error);
        }
    }
}

module.exports = i18n;