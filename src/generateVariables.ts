const generateVariables = () => {
    const variables = {}
    const variablesEl = document.querySelectorAll("set")
    for (let i = 0; i < variablesEl.length; i++) {
        const variable = variablesEl[i]
        const variableName = variable.getAttribute("name")
        const variableContent = variable.innerHTML

        for (let i = 0; i < bannedChars.length; i++) {
            if (variableName.includes(bannedChars[i])) return pamlErr(`Variable name ${variableName} uses banned character (${bannedChars[i]}).`)
        }

        variables[variableName] = variableContent
        variable.remove()

        const variableRegex = RegExp(`(?<!<if exists="){{${variableName}}}`, "g")
        document.body.innerHTML = document.body.innerHTML.replace(variableRegex, variableContent)
    }
}
