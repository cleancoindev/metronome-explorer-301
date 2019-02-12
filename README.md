[![Build Status](https://travis-ci.com/autonomoussoftware/metronome-explorer-301.svg?branch=master)](https://travis-ci.com/autonomoussoftware/metronome-explorer-301)
[![Code Style](https://img.shields.io/badge/code%20style-bloq-0063a6.svg)](https://github.com/bloq/eslint-config-bloq)
[![Known Vulnerabilities](https://snyk.io/test/github/autonomoussoftware/metronome-explorer-301/badge.svg?targetFile=package.json)](https://snyk.io/test/github/autonomoussoftware/metronome-explorer-301?targetFile=package.json)

# metronome-explorer-301

Redirection service to replace the Metronome Explorer.

It will redirect all `GET /transactions/:hash` requests to a target Explorer service.
All other requests will be redirected as-is to the same service.

## Start

```shell
npm start
```

### Configuration options

The following environment variables control the service beahvior:

- `EXPLORER_BASE_PATH`: Base URL of the target explorer.
- `EXPLORER_URL`: Path on the target explorer. Replaces `:hash` with the required transaction hash.
- `LOGGER_*`: Control logging to console and Papertrail service.
- `PORT`: Defaults to 3004

## Docker

A dockerized version can be built for development by running:

```shell
npm run docker:build
```

Then, it can be run:

```shell
npm run docker:run
```

## License MIT
