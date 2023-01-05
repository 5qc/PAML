const generateImages = () => {
    const imageTags: NodeListOf<HTMLImageElement> = document.querySelectorAll("img, image")

    for (let i = 0; i < imageTags.length; i++) {
        const image = <HTMLImageElement>imageTags[i]
        const imageUrl = image.src

        if (image.getAttribute("clickable") === null) continue

        const parent = <HTMLElement>image.parentNode
        const wrapper = <HTMLAnchorElement>document.createElement("a")

        wrapper.href = imageUrl
        
        const accepted = ["newtab", "tab", "_blank"]
        for (let i = 0; i < accepted.length; i++) if (image.getAttribute("clickable").toLowerCase().replace(/ /g, "") === accepted[i]) wrapper.setAttribute("target", "_blank")

        parent.replaceChild(wrapper, image)
        wrapper.appendChild(image)
    }
}