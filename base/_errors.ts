const pamlErr = (text: string, type: string = "error") => {
    let prefix = "[PAML]"

    if (type === "error" || type === "err") console.error(`${prefix} ${text}`)
    else if (type === "warn" || type === "warning") console.warn(`${prefix} ${text}`)
    else pamlErr(`Type "${type}" was not found.`)
}