const generateFunctions = () => {
    const functionTags = document.querySelectorAll("function")
    
    let functions = {}
    for (let i = 0; i < functionTags.length; i++) {
        const functionTag = functionTags[i]
        const functionName = functionTag.getAttribute("name")
        const functionArgs = functionTag.getAttribute("arguments")
        functions[functionName] = {}
        functions[functionName]["content"] = functionTag.innerHTML
        functions[functionName]["arguments"] = functionArgs.split(" ")
        functionTag.remove()
    }

    document.body.innerHTML = document.body.innerHTML.replace(/{{(.*?)}}/g, function(s, varName) {
        if (/\(.*?\)$/.test(varName) === true) {
            const funcName = varName.replace(/\((.*?)\)$/, "")
            let funcArgs = varName.replace(/(.*?)(?=\(.*?\))/, "").replace(/^\(|\)$/g, "").split(",")
            for (let i = 0; i < funcArgs.length; i++) funcArgs[i] = funcArgs[i].trim()
            let daFuncContent
            try {
                daFuncContent = functions[funcName]["content"]
            } catch(err) {
                return s
            }
            daFuncContent = daFuncContent.replace(/{{(.*?)}}/g, (s: String, setName: String) => {
                for (let i = 0; i < functions[funcName]["arguments"].length; i++) {
                    const arg = functions[funcName]["arguments"][i]
                    if (arg === setName) {
                        return funcArgs[i]
                    }
                }
            })

            return daFuncContent
        } else return `{{${varName}}}`
    })
}
