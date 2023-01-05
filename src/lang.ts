const generateLangTags: Function = () => {
    const langTags: NodeListOf<HTMLElement> = document.querySelectorAll("lang")

    for (let i = 0; i < langTags.length; i++) {
        const langTag = <HTMLElement>langTags[i]
        let language = ""
        if (document.querySelector("html")) language = document.querySelector("html").getAttribute("lang")
        else pamlErr("<html> tag was not found.")

        if (langTag.getAttribute("code") !== null) langTag.innerText = language
        else {
            if (iso639_1[language] !== undefined) langTag.innerText = iso639_1[language]
            else if (iso639_2[language] !== undefined) langTag.innerText = iso639_2[language]
            else pamlErr(`Language code "${language}" was not found.`, "warning")
        }
    }
}