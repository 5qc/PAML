const generateValueTags = () => {
    const valueTags: NodeListOf<HTMLElement> = document.querySelectorAll("value")

    for (let i = 0; i < valueTags.length; i++) {
        const valueTag = <HTMLElement>valueTags[i]
        const defaultValue = valueTag.innerHTML
        let element: any = document.querySelector(valueTag.getAttribute("item"))

        if (element) {
            if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
                element = <HTMLInputElement>element
                element.oninput = () => {
                    if (element.value) valueTag.innerText = element.value
                    else valueTag.innerHTML = defaultValue
                }
            } else if (element.tagName === "DIV") {
                element = <HTMLDivElement>element
    
                if (element.getAttribute("contenteditable") !== null) {
                    element.oninput = () => {
                        if (element.innerHTML) valueTag.innerHTML = element.innerHTML
                        else valueTag.innerHTML = defaultValue
                    }
                } else {
                    valueTag.innerHTML = element.innerHTML
                }
            } else {
                valueTag.innerHTML = element.innerHTML
            }
        }
    }
}