'use strict'

/**
 * Base constructor for all implementations.
 */

const temp = require('temp-path')
const assert = require('assert')
const path = require('path')
const fs = require('mz/fs')

let formats = new Map()
formats.set('gif', require('./gif'))

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
  } else {
    options.format = options.format || 'gif'
    options.output = temp() + '.' + options.format
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

  let format = /\.(\w+)$/.exec(options.output)
  assert(format, 'No output format found!')
  let fn = formats.get(format[1])
  assert(fn, 'Unsupported format: ' + format[1])

  return fs.access(options.input).then(function (res) {
    return fn(options)
  }).then(function () {
    return options
  })
}
