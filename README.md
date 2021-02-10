# ✨ OP i18n (op-i18n) ✨
Easy Node.js i18n with json locale file storage. No fancy grammar.

## ▶️ install
```
npm i op-i18n
```

## 👩‍🎓 Tutorial
### Most of Case
- en-US.json
```
{
    "name": "Victor"
}
```
- ko-KR.json
```
{
    "name": "빅터"
}
```
- index.js
```
const I18n = require('op-i18n');

// Note that '_' is used instead of '-' for key in options below.
// eg. ko-KR:{} (X), ko_KR:{} (O)
const options =
{
  locales:
  {
      ko_KR:
      {
        name: '한국어',
        iso: 'ko-KR',
        file: 'ko_KR.json'
      },
      en_US:
      {
        name: 'English',
        iso: 'en-US',
        file: 'en_US.json'
      }
  },
  directory: path.resolve(__dirname, 'locales/'),
  defaultLocale: 'en_US',
}

const i18n = new I18n(options);

// Change locale to Korean
i18n.updateDefaultLocale("ko_KR");
console.log(i18n.$t());
// output: { name: 'Victor' }
console.log(i18n.$t("name"));
// output: Victor
console.log(i18n.$t("name", "en_US"));
// output: 빅터
```

### Options
Requires locales, directory, defaultLocale in options. Note that _ is used instead of - for key in options.
js key | O/X 
-------|-----
ko_KR  | O 😇
ko-KR  | X ☠️
```
const I18n = require('op-i18n');

// Note that '_' is used instead of '-' for key in options below.
// eg. ko-KR:{} (X), ko_KR:{} (O)
const options =
{
  locales:
  {
      ko_KR:
      {
        name: '한국어',
        iso: 'ko-KR',
        file: 'ko_KR.json'
      },
      en_US:
      {
        name: 'English',
        iso: 'en-US',
        file: 'en_US.json'
      }
  },
  directory: path.resolve(__dirname, 'locales/'),
  defaultLocale: 'en_US',
}

const i18n = new I18n(options);
```

### Advanced $t()
You can use . notation just like how you get value out of js object:
- ko-KR.json
```
{
    "name":
    {
        "first": "빅터"
        "last": "박"
    }
}
```
- en-US.json
```
{
    "name":
    {
        "first": "Victor"
        "last": "Park"
    }
}
```
- index.js
```
console.log(i18n.$t("name.first"));
//output: Victor
```
For getting value from specified locale:
```
console.log(i18n.$t("name.first", "ko_KR"));
//output: 빅터
```

## 📖 op-i18n Document
### .$t()
```
return default translation in js object. Uses .getDefaultTranslation()
```
### .$t(string:key)
```
return value according to key from default translation in js object
```
### .$t(string:key, string:locale key)
```
return value according to key from translation of specified locale in js object
```
### .updateDefaultLocale(string:locale key)
```
update default locale and default translation according to specified locale
```
### .getDefaultTranslation()
```
return default translation in js object
```

## 👯 Support this project
| Patreon | Paypal | Paypal QR Code |
|---------| ------ | -------------- |
| [![Patreon](./mdimg/patreon.png)](https://www.patreon.com/treezi) | [![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate?hosted_button_id=CL2DUUDFDW4GJ) | [![QR Code](./mdimg/paypal-donation-qr-code.png)](https://www.paypal.com/donate?hosted_button_id=CL2DUUDFDW4GJ) |

## 👨‍💻 Author
[Victor Chanil Park](https://github.com/opdev1004)

## 💯 License
MIT, See [LICENSE](./LICENSE).
