const generateIfs = () => {
    const getCase = (el: Element) => {
        if (el.getAttribute("exists") || el.getAttribute("exist")) return "exists"
        else if (el.getAttribute("not-exists") || el.getAttribute("notexists") || el.getAttribute("not-exist") || el.getAttribute("notexist")) return "not-exists"
    }

    const ifTags = document.querySelectorAll("if")
    
    for (let i = 0; i < ifTags.length; i++) {
        const ifTag = ifTags[i]
        const ifCase = getCase(ifTag)
        const ifAttr = ifTag.getAttribute(ifCase)
        const elseTag = ifTag.nextSibling.nodeName === "ELSE" ? <HTMLElement> ifTag.nextSibling : ""

        if (ifCase === "exists") {
            if (ifAttr.startsWith("{{") && ifAttr.endsWith("}}")) {
                let variableExists = false
                const variableName = ifAttr.replace(/^{{/, "").replace(/}}$/, "")
                const variableElements = document.querySelectorAll("set")
                for (let i = 0; i < variableElements.length; i++) {
                    const variableEl = variableElements[i]
                    if (variableName === variableEl.getAttribute("name")) variableExists = true
                }

                if (variableExists === true) {
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
            } else {
                const selector = document.querySelector(ifAttr)
                if (selector) {
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
        } else if (ifCase === "not-exists") {
            if (ifAttr.startsWith("{{") && ifAttr.endsWith("}}")) {
                let variableExists = false
                const variableName = ifAttr.replace(/^{{/, "").replace(/}}$/, "")
                const variableElements = document.querySelectorAll("set")
                for (let i = 0; i < variableElements.length; i++) {
                    const variableEl = variableElements[i]
                    if (variableName !== variableEl.getAttribute("name")) {
                        if (elseTag === variableEl.getAttribute("name")) variableExists = true
                    }
                }

                if (variableExists === false) {
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
            } else {
                const selector = document.querySelector(ifAttr)
                if (!selector) {
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
