const generateVariables = () => {
    const variables = {};
    const variablesEl = document.querySelectorAll("set");
    for (let i = 0; i < variablesEl.length; i++) {
        const variable = variablesEl[i];
        const variableName = variable.getAttribute("name");
        const variableContent = variable.innerHTML;
        console.log(variable.parentElement.tagName);
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
        if (forTagIn.startsWith("{{") && forTagIn.endsWith("}}")) {
        }
        else {
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
let css = `<style type="text/css">set,function{display:none;}</style>`;
document.head.insertAdjacentHTML("beforeend", css);
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
generateFors();
generateIfs();
generateFunctions();
generateVariables();
//# sourceMappingURL=paml.js.map
