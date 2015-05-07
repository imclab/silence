'use strict'

const exec = require('mz/child_process').execFile
const temp = require('temp-path')
const fs = require('fs')

module.exports = Gif

function Gif(options) {
  const stats_mode = options.stats_mode || 'diff'
  const palette = temp() + '.png'

  const args = ['-v', 'warning']
  if (options.start_time) args.push('-ss', options.start_time)
  if (options.duration) args.push('-t', options.duration)
  args.push('-i', options.input)

  const filters = `fps=${options.fps},scale=${options.max_size}:-1:flags=lanczos`

  return exec('ffmpeg', args.concat(
    '-vf', `${filters},palettegen=stats_mode=${stats_mode}`,
    '-y', palette
  )).then(function () {
    return exec('ffmpeg', args.concat(
      '-i', palette,
      '-lavfi', `${filters} [x]; [x][1:v] paletteuse`,
      '-y', options.output
    ))
  }).then(function () {
    // always delete the palette
    fs.unlink(palette, noop)
  }).catch(/* istanbul ignore next */ function (err) {
    fs.unlink(palette, noop)
    throw err
  })
}

function noop() {}
