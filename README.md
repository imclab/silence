
# silence

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Dependency Status][david-image]][david-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]
[![Gittip][gittip-image]][gittip-url]

Another Video -> GIF creation tool.
Similar to [gify](https://www.npmjs.com/package/gify) except:

- It only uses ffmpeg, so it's 10x faster.
- It uses ffmpeg's new palettegen to create better GIFs.
- It will eventually support APNG and animated WebP when ffmpeg supports it.
- Requires the latest version of ffmpeg.

It uses settings from this post: http://blog.pkh.me/p/21-high-quality-gif-with-ffmpeg.html

## API

### silence([input], options).then( options => )

Options:

- `.input` - input filename
- `.output` - output filename
- `.format=gif` - alternative to `.output`. Creates a specific format.
- `.fps=20` - number of frames per second
- `.start_time=0` - a string of the form `hh:mm:ss[.ms]` or in milliseconds
- `.max_size=320` - maximum dimension of the file
- `.duration` - milliseconds

`options` is returned, mutated, with `.output` always defined.

[npm-image]: https://img.shields.io/npm/v/silence.svg?style=flat-square
[npm-url]: https://npmjs.org/package/silence
[github-tag]: http://img.shields.io/github/tag/mgmtio/silence.svg?style=flat-square
[github-url]: https://github.com/mgmtio/silence/tags
[travis-image]: https://img.shields.io/travis/mgmtio/silence.svg?style=flat-square
[travis-url]: https://travis-ci.org/mgmtio/silence
[coveralls-image]: https://img.shields.io/coveralls/mgmtio/silence.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/mgmtio/silence
[david-image]: http://img.shields.io/david/mgmtio/silence.svg?style=flat-square
[david-url]: https://david-dm.org/mgmtio/silence
[license-image]: http://img.shields.io/npm/l/silence.svg?style=flat-square
[license-url]: LICENSE
[downloads-image]: http://img.shields.io/npm/dm/silence.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/silence
[gittip-image]: https://img.shields.io/gratipay/jonathanong.svg?style=flat-square
[gittip-url]: https://gratipay.com/jonathanong/
