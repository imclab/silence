'use strict'

const assert = require('assert')
const path = require('path')
const fs = require('fs')

const silence = require('..')

require('rimraf').sync(path.resolve('build'))
require('mkdirp').sync(path.resolve('build'))

it('should create a GIF', function () {
  return silence(fixture('small.mp4'), {
    fps: 15,
    output: 'build/small.gif',
  }).then(function () {
    assert(fs.statSync(path.resolve('build/small.gif')))
  })
})

it('should support an output format', function () {
  return silence({
    input: fixture('small.mp4'),
    format: 'gif',
  }).then(function (res) {
    assert(fs.statSync(res.output))
  })
})

function fixture(name) {
  return path.join(__dirname, 'fixtures', name)
}
