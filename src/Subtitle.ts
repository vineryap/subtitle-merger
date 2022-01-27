export class Subtitle {
  contents: string;
  constructor(contents: string) {
    this.contents = contents;
  }

  get blob() {
    return new Blob([this.contents], { type: "text/plain" });
  }
}
