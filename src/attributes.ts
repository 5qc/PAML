const getAttributes = () => {
    const allTags = document.querySelectorAll("*")
    for (let i = 0; i < allTags.length; i++) {
        const tag = allTags[i]

        let style = ""
        if (tag.getAttribute("color")) {
            style += `color:${tag.getAttribute("color")};`
            tag.removeAttribute("color")
        } if (tag.getAttribute("size")) {
            style += `font-size:${tag.getAttribute("size")};`
            tag.removeAttribute("size")
        } if (tag.getAttribute("face")) {
            style += `font-family:${tag.getAttribute("face")};`
            tag.removeAttribute("face")
        } if (tag.getAttribute("bgcolor")) {
            style += `background-color:${tag.getAttribute("bgcolor")};`
            tag.removeAttribute("bgcolor")
        } if (tag.getAttribute("border")) {
            style += `border:${tag.getAttribute("border")} solid;`
            tag.removeAttribute("border")
        } if (tag.getAttribute("align")) {
            style += `text-align:${tag.getAttribute("align")};`
            tag.removeAttribute("align")
        }

        style = style.replace(/;}/g, "")
        
        if (style !== "") tag.setAttribute("style", style)
    }
}