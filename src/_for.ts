const generateFors = () => {
    const forTags = document.querySelectorAll("for")
    for (let i = 0; i < forTags.length; i++) {
        const forTag = forTags[i]
        const forTagEach = forTag.getAttribute("each")
        const forTagIn = forTag.getAttribute("in")
        const forTagVarName = forTag.getAttribute("varName")
        const forContent = forTag.innerHTML

        if (forTagVarName === "i") pamlErr("Variable name \"i\" is reserved.")

        const forTagInEl = document.querySelector(forTagIn)
        const forTagEachEl = forTagInEl.querySelectorAll(forTagEach)
            
        forTag.innerHTML = ""
        for (let a = 0; a < forTagEachEl.length; a++) {
            const aa = forTagEachEl[a]
            let ab = forContent
            let ac = RegExp(`{{${forTagVarName}}}`, "g")
            ab = ab.replace(/{{i}}/g, a.toString())
            ab = ab.replace(ac, aa.innerHTML)
            
            forTag.innerHTML += ab
        }
    }
}
