const EventEmitter = require('events');
const getContainer = require('./getContainer');
const convertSecondsToTimeString = require('./utils/convertSecondsToTimeString');

class AutoeditorCropSubtitleEditor {
  constructor(containerSelectorOrElement, options = {}) {
    const {
      __editorURL = 'https://autoeditor.video',
      video,
      input,
      data,
      crop,
      detectScenes,
      subtitle,
      aspectRatio,
      theme,
      apiKey,
      userId,
      defaultMode,
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

    this.apiKey = apiKey;
    this.userId = userId;
    this.defaultMode = defaultMode;
    this.editorURL = new URL(__editorURL);
    this.initialized = false;
    this.iframe = iframe;
    this.video = video;
    this.input = input;
    this.data = data;
    this.crop = crop;
    this.detectScenes = detectScenes;
    this.theme = theme;
    this.subtitle = {
      ...subtitle,
      transcription: {
        ...subtitle?.transcription,
        segments: subtitle.transcription?.segments?.map((segment, index) => ({
          id: index + 1,
          text: segment.text,
          startTime: segment.startTime || convertSecondsToTimeString(segment.start),
          endTime: segment.endTime || convertSecondsToTimeString(segment.end),
          words: segment.words.map((word) => ({
            word: word.word,
            startTime: word.startTime || convertSecondsToTimeString(word.start),
            endTime: word.endTime || convertSecondsToTimeString(word.end),
          })),
        })) || [],
      },
    };
    this.aspectRatio = aspectRatio;

    this.eventEmitter = new EventEmitter();

    window.addEventListener('message', this.onMessage);
  }

  setTheme(theme) {
    this.theme = theme;
    this.iframe.contentWindow.postMessage({
      action: 'set-theme',
      payload: this.theme,
    }, '*');
  }

  onMessage = (event) => {
    const { data } = event;
    if (event.origin !== this.editorURL.origin) {
      return;
    }

    // eslint-disable-next-line default-case
    switch (data.action) {
      case 'mounted':
        if (this.theme) {
          this.setTheme(this.theme);
        }

        // Preset Crops
        this.iframe.contentWindow.postMessage({
          action: 'initialize',
          payload: {
            input: this.input,
            data: this.data,
            crop: this.crop,
            detectScenes: this.detectScenes,
            subtitle: this.subtitle,
            apiKey: this.apiKey,
            userId: this.userId,
            defaultMode: this.defaultMode,
          },
        }, '*');
        break;

      case 'change': {
        if (this.initialized) {
          this.eventEmitter.emit('change', data.payload);
          return;
        }

        const isExistingClipIntervals = data.payload?.data?.clipIntervals?.length > 0;
        if (isExistingClipIntervals) {
          this.eventEmitter.emit('ready', data.payload);
          this.initialized = true;
        }
      }
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
