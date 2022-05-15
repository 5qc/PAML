function getSpan() {
    const spanTags = document.querySelectorAll("span")
    for (let i = 0; i < spanTags.length; i++) {
        const spanTag = spanTags[i]

        let style = ""
        if (spanTag.getAttribute("color")) {
            style += `color:${spanTag.getAttribute("color")};`
            spanTag.removeAttribute("color")
        } if (spanTag.getAttribute("size")) {
            style += `font-size:${spanTag.getAttribute("size")}`
            spanTag.removeAttribute("size")
        } if (spanTag.getAttribute("face")) {
            style += `font-family:${spanTag.getAttribute("face")}`
            spanTag.removeAttribute("face")
        }
        
        spanTag.setAttribute("style", style)
    }
}