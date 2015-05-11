'use strict'

/**
 * Base constructor for all implementations.
 */

const temp = require('temp-path')
const assert = require('assert')
const path = require('path')
const fs = require('mz/fs')

const formats = new Map()
formats.set('gif', require('./gif'))

const video_formats = [
  'webm',
  'mp4',
  'vp8',
  'vp9',
  'x264',
  'x265',
]
for (let format of video_formats) {
  formats.set(format, require('./video'))
}

const extensions = new Map()
extensions.set('gif', 'gif')
extensions.set('webm', 'webm')
extensions.set('mp4', 'mp4')
extensions.set('vp8', 'webm')
extensions.set('vp9', 'webm')
extensions.set('x264', 'mp4')
extensions.set('x265', 'mp4')

module.exports = silence

function silence(input, options) {
  if (typeof input === 'object') {
    options = input
  } else {
    options.input = input
  }
  assert(options.output || options.format, '.output required.')

  if (options.output) {
    options.output = path.resolve(options.output)
    let extension = /\.(\w+)$/.exec(options.output)
    assert(extension, '.output does not have an extension!')
    assert(formats.get(extension[1]), 'Unknown extension: ' + extension[1])
    options.format = extension[1]
  } else {
    options.format = options.format || 'gif'
    let extension = extensions.get(options.format)
    assert(extension, 'Unknown format: ' + options.format)
    options.output = temp() + '.' + extension
  }

  options.max_size = options.max_size
    || options.maxsize
    || options.maxSize
    || 320
  options.fps = options.fps || 20

  // if number, convert to seconds.milliseconds
  options.start_time = options.start_time
    || options.startTime
    || 0
  if (typeof options.start_time === 'number') options.start_time = String(options.start_time / 1000)

  // if number, convert to seconds.milliseconds
  if (typeof options.duration === 'number') options.duration = String(options.duration / 1000)

  const fn = formats.get(options.format)
  assert(fn, 'Invalid format: ' + options.format)

  return fs.access(options.input).then(function (res) {
    return fn(options)
  }).then(function () {
    return options
  })
}
