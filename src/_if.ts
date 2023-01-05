const generateIfs = () => {
    const getCase = (el: Element) => {
        if (el.getAttribute("exists") || el.getAttribute("exist")) return "exists"
        else if (el.getAttribute("not-exists") || el.getAttribute("notexists") || el.getAttribute("not-exist") || el.getAttribute("notexist")) return "not-exists"
        else if (el.getAttribute("equals") || el.getAttribute("is")) return "equals"
        else if (el.getAttribute("has-class") || el.getAttribute("hasclass")) return "has-class"
        else if (el.getAttribute("item")) return "item" 
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
        } else if (ifCase === "equals") {
            const item = document.querySelector(ifTag.getAttribute("item"))
            if (item.innerHTML === ifTag.getAttribute("equals")) {
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
        } else if (ifCase === "has-class") {
            const item = document.querySelector(ifTag.getAttribute("item"))
            const classes = item.classList

            let classNameExists = false
            for (let i = 0; i < classes.length; i++) {
                const className = classes[i]
                if (className === ifTag.getAttribute("has-class")) {
                    classNameExists = true
                    break
                }
            }

            if (classNameExists === true) {
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
        } else if (ifCase === "item") {
            const item = document.querySelector(ifTag.getAttribute("item"))
        }
    }
}
