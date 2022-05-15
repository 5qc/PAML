const getDevice = () => {
    const mobileTags = document.querySelectorAll("mobile")
    const desktopTags = document.querySelectorAll("desktop")
    for (let i = 0; i < mobileTags.length; i++) {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            mobileTags[i].removeAttribute("style")
        } else {
            mobileTags[i].remove()
        }
    }
    for (let i = 0; i < desktopTags.length; i++) {
        if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            desktopTags[i].removeAttribute("style")
        } else {
            desktopTags[i].remove()
        }
    }
}