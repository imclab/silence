'use strict'

const assert = require('assert')
const path = require('path')
const fs = require('fs')

const silence = require('..')

require('rimraf').sync(path.resolve('build'))
require('mkdirp').sync(path.resolve('build'))

describe('GIF', function () {
  it('should create a GIF', function () {
    console.log(fs.statSync(fixture('small.mp4')).size)
    
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
      console.log(res.output)
      assert(fs.statSync(res.output))
      console.log(fs.statSync(res.output).size)
    })
  })
})

describe('x264', function () {
  it('should create an mp4', function () {
    return silence({
      input: fixture('small.mp4'),
      format: 'mp4'
    }).then(function (res) {
      console.log(res.output)
      assert(/\.mp4$/.test(res.output))
      assert(fs.statSync(res.output))
    })
  })

  it('should create a x264', function () {
    return silence({
      input: fixture('small.mp4'),
      format: 'x264'
    }).then(function (res) {
      console.log(res.output)
      assert(/\.mp4$/.test(res.output))
      assert(fs.statSync(res.output))
      console.log(fs.statSync(res.output).size)
    })
  })
})

describe('vp8', function () {
  it('should create a webm', function () {
    return silence({
      input: fixture('small.mp4'),
      format: 'webm'
    }).then(function (res) {
      console.log(res.output)
      assert(/\.webm$/.test(res.output))
      assert(fs.statSync(res.output))
      console.log(fs.statSync(res.output).size)
    })
  })

  it('should create a vp8', function () {
    return silence({
      input: fixture('small.mp4'),
      format: 'vp8'
    }).then(function (res) {
      console.log(res.output)
      assert(/\.webm$/.test(res.output))
      assert(fs.statSync(res.output))
    })
  })
})

describe('x265', function () {
  it('should create a x265', function () {
    return silence({
      input: fixture('small.mp4'),
      format: 'x265'
    }).then(function (res) {
      console.log(res.output)
      assert(/\.mp4$/.test(res.output))
      assert(fs.statSync(res.output))
      console.log(fs.statSync(res.output).size)
    })
  })
})

describe('vp9', function () {
  it('should create a vp9', function () {
    return silence({
      input: fixture('small.mp4'),
      format: 'vp9'
    }).then(function (res) {
      console.log(res.output)
      assert(/\.webm$/.test(res.output))
      assert(fs.statSync(res.output))
      console.log(fs.statSync(res.output).size)
    })
  })
})

function fixture(name) {
  return path.join(__dirname, 'fixtures', name)
}
