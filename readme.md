## Problem description

When we use any one of four Cordova plugin in Android device, pdftron throw the error. We need to install Android studio to reproduce the problem.

```
"cordova-plugin-file": "^6.0.2",
"cordova-plugin-file-opener2": "^3.0.5",
"cordova-plugin-file-transfer": "^1.7.1",
"cordova-plugin-filechooser": "^1.2.0",
```



## Start

### Install ionic

Install ionic if you haven't installed.

```sh
npm install -g @ionic/cli
```



### config android studio

modifier `capacitor.config.json`

```
"windowsAndroidStudioPath": "directory of Android Studio .exe file"
```



### Start program

Install dependence

```sh
npm install
```



You modifier any code, use this cli to sync to android side.

```sh
ionic cap sync
```



Launch  Android Studio

```sh
npm cap run android
```



## Problem reproduce

Click image not loaded, reproduce the problem.



when you remove these dependences in `package.json`, pdftron can be used. 

```json
{
  "devDependencies": {
    "cordova-plugin-file": "^6.0.2",
    "cordova-plugin-file-opener2": "^3.0.5",
    "cordova-plugin-file-transfer": "^1.7.1",
    "cordova-plugin-filechooser": "^1.2.0",
  },
    
  "cordova": {
    "plugins": {
      "cordova-plugin-file-transfer": {},
      "cordova-plugin-file": {},
      "cordova-plugin-filechooser": {},
      "cordova-plugin-file-opener2": {
        "ANDROID_SUPPORT_V4_VERSION": "27.+"
      }
    },
  },
}

```



The problem code:

```js
const data = await doc.getFileData({
    // saves the document with annotations in it
    xfdfString,
});
console.log(data)
```



the right log in Android Studio: 

```
I/Capacitor/Console: File: blob:http://localhost/1368d383-a538-4c39-a41a-0f70b8a021bb - Line 1 - Msg: Permission: write
I/Capacitor/Console: File: https://cdn.bootcss.com/vConsole/3.2.0/vconsole.min.js - Line 11 - Msg: [object ArrayBuffer]
```

the error log in Android Studio:

```
W/Capacitor/Console: File: http://localhost/wv-resources/lib/core/CoreControls.js - Line 190 - Msg: Invalid parameter in getDocument, need either Uint8Array, string or a parameter object
E/Capacitor/Console: File: http://localhost/wv-resources/lib/core/CoreControls.js - Line 925 - Msg: Uncaught (in promise) #<Object>
    File: http://localhost/wv-resources/lib/core/CoreControls.js - Line 217 - Msg: Uncaught (in promise) #<Object>
E/Capacitor/Console: File: http://localhost/wv-resources/lib/ui/index.html#d=https%3A%2F%2Fpdftron.s3.amazonaws.com%2Fdownloads%2Fpl%2Fwebviewer-demo.pdf&a=1&filepicker=0&pdfnet=0&enableRedaction=0&enableMeasurement=0&pageHistory=1&notesInLeftPanel=0&singleServerMode=false&selectAnnotationOnCreation=0&id=1 - Line 0 - Msg: Uncaught (in promise) #<Object>
```

