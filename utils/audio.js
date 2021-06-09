function getRepeatMode(mode) {
    return mode === 1 ? (mode === 2 ? 'Entire queue' : 'This song') : 'None'
}

module.exports = {getRepeatMode}