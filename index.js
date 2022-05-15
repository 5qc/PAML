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
const pamlErr = (text) => console.error(`[PAML] ${text}`);
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
        const forTagEach = forTag.getAttribute("each");
        const forTagIn = forTag.getAttribute("in");
        const forTagVarName = forTag.getAttribute("varName");
        const forContent = forTag.innerHTML;
        if (forTagVarName === "i")
            pamlErr("Variable name \"i\" is reserved.");
        const forTagInEl = document.querySelector(forTagIn);
        const forTagEachEl = forTagInEl.querySelectorAll(forTagEach);
        forTag.innerHTML = "";
        for (let a = 0; a < forTagEachEl.length; a++) {
            const aa = forTagEachEl[a];
            let ab = forContent;
            let ac = RegExp(`{{${forTagVarName}}}`, "g");
            ab = ab.replace(/{{i}}/g, a.toString());
            ab = ab.replace(ac, aa.innerHTML);
            forTag.innerHTML += ab;
        }
    }
};
const generateIfs = () => {
    const getCase = (el) => {
        if (el.getAttribute("exists") || el.getAttribute("exist"))
            return "exists";
        else if (el.getAttribute("not-exists") || el.getAttribute("notexists") || el.getAttribute("not-exist") || el.getAttribute("notexist"))
            return "not-exists";
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
    }
};
let css = `<style type="text/css">set{display:none}mobile,desktop{display:block}</style>`;
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
function getSpan() {
    const spanTags = document.querySelectorAll("span");
    for (let i = 0; i < spanTags.length; i++) {
        const spanTag = spanTags[i];
        let style = "";
        if (spanTag.getAttribute("color")) {
            style += `color:${spanTag.getAttribute("color")};`;
            spanTag.removeAttribute("color");
        }
        if (spanTag.getAttribute("size")) {
            style += `font-size:${spanTag.getAttribute("size")}`;
            spanTag.removeAttribute("size");
        }
        if (spanTag.getAttribute("face")) {
            style += `font-family:${spanTag.getAttribute("face")}`;
            spanTag.removeAttribute("face");
        }
        spanTag.setAttribute("style", style);
    }
}
generateFors();
generateIfs();
generateFunctions();
generateVariables();
generateDate();
getDevice();
getSpan();
//# sourceMappingURL=index.js.map