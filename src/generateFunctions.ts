const generateFunctions: Function = () => {
    const functionTags: NodeListOf<HTMLElement> = document.querySelectorAll("function")
    
    let functions: Object = {}
    for (let i = 0; i < functionTags.length; i++) {
        const functionTag = <HTMLElement>functionTags[i]
        const functionName: string = functionTag.getAttribute("name")
        const functionArgs: string = functionTag.getAttribute("arguments")
        functions[functionName] = {}
        functions[functionName]["content"] = functionTag.innerHTML
        functions[functionName]["arguments"] = functionArgs.split(" ")
        functionTag.remove()
    }

    document.body.innerHTML = document.body.innerHTML.replace(/{{(.*?)}}/g, function(s, varName) {
        if (/\(.*?\)$/.test(varName) === true) {
            const funcName: string = varName.replace(/\((.*?)\)$/, "")
            let funcArgs: string[] = varName.replace(/(.*?)(?=\(.*?\))/, "").replace(/^\(|\)$/g, "").split(",")
            
            for (let i = 0; i < funcArgs.length; i++) funcArgs[i] = funcArgs[i].trim()
            
            let daFuncContent: string
            try {
                daFuncContent = functions[funcName]["content"]
            } catch(err) {
                return s
            }
            
            daFuncContent = daFuncContent.replace(/{{(.*?)}}/g, (s: String, setName: String) => {
                for (let i = 0; i < functions[funcName]["arguments"].length; i++) {
                    const arg: string = functions[funcName]["arguments"][i]
                    if (arg === setName) {
                        return funcArgs[i]
                    }
                }
            })

            return daFuncContent
        } else return `{{${varName}}}`
    })
}
