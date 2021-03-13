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
            const arg0 = arguments[0];
            
            if(arg0 === undefined) // when argument is empty
            {
                return this.defaultTranslation;
            }
            else if(typeof arg0  === 'string') // When string is given as a key
            {
                const [key , locale] = arguments;

                if(locale === undefined)
                {
                    if(key === "") return this.defaultTranslation;
                    else
                    {
                        return eval('this.defaultTranslation.' + key);
                    }
                }
                else if(typeof locale === 'string')
                {
                    const filepath = path.resolve(this.directory, this.locales[locale].file);
                    const jsonObj = fs.readFileSync(filepath);
                    const translation = JSON.parse(jsonObj);
                    
                    if(key === "") return translation;
                    else return eval('translation.' + key);
                }
            }
            else if(typeof arg0.key === 'string' || typeof arg0.locale === 'string') // when object is given as a key and locale
            {
                const { key, locale } = arg0;

                if(key !== undefined)
                {
                    if(locale !== undefined)
                    {
                        const filepath = path.resolve(this.directory, this.locales[locale].file);
                        const jsonObj = fs.readFileSync(filepath);
                        const translation = JSON.parse(jsonObj);

                        if(key === "") return translation;
                        else return eval(`translation.${key}`);
                    }
                    else
                    {
                        if(key === "") return this.defaultTranslation;
                        else return eval(`this.defaultTranslation.${key}`);
                    }

                }
                else if(locale !== undefined)
                {
                    const filepath = path.resolve(this.directory, this.locales[locale].file);
                    const jsonObj = fs.readFileSync(filepath);
                    const translation = JSON.parse(jsonObj);
                    
                    return translation;
                }
            }
            else
            {
                throw "\nsimple-i18n Error: Wrong arguments or unknown error. Please make sure following the instructions (Tutorial) from https://github.com/opdev1004/op-i18n.\n";
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