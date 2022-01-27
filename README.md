# Subtitle Merger

No dependencies subtitle merger.

:white_check_mark: SRT support

## Installation

### npm

`npm i subtitle-merger`

## Usage

Example of merging subtitles.

```ts
import { merge } from "subtitle";

const subOne = `
1
00:00:00,498 --> 00:00:02,827
Hello, this is an example.

`;
const subTwo = `
1
00:00:00,498 --> 00:00:02,827
こんにちは。これはサンプルです。

`;

// it will return a Subtitle object.
const mergedSubtitle = merge(subOne, subTwo);
```

Getting the merged content as a text:

```ts
mergedSubtitle.content;

// Output:
// 1
// 00:00:00,498 --> 00:00:02,827
// Hello, this is an example.
// こんにちは。これはサンプルです。
```

Getting the merged content as a Blob:

```ts
mergedSubtitle.blob;
```
