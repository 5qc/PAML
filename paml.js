const generateVariables = () => {
    const bannedChars = ["{", "}", ".", ","];
    const variables = {};
    const variablesEl = document.querySelectorAll("set");
    for (let i = 0; i < variablesEl.length; i++) {
        const variable = variablesEl[i];
        const variableName = variable.getAttribute("name");
        const variableContent = variable.innerHTML;
        for (let i = 0; i < bannedChars.length; i++) {
            if (variableName.includes(bannedChars[i]))
                return exmlErr(`Variable name ${variableName} uses banned character (${bannedChars[i]}).`);
        }
        variables[variableName] = variableContent;
        variable.remove();
        const variableRegex = RegExp(`(?<!<if exists="){{${variableName}}}`, "g");
        document.body.innerHTML = document.body.innerHTML.replace(variableRegex, variableContent);
    }
};
const exmlErr = (text) => console.error(`[EXML] ${text}`);
const generateIfs = () => {
    const getCase = (el) => {
        if (el.getAttribute("exists"))
            return "exists";
    };
    const ifTags = document.querySelectorAll("if");
    for (let i = 0; i < ifTags.length; i++) {
        const ifTag = ifTags[i];
        const ifCase = getCase(ifTag);
        const ifAttr = ifTag.getAttribute(ifCase);
        const elseTag = ifTag.nextSibling.nodeName === "ELSE" ? ifTag.nextSibling : "";
        if (ifCase === "exists") {
            if (ifAttr.startsWith("{{") && ifAttr.endsWith("}}")) {
                const variableName = ifAttr.replace(/^{{/, "").replace(/}}$/, "");
                const variableElements = document.querySelectorAll("set");
                for (let i = 0; i < variableElements.length; i++) {
                    const variableEl = variableElements[i];
                    if (variableName === variableEl.getAttribute("name")) {
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
    }
};
let css = `<style type="text/css">set{display:none;}</style>`;
document.head.insertAdjacentHTML("beforeend", css);
generateIfs();
generateVariables();
//# sourceMappingURL=paml.js.map
