const generateExtend = () => {
    const extendTags = document.querySelectorAll("extend")

    for (let i = 0; i < extendTags.length; i++) {
        const extendTag = extendTags[i]
        const src = extendTag.getAttribute("src")

        fetch(src).then(response => response.text()).then(data => {
            data.replace(/<body>(.*?)<\/body>/gs, (s, bodyText) => {
                extendTag.insertAdjacentHTML("afterend", bodyText)
                extendTag.remove()
                return bodyText
            })
        })
    }
}