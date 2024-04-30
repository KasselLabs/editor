const EventEmitter = require('events');
const getContainer = require('./getContainer');
const convertSecondsToTimeString = require('./utils/convertSecondsToTimeString');

class AutoeditorCropSubtitleEditor {
  constructor(containerSelectorOrElement, options = {}) {
    const {
      __editorURL = 'https://editor.kassellabs.io',
      video,
      input,
      data,
      crop,
      subtitle,
      aspectRatio,
    } = options;
    const container = getContainer(containerSelectorOrElement);
    const iframe = document.createElement('iframe');
    iframe.width = '100%';
    iframe.height = '100%';
    iframe.scrolling = 'yes';
    iframe.style.border = 'none';
    iframe.allowFullScreen = true;

    iframe.setAttribute('src', `${__editorURL}/embed/project`);

    container.appendChild(iframe);

    this.editorURL = new URL(__editorURL);
    this.iframe = iframe;
    this.video = video;
    this.input = input;
    this.data = data;
    this.crop = crop;
    this.subtitle = {
      transcription: {
        segments: subtitle.transcription?.segments?.map((segment, index) => ({
          id: index + 1,
          text: segment.text,
          startTime: convertSecondsToTimeString(segment.start),
          endTime: convertSecondsToTimeString(segment.end),
          words: segment.words.map((word) => ({
            word: word.word,
            startTime: convertSecondsToTimeString(word.start),
            endTime: convertSecondsToTimeString(word.end),
          })),
        })) || [],
      },
    };
    this.aspectRatio = aspectRatio;

    this.eventEmitter = new EventEmitter();

    window.addEventListener('message', this.onMessage);
  }

  onMessage = (event) => {
    const { data } = event;
    if (event.origin !== this.editorURL.origin) {
      return;
    }

    // eslint-disable-next-line default-case
    switch (data.action) {
      case 'mounted':
        console.log('Mounted');
        // Preset Crops
        this.iframe.contentWindow.postMessage({
          action: 'initialize',
          payload: {
            input: this.input,
            data: this.data,
            crop: this.crop,
            subtitle: this.subtitle,
          },
        }, '*');
        break;

      case 'ready':
        this.eventEmitter.emit('ready', data.payload);
        break;

      case 'change':
        this.eventEmitter.emit('change', data.payload);
        break;
    }
  };

  on = (eventName, callback) => {
    this.eventEmitter.on(eventName, callback);
  };

  off = (eventName, callback) => {
    this.eventEmitter.off(eventName, callback);
  };

  destroy() {
    window.removeEventListener('message', this.onMessage);
    this.iframe.remove();
  }
}
module.exports = AutoeditorCropSubtitleEditor;
