export class Subtitle {
  content: string;
  constructor(content: string) {
    this.content = content;
  }

  get blob() {
    return new Blob([this.content], { type: "text/plain" });
  }
}
