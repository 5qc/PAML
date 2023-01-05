const generateVariables = () => {
    const variables = {};
    const variablesEl = document.querySelectorAll("set");
    for (let i = 0; i < variablesEl.length; i++) {
        const variable = variablesEl[i];
        const variableName = variable.getAttribute("name");
        const variableContent = variable.innerHTML;
        for (let i = 0; i < bannedChars.length; i++) {
            if (variableName.includes(bannedChars[i]))
                return pamlErr(`Variable name ${variableName} uses banned character (${bannedChars[i]}).`);
        }
        variables[variableName] = variableContent;
        variable.remove();
        const variableRegex = RegExp(`(?<!<if exists="){{${variableName}}}`, "g");
        document.body.innerHTML = document.body.innerHTML.replace(variableRegex, variableContent);
    }
};
const bannedChars = ["{", "}", "."];
const pamlErr = (text, type = "error") => {
    let prefix = "[PAML]";
    if (type === "error" || type === "err")
        console.error(`${prefix} ${text}`);
    else if (type === "warn" || type === "warning")
        console.warn(`${prefix} ${text}`);
    else
        pamlErr(`Type "${type}" was not found.`);
};
const iso639_1 = {
    "aa": "Afar",
    "ab": "Abkhazian",
    "ae": "Avestan",
    "af": "Afrikaans",
    "ak": "Akan",
    "am": "Amharic",
    "an": "Aragonese",
    "ar": "Arabic",
    "as": "Assamese",
    "av": "Avaric",
    "ay": "Aymara",
    "az": "Azerbaijani",
    "ba": "Bashkir",
    "be": "Belarusian",
    "bg": "Bulgarian",
    "bh": "Bihari languages",
    "bi": "Bislama",
    "bm": "Bambara",
    "bn": "Bengali",
    "bo": "Tibetan",
    "br": "Breton",
    "bs": "Bosnian",
    "ca": "Catalan",
    "ce": "Chechen",
    "ch": "Chamorro",
    "co": "Corsican",
    "cr": "Cree",
    "cs": "Czech",
    "cu": "Church Slavic",
    "cv": "Chuvash",
    "cy": "Welsh",
    "da": "Danish",
    "de": "German",
    "dv": "Maldivian",
    "dz": "Dzongkha",
    "ee": "Ewe",
    "el": "Greek",
    "en": "English",
    "eo": "Esperanto",
    "es": "Spanish",
    "et": "Estonian",
    "eu": "Basque",
    "fa": "Persian",
    "ff": "Fulah",
    "fi": "Finnish",
    "fj": "Fijian",
    "fo": "Faroese",
    "fr": "French",
    "fy": "West Frisian",
    "ga": "Irish",
    "gd": "Scottish Gaelic",
    "gl": "Galician",
    "gn": "Guarani",
    "gu": "Gujarati",
    "gv": "Manx",
    "ha": "Hausa",
    "he": "Hebrew",
    "hi": "Hindi",
    "ho": "Hiri Motu",
    "hr": "Croatian",
    "ht": "Haitian Creole",
    "hu": "Hungarian",
    "hy": "Armenian",
    "hz": "Herero",
    "ia": "Interlingua",
    "id": "Indonesian",
    "ie": "Interlingue",
    "ig": "Igbo",
    "ii": "Sichuan Yi",
    "ik": "Inupiaq",
    "io": "Ido",
    "is": "Icelandic",
    "it": "Italian",
    "iu": "Inuktitut",
    "ja": "Japanese",
    "jv": "Javanese",
    "ka": "Georgian",
    "kg": "Kongo",
    "ki": "Kikuyu",
    "kj": "Kwanyama",
    "kk": "Kazakh",
    "kl": "Greenlandic",
    "km": "Central Khmer",
    "kn": "Kannada",
    "ko": "Korean",
    "kr": "Kanuri",
    "ks": "Kashmiri",
    "ku": "Kurdish",
    "kv": "Komi",
    "kw": "Cornish",
    "ky": "Kyrgyz",
    "la": "Latin",
    "lb": "Luxembourgish",
    "lg": "Ganda",
    "li": "Limburgish",
    "ln": "Lingala",
    "lo": "Lao",
    "lt": "Lithuanian",
    "lu": "Luba-Katanga",
    "lv": "Latvian",
    "mg": "Malagasy",
    "mh": "Marshallese",
    "mi": "Maori",
    "mk": "Macedonian",
    "ml": "Malayalam",
    "mn": "Mongolian",
    "mr": "Marathi",
    "ms": "Malay",
    "mt": "Maltese",
    "my": "Burmese",
    "na": "Nauru",
    "nb": "Norwegian Bokmål",
    "nd": "North Ndebele",
    "ne": "Nepali",
    "ng": "Ndonga",
    "nl": "Dutch",
    "nn": "Norwegian Nynorsk",
    "no": "Norwegian",
    "nr": "South Ndebele",
    "nv": "Navajo",
    "ny": "Chichewa",
    "oc": "Occitan",
    "oj": "Ojibwa",
    "om": "Oromo",
    "or": "Oriya",
    "os": "Ossetian",
    "pa": "Punjabi",
    "pi": "Pali",
    "pl": "Polish",
    "ps": "Pashto",
    "pt": "Portuguese",
    "qu": "Quechua",
    "rm": "Romansh",
    "rn": "Rundi",
    "ro": "Romanian",
    "ru": "Russian",
    "rw": "Kinyarwanda",
    "sa": "Sanskrit",
    "sc": "Sardinian",
    "sd": "Sindhi",
    "se": "Northern Sami",
    "sg": "Sango",
    "si": "Sinhala",
    "sk": "Slovak",
    "sl": "Slovenian",
    "sm": "Samoan",
    "sn": "Shona",
    "so": "Somali",
    "sq": "Albanian",
    "sr": "Serbian",
    "ss": "Swati",
    "st": "Southern Sotho",
    "su": "Sundanese",
    "sv": "Swedish",
    "sw": "Swahili",
    "ta": "Tamil",
    "te": "Telugu",
    "tg": "Tajik",
    "th": "Thai",
    "ti": "Tigrinya",
    "tk": "Turkmen",
    "tl": "Tagalog",
    "tn": "Tswana",
    "to": "Tongan",
    "tr": "Turkish",
    "ts": "Tsonga",
    "tt": "Tatar",
    "tw": "Twi",
    "ty": "Tahitian",
    "ug": "Uyghur",
    "uk": "Ukrainian",
    "ur": "Urdu",
    "uz": "Uzbek",
    "ve": "Venda",
    "vi": "Vietnamese",
    "vo": "Volapük",
    "wa": "Walloon",
    "wo": "Wolof",
    "xh": "Xhosa",
    "yi": "Yiddish",
    "yo": "Yoruba",
    "za": "Zhuang",
    "zh": "Chinese",
    "zu": "Zulu"
};
const iso639_2 = {
    "aar": "Afar",
    "abk": "Abkhazian",
    "ace": "Achinese",
    "ach": "Acoli",
    "ada": "Adangme",
    "ady": "Adyghe",
    "afh": "Afrihili",
    "afr": "Afrikaans",
    "ain": "Ainu",
    "aka": "Akan",
    "akk": "Akkadian",
    "ale": "Aleut",
    "alt": "Southern Altai",
    "amh": "Amharic",
    "ang": "Old English",
    "anp": "Angika",
    "ara": "Arabic",
    "arc": "Imperial Aramaic",
    "arg": "Aragonese",
    "arn": "Mapuche",
    "arp": "Arapaho",
    "arw": "Arawak",
    "asm": "Assamese",
    "ast": "Asturian",
    "ava": "Avaric",
    "ave": "Avestan",
    "awa": "Awadhi",
    "aym": "Aymara",
    "aze": "Azerbaijani",
    "bak": "Bashkir",
    "bal": "Baluchi",
    "bam": "Bambara",
    "ban": "Balinese",
    "bas": "Basa",
    "bej": "Beja",
    "bel": "Belarusian",
    "bem": "Bemba",
    "ben": "Bengali",
    "bho": "Bhojpuri",
    "bik": "Bikol",
    "bin": "Edo",
    "bis": "Bislama",
    "bla": "Siksika",
    "bod": "Tibetan",
    "bos": "Bosnian",
    "bra": "Braj",
    "bre": "Breton",
    "bua": "Buriat",
    "bug": "Buginese",
    "bul": "Bulgarian",
    "byn": "Bilen",
    "cad": "Caddo",
    "car": "Galibi Carib",
    "cat": "Catalan",
    "ceb": "Cebuano",
    "ces": "Czech",
    "cha": "Chamorro",
    "chb": "Chibcha",
    "che": "Chechen",
    "chg": "Chagatai",
    "chk": "Chuukese",
    "chm": "Mari",
    "chn": "Chinook Jargon",
    "cho": "Choctaw",
    "chp": "Chipewyan",
    "chr": "Cherokee",
    "chu": "Church Slavic",
    "chv": "Chuvash",
    "chy": "Cheyenne",
    "cnr": "Montenegrin",
    "cop": "Coptic",
    "cor": "Cornish",
    "cos": "Corsican",
    "cre": "Cree",
    "crh": "Crimean Tatar",
    "csb": "Kashubian",
    "cym": "Welsh",
    "dak": "Dakota",
    "dan": "Danish",
    "dar": "Dargwa",
    "del": "Delaware",
    "den": "Slave (Athapascan)",
    "deu": "German",
    "dgr": "Dogrib",
    "din": "Dinka",
    "div": "Maldivian",
    "doi": "Dogri",
    "dsb": "Lower Sorbian",
    "dua": "Duala",
    "dum": "Middle Dutch",
    "dyu": "Dyula",
    "dzo": "Dzongkha",
    "efi": "Efik",
    "egy": "Egyptian (Ancient)",
    "eka": "Ekajuk",
    "ell": "Greek",
    "elx": "Elamite",
    "eng": "English",
    "enm": "Middle English",
    "epo": "Esperanto",
    "est": "Estonian",
    "eus": "Basque",
    "ewe": "Ewe",
    "ewo": "Ewondo",
    "fan": "Fang",
    "fao": "Faroese",
    "fas": "Persian",
    "fat": "Fanti",
    "fij": "Fijian",
    "fil": "Filipino",
    "fin": "Finnish",
    "fon": "Fon",
    "fra": "French",
    "frm": "Middle French",
    "fro": "Old French",
    "frr": "Northern Frisian",
    "frs": "Eastern Frisian",
    "fry": "Western Frisian",
    "ful": "Fulah",
    "fur": "Friulian",
    "gaa": "Ga",
    "gay": "Gayo",
    "gba": "Gbaya",
    "gez": "Geez",
    "gil": "Gilbertese",
    "gla": "Scottish Gaelic",
    "gle": "Irish",
    "glg": "Galician",
    "glv": "Manx",
    "gmh": "Middle High German",
    "goh": "Old High German",
    "gon": "Gondi",
    "gor": "Gorontalo",
    "got": "Gothic",
    "grb": "Grebo",
    "grc": "Ancient Greek",
    "grn": "Guarani",
    "gsw": "Swiss German",
    "guj": "Gujarati",
    "gwi": "Gwich'in",
    "hai": "Haida",
    "hat": "Haitian Creole",
    "hau": "Hausa",
    "haw": "Hawaiian",
    "heb": "Hebrew",
    "her": "Herero",
    "hil": "Hiligaynon",
    "hin": "Hindi",
    "hit": "Hittite",
    "hmn": "Hmong",
    "hmo": "Hiri Motu",
    "hrv": "Croatian",
    "hsb": "Upper Sorbian",
    "hun": "Hungarian",
    "hup": "Hupa",
    "hye": "Armenian",
    "iba": "Iban",
    "ibo": "Igbo",
    "ido": "Ido",
    "iii": "Sichuan Yi",
    "iku": "Inuktitut",
    "ile": "Interlingue",
    "ilo": "Iloko",
    "ina": "Interlingua",
    "ind": "Indonesian",
    "inh": "Ingush",
    "ipk": "Inupiaq",
    "isl": "Icelandic",
    "ita": "Italian",
    "jav": "Javanese",
    "jbo": "Lojban",
    "jpn": "Japanese",
    "jpr": "Judeo-Persian",
    "jrb": "Judeo-Arabic",
    "kaa": "Kara-Kalpak",
    "kab": "Kabyle",
    "kac": "Jingpho",
    "kal": "Greenlandic",
    "kam": "Kamba",
    "kan": "Kannada",
    "kas": "Kashmiri",
    "kat": "Georgian",
    "kau": "Kanuri",
    "kaw": "Kawi",
    "kaz": "Kazakh",
    "kbd": "Kabardian",
    "kha": "Khasi",
    "khm": "Central Khmer",
    "kho": "Saka",
    "kik": "Kikuyu",
    "kin": "Kinyarwanda",
    "kir": "Kyrgyz",
    "kmb": "Kimbundu",
    "kok": "Konkani",
    "kom": "Komi",
    "kon": "Kongo",
    "kor": "Korean",
    "kos": "Kosraean",
    "kpe": "Kpelle",
    "krc": "Karachay-Balkar",
    "krl": "Karelian",
    "kru": "Kurukh",
    "kua": "Kwanyama",
    "kum": "Kumyk",
    "kur": "Kurdish",
    "kut": "Kutenai",
    "lad": "Ladino",
    "lah": "Lahnda",
    "lam": "Lamba",
    "lao": "Lao",
    "lat": "Latin",
    "lav": "Latvian",
    "lez": "Lezghian",
    "lim": "Limburgish",
    "lin": "Lingala",
    "lit": "Lithuanian",
    "lol": "Mongo",
    "loz": "Lozi",
    "ltz": "Luxembourgish",
    "lua": "Luba-Lulua",
    "lub": "Luba-Katanga",
    "lug": "Ganda",
    "lui": "Luiseno",
    "lun": "Lunda",
    "luo": "Luo",
    "lus": "Lushai",
    "mad": "Madurese",
    "mag": "Magahi",
    "mah": "Marshallese",
    "mai": "Maithili",
    "mak": "Makasar",
    "mal": "Malayalam",
    "man": "Mandingo",
    "mar": "Marathi",
    "mas": "Masai",
    "mdf": "Moksha",
    "mdr": "Mandar",
    "men": "Mende",
    "mga": "Middle Irish",
    "mic": "Mi'kmaq",
    "min": "Minangkabau",
    "mkd": "Macedonian",
    "mlg": "Malagasy",
    "mlt": "Maltese",
    "mnc": "Manchu",
    "mni": "Manipuri",
    "moh": "Mohawk",
    "mon": "Mongolian",
    "mos": "Mossi",
    "mri": "Maori",
    "msa": "Malay",
    "mus": "Creek",
    "mwl": "Mirandese",
    "mwr": "Marwari",
    "mya": "Burmese",
    "myv": "Erzya",
    "nap": "Neapolitan",
    "nau": "Nauru",
    "nav": "Navajo",
    "nbl": "South Ndebele",
    "nde": "North Ndebele",
    "ndo": "Ndonga",
    "nds": "Low German",
    "nep": "Nepali",
    "new": "Newari",
    "nia": "Nias",
    "niu": "Niuean",
    "nld": "Dutch",
    "nno": "Norwegian Nynorsk",
    "nob": "Norwegian Bokmål",
    "nog": "Nogai",
    "non": "Old Norse",
    "nor": "Norwegian",
    "nqo": "N'Ko",
    "nso": "Northern Sotho",
    "nwc": "Classical Newari",
    "nya": "Chichewa",
    "nym": "Nyamwezi",
    "nyn": "Nyankole",
    "nyo": "Nyoro",
    "nzi": "Nzima",
    "oci": "Occitan",
    "oji": "Ojibwa",
    "ori": "Oriya",
    "orm": "Oromo",
    "osa": "Osage",
    "oss": "Ossetian",
    "ota": "Ottoman Turkish",
    "pag": "Pangasinan",
    "pal": "Pahlavi",
    "pam": "Pampanga",
    "pan": "Punjabi",
    "pap": "Papiamento",
    "pau": "Palauan",
    "peo": "Old Persian",
    "phn": "Phoenician",
    "pli": "Pali",
    "pol": "Polish",
    "pon": "Pohnpeian",
    "por": "Portuguese",
    "pro": "Old Provençal",
    "pus": "Pashto",
    "que": "Quechua",
    "raj": "Rajasthani",
    "rap": "Rapanui",
    "rar": "Cook Islands Maori",
    "roh": "Romansh",
    "rom": "Romany",
    "ron": "Romanian",
    "run": "Rundi",
    "rup": "Aromanian",
    "rus": "Russian",
    "sad": "Sandawe",
    "sag": "Sango",
    "sah": "Yakut",
    "sam": "Samaritan Aramaic",
    "san": "Sanskrit",
    "sas": "Sasak",
    "sat": "Santali",
    "scn": "Sicilian",
    "sco": "Scots",
    "sel": "Selkup",
    "sga": "Old Irish",
    "shn": "Shan",
    "sid": "Sidamo",
    "sin": "Sinhala",
    "slk": "Slovak",
    "slv": "Slovenian",
    "sma": "Southern Sami",
    "sme": "Northern Sami",
    "smj": "Lule Sami",
    "smn": "Inari Sami",
    "smo": "Samoan",
    "sms": "Skolt Sami",
    "sna": "Shona",
    "snd": "Sindhi",
    "snk": "Soninke",
    "sog": "Sogdian",
    "som": "Somali",
    "sot": "Southern Sotho",
    "spa": "Spanish",
    "sqi": "Albanian",
    "srd": "Sardinian",
    "srn": "Sranan Tongo",
    "srp": "Serbian",
    "srr": "Serer",
    "ssw": "Swati",
    "suk": "Sukuma",
    "sun": "Sundanese",
    "sus": "Susu",
    "sux": "Sumerian",
    "swa": "Swahili",
    "swe": "Swedish",
    "syc": "Classical Syriac",
    "syr": "Syriac",
    "tah": "Tahitian",
    "tam": "Tamil",
    "tat": "Tatar",
    "tel": "Telugu",
    "tem": "Timne",
    "ter": "Tereno",
    "tet": "Tetum",
    "tgk": "Tajik",
    "tgl": "Tagalog",
    "tha": "Thai",
    "tig": "Tigre",
    "tir": "Tigrinya",
    "tiv": "Tiv",
    "tkl": "Tokelau",
    "tlh": "Klingon",
    "tli": "Tlingit",
    "tmh": "Tamashek",
    "tog": "Tonga (Nyasa)",
    "ton": "Tongan",
    "tpi": "Tok Pisin",
    "tsi": "Tsimshian",
    "tsn": "Tswana",
    "tso": "Tsonga",
    "tuk": "Turkmen",
    "tum": "Tumbuka",
    "tur": "Turkish",
    "tvl": "Tuvalu",
    "twi": "Twi",
    "tyv": "Tuvinian",
    "udm": "Udmurt",
    "uga": "Ugaritic",
    "uig": "Uyghur",
    "ukr": "Ukrainian",
    "umb": "Umbundu",
    "und": "Undetermined",
    "urd": "Urdu",
    "uzb": "Uzbek",
    "vai": "Vai",
    "ven": "Venda",
    "vie": "Vietnamese",
    "vol": "Volapük",
    "vot": "Votic",
    "wal": "Wolaitta",
    "war": "Waray",
    "was": "Washo",
    "wln": "Walloon",
    "wol": "Wolof",
    "xal": "Kalmyk",
    "xho": "Xhosa",
    "yao": "Yao",
    "yap": "Yapese",
    "yid": "Yiddish",
    "yor": "Yoruba",
    "zap": "Zapotec",
    "zbl": "Blissymbols",
    "zen": "Zenaga",
    "zgh": "Standard Moroccan Tamazight",
    "zha": "Zhuang",
    "zho": "Chinese",
    "zul": "Zulu",
    "zun": "Zuni",
    "zza": "Zaza"
};
const generateDate = () => {
    const getFormat = (format, d) => {
        const hasZero = (num) => {
            if (num < 10)
                return `0${num}`;
            else
                return num;
        };
        const monthArr1 = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const monthArr2 = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const dayArr1 = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const dayArr2 = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const month = d.getMonth() + 1;
        const day = d.getDate();
        const year = d.getFullYear();
        const dayOfWeek = d.getDay();
        const hour = d.getHours();
        const min = d.getMinutes();
        const seconds = d.getSeconds();
        const milliseconds = d.getMilliseconds();
        const timezone = d.getTimezoneOffset() == 0 ? d.getTimezoneOffset() : d.getTimezoneOffset() / 60 > 0 ? `-${d.getTimezoneOffset() / 60}` : `+${d.getTimezoneOffset() / 60}`;
        format = format.replace(/\byyyy\b/g, () => year);
        format = format.replace(/\byy\b/g, () => String(year).replace(/^../, ""));
        format = format.replace(/\bmmmm\b/g, () => monthArr2[month - 1]);
        format = format.replace(/\bmmm\b/g, () => monthArr1[month - 1]);
        format = format.replace(/\bmm\b/g, () => hasZero(month));
        format = format.replace(/\bm\b/g, () => month);
        format = format.replace(/\bdddd\b/g, () => dayArr2[dayOfWeek]);
        format = format.replace(/\bddd\b/g, () => dayArr1[dayOfWeek]);
        format = format.replace(/\bdd\b/g, () => hasZero(day));
        format = format.replace(/\bd\b/g, () => day);
        format = format.replace(/\bhour\b/g, () => hasZero(hour));
        format = format.replace(/\bmin\b/g, () => hasZero(min));
        format = format.replace(/\bsec\b/g, () => hasZero(seconds));
        format = format.replace(/\bms\b/g, () => hasZero(milliseconds));
        format = format.replace(/\btz\b/g, () => timezone);
        return format;
    };
    const dateTags = document.querySelectorAll("date");
    for (let i = 0; i < dateTags.length; i++) {
        const date = dateTags[i];
        const liveDate = date.getAttribute("live") !== null ? true : false;
        const format = date.getAttribute("format");
        const a = () => {
            if (format) {
                const d = new Date();
                return getFormat(format, d);
            }
            else {
                const d = new Date();
                return d;
            }
        };
        if (liveDate === true) {
            const b = () => {
                date.innerHTML = String(a());
                setTimeout(b, 10);
            };
            b();
        }
        else if (liveDate === false) {
            date.innerHTML = String(a());
        }
    }
};
const generateFors = () => {
    const forTags = document.querySelectorAll("for");
    for (let i = 0; i < forTags.length; i++) {
        const forTag = forTags[i];
        let forTagEach;
        if (forTag.getAttribute("each") !== null)
            forTagEach = forTag.getAttribute("each");
        else
            pamlErr("For tag is missing \"each\" attribute.");
        let forTagIn;
        if (forTag.getAttribute("in") !== null)
            forTagIn = forTag.getAttribute("in");
        else
            pamlErr("For tag is missing \"in\" attribute.");
        const forTagVarName = forTag.getAttribute("varName");
        const forContent = forTag.innerHTML;
        if (forTagVarName === "i")
            pamlErr("Variable name \"i\" is reserved.");
        let forTagInEl;
        if (forTagIn !== undefined)
            forTagInEl = document.querySelector(forTagIn);
        let forTagEachEl;
        if (forTagInEl !== undefined)
            forTagEachEl = forTagInEl.querySelectorAll(forTagEach);
        forTag.innerHTML = "";
        if (forTagEachEl !== undefined) {
            for (let a = 0; a < forTagEachEl.length; a++) {
                const aa = forTagEachEl[a];
                let ab = forContent;
                let ac = RegExp(`{{${forTagVarName}}}`, "g");
                ab = ab.replace(/{{i}}/g, a.toString());
                ab = ab.replace(ac, aa.innerHTML);
                forTag.innerHTML += ab;
            }
        }
    }
};
const generateIfs = () => {
    const getCase = (el) => {
        if (el.getAttribute("exists") || el.getAttribute("exist"))
            return "exists";
        else if (el.getAttribute("not-exists") || el.getAttribute("notexists") || el.getAttribute("not-exist") || el.getAttribute("notexist"))
            return "not-exists";
        else if (el.getAttribute("equals") || el.getAttribute("is"))
            return "equals";
        else if (el.getAttribute("has-class") || el.getAttribute("hasclass"))
            return "has-class";
        else if (el.getAttribute("item"))
            return "item";
    };
    const ifTags = document.querySelectorAll("if");
    for (let i = 0; i < ifTags.length; i++) {
        const ifTag = ifTags[i];
        const ifCase = getCase(ifTag);
        const ifAttr = ifTag.getAttribute(ifCase);
        const elseTag = ifTag.nextSibling.nodeName === "ELSE" ? ifTag.nextSibling : "";
        if (ifCase === "exists") {
            if (ifAttr.startsWith("{{") && ifAttr.endsWith("}}")) {
                let variableExists = false;
                const variableName = ifAttr.replace(/^{{/, "").replace(/}}$/, "");
                const variableElements = document.querySelectorAll("set");
                for (let i = 0; i < variableElements.length; i++) {
                    const variableEl = variableElements[i];
                    if (variableName === variableEl.getAttribute("name"))
                        variableExists = true;
                }
                if (variableExists === true) {
                    if (elseTag !== "")
                        elseTag.remove();
                    const content = ifTag.innerHTML;
                    ifTag.after(content);
                    ifTag.remove();
                }
                else {
                    ifTag.remove();
                    if (elseTag !== "") {
                        const content = elseTag.innerHTML;
                        elseTag.after(content);
                        elseTag.remove();
                    }
                }
            }
            else {
                const selector = document.querySelector(ifAttr);
                if (selector) {
                    if (elseTag !== "")
                        elseTag.remove();
                    const content = ifTag.innerHTML;
                    ifTag.after(content);
                    ifTag.remove();
                }
                else {
                    ifTag.remove();
                    if (elseTag !== "") {
                        const content = elseTag.innerHTML;
                        elseTag.after(content);
                        elseTag.remove();
                    }
                }
            }
        }
        else if (ifCase === "not-exists") {
            if (ifAttr.startsWith("{{") && ifAttr.endsWith("}}")) {
                let variableExists = false;
                const variableName = ifAttr.replace(/^{{/, "").replace(/}}$/, "");
                const variableElements = document.querySelectorAll("set");
                for (let i = 0; i < variableElements.length; i++) {
                    const variableEl = variableElements[i];
                    if (variableName !== variableEl.getAttribute("name")) {
                        if (elseTag === variableEl.getAttribute("name"))
                            variableExists = true;
                    }
                }
                if (variableExists === false) {
                    if (elseTag !== "")
                        elseTag.remove();
                    const content = ifTag.innerHTML;
                    ifTag.after(content);
                    ifTag.remove();
                }
                else {
                    ifTag.remove();
                    if (elseTag !== "") {
                        const content = elseTag.innerHTML;
                        elseTag.after(content);
                        elseTag.remove();
                    }
                }
            }
            else {
                const selector = document.querySelector(ifAttr);
                if (!selector) {
                    if (elseTag !== "")
                        elseTag.remove();
                    const content = ifTag.innerHTML;
                    ifTag.after(content);
                    ifTag.remove();
                }
                else {
                    ifTag.remove();
                    if (elseTag !== "") {
                        const content = elseTag.innerHTML;
                        elseTag.after(content);
                        elseTag.remove();
                    }
                }
            }
        }
        else if (ifCase === "equals") {
            const item = document.querySelector(ifTag.getAttribute("item"));
            if (item.innerHTML === ifTag.getAttribute("equals")) {
                if (elseTag !== "")
                    elseTag.remove();
                const content = ifTag.innerHTML;
                ifTag.after(content);
                ifTag.remove();
            }
            else {
                ifTag.remove();
                if (elseTag !== "") {
                    const content = elseTag.innerHTML;
                    elseTag.after(content);
                    elseTag.remove();
                }
            }
        }
        else if (ifCase === "has-class") {
            const item = document.querySelector(ifTag.getAttribute("item"));
            const classes = item.classList;
            let classNameExists = false;
            for (let i = 0; i < classes.length; i++) {
                const className = classes[i];
                if (className === ifTag.getAttribute("has-class")) {
                    classNameExists = true;
                    break;
                }
            }
            if (classNameExists === true) {
                if (elseTag !== "")
                    elseTag.remove();
                const content = ifTag.innerHTML;
                ifTag.after(content);
                ifTag.remove();
            }
            else {
                ifTag.remove();
                if (elseTag !== "") {
                    const content = elseTag.innerHTML;
                    elseTag.after(content);
                    elseTag.remove();
                }
            }
        }
        else if (ifCase === "item") {
            const item = document.querySelector(ifTag.getAttribute("item"));
        }
    }
};
const getAttributes = () => {
    const allTags = document.querySelectorAll("*");
    for (let i = 0; i < allTags.length; i++) {
        const tag = allTags[i];
        let style = "";
        if (tag.getAttribute("color")) {
            style += `color:${tag.getAttribute("color")};`;
            tag.removeAttribute("color");
        }
        if (tag.getAttribute("size")) {
            style += `font-size:${tag.getAttribute("size")};`;
            tag.removeAttribute("size");
        }
        if (tag.getAttribute("face")) {
            style += `font-family:${tag.getAttribute("face")};`;
            tag.removeAttribute("face");
        }
        if (tag.getAttribute("bgcolor")) {
            style += `background-color:${tag.getAttribute("bgcolor")};`;
            tag.removeAttribute("bgcolor");
        }
        if (tag.getAttribute("border")) {
            style += `border:${tag.getAttribute("border")} solid;`;
            tag.removeAttribute("border");
        }
        if (tag.getAttribute("align")) {
            style += `text-align:${tag.getAttribute("align")};`;
            tag.removeAttribute("align");
        }
        style = style.replace(/;}/g, "");
        if (style !== "")
            tag.setAttribute("style", style);
    }
};
let css = `<style type="text/css">set,extend,function,data{display:none}mobile,desktop{display:block}</style>`;
document.head.insertAdjacentHTML("beforeend", css);
const getDevice = () => {
    const mobileTags = document.querySelectorAll("mobile");
    const desktopTags = document.querySelectorAll("desktop");
    for (let i = 0; i < mobileTags.length; i++) {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            mobileTags[i].removeAttribute("style");
        }
        else {
            mobileTags[i].remove();
        }
    }
    for (let i = 0; i < desktopTags.length; i++) {
        if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            desktopTags[i].removeAttribute("style");
        }
        else {
            desktopTags[i].remove();
        }
    }
};
const generateExtend = () => {
    const extendTags = document.querySelectorAll("extend");
    for (let i = 0; i < extendTags.length; i++) {
        const extendTag = extendTags[i];
        const src = extendTag.getAttribute("src");
        fetch(src).then(response => response.text()).then(data => {
            data.replace(/<body>(.*?)<\/body>/gs, (s, bodyText) => {
                extendTag.insertAdjacentHTML("afterend", bodyText);
                extendTag.remove();
                return bodyText;
            });
        });
    }
};
const generateFunctions = () => {
    const functionTags = document.querySelectorAll("function");
    let functions = {};
    for (let i = 0; i < functionTags.length; i++) {
        const functionTag = functionTags[i];
        const functionName = functionTag.getAttribute("name");
        const functionArgs = functionTag.getAttribute("arguments");
        functions[functionName] = {};
        functions[functionName]["content"] = functionTag.innerHTML;
        functions[functionName]["arguments"] = functionArgs.split(" ");
        functionTag.remove();
    }
    document.body.innerHTML = document.body.innerHTML.replace(/{{(.*?)}}/g, function (s, varName) {
        if (/\(.*?\)$/.test(varName) === true) {
            const funcName = varName.replace(/\((.*?)\)$/, "");
            let funcArgs = varName.replace(/(.*?)(?=\(.*?\))/, "").replace(/^\(|\)$/g, "").split(",");
            for (let i = 0; i < funcArgs.length; i++)
                funcArgs[i] = funcArgs[i].trim();
            let daFuncContent;
            try {
                daFuncContent = functions[funcName]["content"];
            }
            catch (err) {
                return s;
            }
            daFuncContent = daFuncContent.replace(/{{(.*?)}}/g, (s, setName) => {
                for (let i = 0; i < functions[funcName]["arguments"].length; i++) {
                    const arg = functions[funcName]["arguments"][i];
                    if (arg === setName) {
                        return funcArgs[i];
                    }
                }
            });
            return daFuncContent;
        }
        else
            return `{{${varName}}}`;
    });
};
const generateImages = () => {
    const imageTags = document.querySelectorAll("img, image");
    for (let i = 0; i < imageTags.length; i++) {
        const image = imageTags[i];
        const imageUrl = image.src;
        if (image.getAttribute("clickable") === null)
            continue;
        const parent = image.parentNode;
        const wrapper = document.createElement("a");
        wrapper.href = imageUrl;
        const accepted = ["newtab", "tab", "_blank"];
        for (let i = 0; i < accepted.length; i++)
            if (image.getAttribute("clickable").toLowerCase().replace(/ /g, "") === accepted[i])
                wrapper.setAttribute("target", "_blank");
        parent.replaceChild(wrapper, image);
        wrapper.appendChild(image);
    }
};
const generateLangTags = () => {
    const langTags = document.querySelectorAll("lang");
    for (let i = 0; i < langTags.length; i++) {
        const langTag = langTags[i];
        let language = "";
        if (document.querySelector("html"))
            language = document.querySelector("html").getAttribute("lang");
        else
            pamlErr("<html> tag was not found.");
        if (langTag.getAttribute("code") !== null)
            langTag.innerText = language;
        else {
            if (iso639_1[language] !== undefined)
                langTag.innerText = iso639_1[language];
            else if (iso639_2[language] !== undefined)
                langTag.innerText = iso639_2[language];
            else
                pamlErr(`Language code "${language}" was not found.`, "warning");
        }
    }
};
const generateValueTags = () => {
    const valueTags = document.querySelectorAll("value");
    for (let i = 0; i < valueTags.length; i++) {
        const valueTag = valueTags[i];
        const defaultValue = valueTag.innerHTML;
        let element = document.querySelector(valueTag.getAttribute("item"));
        if (element) {
            if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
                element = element;
                element.oninput = () => {
                    if (element.value)
                        valueTag.innerText = element.value;
                    else
                        valueTag.innerHTML = defaultValue;
                };
            }
            else if (element.tagName === "DIV") {
                element = element;
                if (element.getAttribute("contenteditable") !== null) {
                    element.oninput = () => {
                        if (element.innerHTML)
                            valueTag.innerHTML = element.innerHTML;
                        else
                            valueTag.innerHTML = defaultValue;
                    };
                }
                else {
                    valueTag.innerHTML = element.innerHTML;
                }
            }
            else {
                valueTag.innerHTML = element.innerHTML;
            }
        }
    }
};
generateFors();
generateIfs();
generateFunctions();
generateVariables();
generateDate();
generateExtend();
getDevice();
getAttributes();
generateImages();
generateLangTags();
generateValueTags();
//# sourceMappingURL=paml.js.map