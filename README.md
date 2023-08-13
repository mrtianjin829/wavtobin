# WavToBin

A simple cli tool made in Node.js for creating 32Khz u8 (unsigned 8-bit) mono dumps.

## Install

Supported Platforms:

- Windows
- Linux/Unix
- Pretty much all platforms supported by Node.js

### Required programs:

- Node.js
- NPM
  In order to install, you need to download a specific tag from the repositoru

After that, extract the downloaded zip/tar.gz file.
Run `npm i` on the extracted folder
And you are all set.

## Documentation

### Synopsis:

```sh
./index.js [-o OUTPUT] [-r SAMPLERATE] FILE.WAV
```

Once you execute this command properly, the program will create the file `out.bin` and continue silently.

### Convert output results back to wav file

You can use SoX (Sound Exchange) to convert back.

```sh
sox -t u8 -r 32000 -c 1 out.bin out.wav
```
