const path = require('path')
const { exec } = require('child_process')
const {
  mkdirSync: mkdir,
  existsSync: exists,
  createWriteStream
} = require('fs')
const request = require('request')

const UNSPLASH_URL = 'https://source.unsplash.com/random'
const DOWNLOADS_DIR = path.join(__dirname, 'downloads')

if (!exists(DOWNLOADS_DIR)) {
  mkdir(DOWNLOADS_DIR)
}

const filename = path.join(DOWNLOADS_DIR, `${new Date().getTime()}.jpeg`)
const stream = createWriteStream(filename)
request(UNSPLASH_URL)
  .pipe(stream)
  .on('close', () => {
    exec(`osascript -e 'tell application "System Events" to set picture of every desktop to ("${filename}" as POSIX file as alias)'`, (err, stdout, stderr) => {
      if (err) {
        console.error(`Could not set wallpaper: ${err.message}`)
      } else if (stderr) {
        console.error(`Could not set wallpaper: ${strerr}`)
      } else {
      }
    })
  })