# Autoeditor SDK

This module provides access to Autoeditor to be able to make some
operations for autoeditor through a video editor.

## Installation

```bash
npm install --save @kassellabs/autoeditor
```

# Clip Editor

## Usage

Considering you have the follow div on your HTML:

```html
<div id="video-clip-editor"></div>
```

You can create a video clip editor using the following code:

```javascript
import { ClipEditor } from '@kassellabs/autoeditor'

const clipEditor = new ClipEditor('#video-clip-editor', {
  video: 'https://autoeditorfiles.kassellabs.io/autoeditor/cc0bd38b235.mp4',
  clips: [
    {start: 10, end: 20, selected: true},
    {start: 40, end: 60, selected: false},
    {start: 80, end: 120, selected: true},
  ],
})
```

This will create a new video clip editor using the preset video and clips in the timeline

## Events

You can listen to events and check when the editor's state was updated with the
following methods:

```javascript
clipEditor.on('ready', () => {
  console.log('The player was successfully mounted and finished loading')
})

clipEditor.on('change', ({ clips }) => {
  console.log('User has changed the clips to:', clips)
})
```

# CropSubtitleEditor

## Usage

Considering you have the follow div on your HTML:

```html
<div id="video-crop-subtitle-editor"></div>
```

You can create a video crop subtitle editor using the following code:

```javascript
import { CropSubtitleEditor } from '@kassellabs/autoeditor'

const cropSubtitleEditor = new CropSubtitleEditor('#video-crop-subtitle-editor', {
  input: {
    media: {
      url: 'https://autoeditor.us-mia-1.linodeobjects.com/videos/_N7YGRnKlMBOyOnv2HB7g.mp4', // Required -> URL of the base video to be edited
    },
  },
  data: {
    frameRate: 30, // Can be either 30 or 60 (Defaults to 30)
    overlays: {
      watermark: {
        type: 'image', // Type of the overlay (currently only supports image)
        url: 'https://autoeditor.us-mia-1.linodeobjects.com/files/SCzDBffxAcmN486quUlq9sHMJcRRIKEw_iZvq_d9M_HypyCk.png', // Overlay Image
      },
      front: [
        {
          type: 'image', // Type of the overlay (currently only supports image)
          start: 4.5, // When the overlay should appear
          end: 16,    // When the overlay should stop appearing
          url: 'https://autoeditor.us-mia-1.linodeobjects.com/files/EdSK3DAE4Xl9hkUH6uJ2em9bRbhH2sujzn_RItEngqtPwa6T.png', // Overlay Image
        },
      ],
      back: [
        {
          type: 'image', // Type of the overlay (currently only supports image)
          start: 10, // When the overlay should appear
          end: 25,   // When the overlay should stop appearing
          url: 'https://autoeditor.us-mia-1.linodeobjects.com/files/8w_XdKioNQNoqG_P0c6gh7BqArGV2TYugkMb8uO-VWAcfZDT.png', // Overlay Image
        },
      ],
    },
  },
  crop: {
    aspectRatio: 9 / 16, // Aspect ratio in which the video will be cropped (Defaults to 9 / 16)
    scenes: [ // Each scene should be placed as an element here
      {
        start: 0,       // Start time of the scene (in seconds)
        end: 3.35,      // End time of the scene (in seconds)
        exported: true, // Will the scene be exported in the final video?
        cropCenter: {   // The scene crop settings
          x: 986.5821075439453,
          y: 540,
          faceCenters: [ // Optional -> will be used in the future for easier cropping
            {
              x: 986.5821075439453,
              y: 540,
              width: 328.6436462402344,
              height: 385.56941986083973,
            },
          ],
        },
      },
      {
        end: 52.134,
        start: 3.35,
        exported: true,
        cropCenter: {
          zoom: 0.317,
          rotation: 0,
          restrictPosition: false,
          x: 960,
          y: 540,
          faceCenters: [
            {
              x: 688.7061309814453,
              y: 540,
              width: 404.1566848754883,
              height: 474.59916114807123,
            },
          ],
        },
      },
      {
        end: 76.334,
        start: 52.134,
        exported: true,
        cropCenter: {
          x: 875.2653408050537,
          y: 540,
          faceCenters: [
            {
              x: 875.2653408050537,
              y: 540,
              width: 377.5535774230957,
              height: 463.2939147949219,
            },
          ],
        },
      },
      {
        end: 82.667,
        start: 76.334,
        exported: true,
        cropCenter: {
          x: 888.1230068206787,
          y: 540,
          faceCenters: [
            {
              x: 888.1230068206787,
              y: 540,
              width: 330.472354888916,
              height: 378.0462169647217,
            },
          ],
        },
      },
      {
        end: 101.818,
        start: 82.667,
        exported: true,
        cropCenter: {
          x: 931.424560546875,
          y: 540,
          faceCenters: [
            {
              x: 931.424560546875,
              y: 540,
              width: 341.4722442626953,
              height: 464.4005870819092,
            },
          ],
        },
      },
    ],
  },
  subtitle: {
    transcription: {
      segments: [
        {
          text: 'tudo sabe eu vou contar',
          start: 0.545,
          end: 2.44,
          words: [
            {
              word: 'tudo',
              start: 0.545,
              end: 1.045,
            },
            {
              word: 'sabe',
              start: 1.185,
              end: 1.56,
            },
            {
              word: 'eu',
              start: 1.8,
              end: 1.96,
            },
            {
              word: 'vou',
              start: 1.96,
              end: 2.04,
            },
            {
              word: 'contar',
              start: 2.04,
              end: 2.44,
            },
          ],
        },
        ...
      ],
    },
  },
})
```

This will create a new video crop subtitle editor using the preset video and clips in the timeline

## Events

You can listen to events and check when the editor's state was updated with the
following methods:

```javascript
cropSubtitleEditor.on('ready', ({ input, data, crop, subtitle }) => {
  console.log('The player was successfully mounted and finished loading, the default settings are:', {
    input,
    data,
    crop,
    subtitle,
  })
})

cropSubtitleEditor.on('change', ({ input, data, crop, subtitle }) => {
  console.log('The settings have changed to:', {
    input,
    data,
    crop,
    subtitle,
  })
})
```

## Developing

To develop and test this library, you can run:

```bash
npm run dev
```

This will setup building, auto-rebuilding the library once you any code is changed

```bash
npm run server
```

This will run a server and display the project at: `http://localhost:8080/demos/`

If you wish to test the library, refer to the `index.html` page and change it
to what you want to test.

You can use `__editorURL` special parameter to change the intended editor
iframe URL to the one on your dev server
