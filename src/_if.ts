const generateIfs = () => {
    const getCase = (el: Element) => {
        if (el.getAttribute("exists")) return "exists"
    }

    const ifTags = document.querySelectorAll("if")
    
    for (let i = 0; i < ifTags.length; i++) {
        const ifTag = ifTags[i]
        const ifCase = getCase(ifTag)
        const ifAttr = ifTag.getAttribute(ifCase)
        const elseTag = ifTag.nextSibling.nodeName === "ELSE" ? <HTMLElement> ifTag.nextSibling : ""

        if (ifCase === "exists") {
            if (ifAttr.startsWith("{{") && ifAttr.endsWith("}}")) {
                const variableName = ifAttr.replace(/^{{/, "").replace(/}}$/, "")
                const variableElements = document.querySelectorAll("set")
                for (let i = 0; i < variableElements.length; i++) {
                    const variableEl = variableElements[i]
                    if (variableName === variableEl.getAttribute("name")) {
                        if (elseTag !== "") elseTag.remove()
                        const content = ifTag.innerHTML
                        ifTag.after(content)
                        ifTag.remove()
                    } else {
                        ifTag.remove()
                        if (elseTag !== "") {
                            const content = elseTag.innerHTML
                            elseTag.after(content)
                            elseTag.remove()
                        }
                    }
                }
            }
        }
    }
}
