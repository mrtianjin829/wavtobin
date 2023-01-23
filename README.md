# WavToBin
A simple cli tool made in Node.js for creating 32Khz u8 (unsigned 8-bit) mono dumps.
## Documentation
### Usage:
```sh
./index.js path/to/your/wavfile.wav
```
Once you execute this command properly, the program will create the file `out.bin` and continue silently.
### Convert output results back to wav file
You can use SoX (Sound Exchange) to convert back.
```sh
sox -t u8 -r 32000 -c 1 out.bin out.wav
```
