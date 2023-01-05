const generateFors = () => {
    const forTags: NodeListOf<HTMLElement> = document.querySelectorAll("for")
    for (let i = 0; i < forTags.length; i++) {
        const forTag: HTMLElement = forTags[i]
        
        let forTagEach: string
        if (forTag.getAttribute("each") !== null) forTagEach = forTag.getAttribute("each")
        else pamlErr("For tag is missing \"each\" attribute.")
        
        let forTagIn: string
        if (forTag.getAttribute("in") !== null) forTagIn = forTag.getAttribute("in")
        else pamlErr("For tag is missing \"in\" attribute.")
        
        const forTagVarName: string = forTag.getAttribute("varName")
        const forContent: string = forTag.innerHTML

        if (forTagVarName === "i") pamlErr("Variable name \"i\" is reserved.")

        let forTagInEl: HTMLElement
        if (forTagIn !== undefined) forTagInEl = document.querySelector(forTagIn)
        let forTagEachEl: NodeListOf<HTMLElement>
        if (forTagInEl !== undefined) forTagEachEl = forTagInEl.querySelectorAll(forTagEach)
            
        forTag.innerHTML = ""
        if (forTagEachEl !== undefined) {
            for (let a = 0; a < forTagEachEl.length; a++) {
                const aa: HTMLElement = forTagEachEl[a]
                let ab: string = forContent
                let ac: RegExp = RegExp(`{{${forTagVarName}}}`, "g")
                ab = ab.replace(/{{i}}/g, a.toString())
                ab = ab.replace(ac, aa.innerHTML)
                
                forTag.innerHTML += ab
            }
        }
    }
}
