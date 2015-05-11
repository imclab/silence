'use strict'

const exec = require('mz/child_process').execFile
const assert = require('assert')

module.exports = Video

function Video(options) {
  let format = options.format
  if (format === 'mp4') format = 'x264'
  else if (format === 'webm') format = 'vp8'

  const crf = options.crf || 28
  assert(typeof crf === 'number', 'Invalid CRF!')

  const args = [
    '-v', 'warning',
    '-i', options.input,
  ]

  if (options.start_time) args.push('-ss', options.start_time)
  if (options.duration) args.push('-t', options.duration)
  if (options.mute !== true) args.push('-an')

  switch (format) {
    case 'vp8':
      args.push('-c:v', 'libvpx')
      args.push('-crf', crf)
      break
    case 'vp9':
      args.push('-c:v', 'libvpx-vp9')
      args.push('-crf', crf)
      break
    case 'x264':
      args.push('-c:v', 'libx264')
      args.push('-crf', crf)
      break
    case 'x265':
      args.push('-c:v', 'libx265')
      args.push('-x265-params', 'crf=' + crf)
      break
  }

  args.push(options.output)

  return exec('ffmpeg', args)
}
