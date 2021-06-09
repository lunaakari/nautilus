function getTheLastItem(path) {
    const substringPath = path.substring(path.lastIndexOf('\\') + 1)
    return substringPath.substring(path.lastIndexOf('/') + 1)
}

module.exports = { getTheLastItem }