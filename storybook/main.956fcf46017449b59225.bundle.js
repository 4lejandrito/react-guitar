(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{1044:function(module,exports){},1129:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),function(module){var _storybook_react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(162);module._StorybookPreserveDecorators=!0,Object(_storybook_react__WEBPACK_IMPORTED_MODULE_0__.configure)([__webpack_require__(1310)],module)}.call(this,__webpack_require__(278)(module))},1310:function(module,exports,__webpack_require__){var map={"./index.stories.tsx":1311};function webpackContext(req){var id=webpackContextResolve(req);return __webpack_require__(id)}function webpackContextResolve(req){if(!__webpack_require__.o(map,req)){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}return map[req]}webpackContext.keys=function webpackContextKeys(){return Object.keys(map)},webpackContext.resolve=webpackContextResolve,module.exports=webpackContext,webpackContext.id=1310},1311:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),function(module){var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(2),react__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__),react_guitar__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(8),_storybook_react__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(162),_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(20),_tonaljs_midi__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(56),lodash__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(963),_storybook_addons__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(52),react_guitar_resources_E2_mp3__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(170),react_guitar_resources_E2_mp3__WEBPACK_IMPORTED_MODULE_7___default=__webpack_require__.n(react_guitar_resources_E2_mp3__WEBPACK_IMPORTED_MODULE_7__),react_guitar_resources_D3_mp3__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__(171),react_guitar_resources_D3_mp3__WEBPACK_IMPORTED_MODULE_8___default=__webpack_require__.n(react_guitar_resources_D3_mp3__WEBPACK_IMPORTED_MODULE_8__),react_guitar_resources_G3_mp3__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__(172),react_guitar_resources_G3_mp3__WEBPACK_IMPORTED_MODULE_9___default=__webpack_require__.n(react_guitar_resources_G3_mp3__WEBPACK_IMPORTED_MODULE_9__),react_guitar_resources_E4_mp3__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__(173),react_guitar_resources_E4_mp3__WEBPACK_IMPORTED_MODULE_10___default=__webpack_require__.n(react_guitar_resources_E4_mp3__WEBPACK_IMPORTED_MODULE_10__),react_guitar_theme_coco__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__(964),react_guitar_theme_dark__WEBPACK_IMPORTED_MODULE_12__=__webpack_require__(965),__assign=function(){return(__assign=Object.assign||function(t){for(var s,i=1,n=arguments.length;i<n;i++)for(var p in s=arguments[i])Object.prototype.hasOwnProperty.call(s,p)&&(t[p]=s[p]);return t}).apply(this,arguments)},withSourceLoader=__webpack_require__(340).withSource,__STORY__=(__webpack_require__(340).addSource,"import React from 'react'\nimport Guitar, {\n  useSound,\n  tunings,\n  getRenderFingerRelative,\n  getRenderFingerSpn,\n  spanishTheme\n} from 'react-guitar'\nimport { storiesOf } from '@storybook/react'\nimport {\n  withKnobs,\n  number,\n  boolean,\n  select,\n  color\n} from '@storybook/addon-knobs'\nimport { midiToNoteName } from '@tonaljs/midi'\nimport { range } from 'lodash'\nimport { useState } from '@storybook/addons'\nimport E2 from 'react-guitar/resources/E2.mp3'\nimport D3 from 'react-guitar/resources/D3.mp3'\nimport G3 from 'react-guitar/resources/G3.mp3'\nimport E4 from 'react-guitar/resources/E4.mp3'\nimport coco from 'react-guitar-theme-coco'\nimport dark from 'react-guitar-theme-dark'\n\nconst themes = { spanish: spanishTheme, dark, coco }\n\nstoriesOf('Guitar', module)\n  .addDecorator(withKnobs)\n  .add('advanced', () => {\n    const notes = range(12)\n      .map(note => note + 12)\n      .reduce(\n        (acc, note) => ({\n          ...acc,\n          [midiToNoteName(note, { pitchClass: true, sharps: true })]: note\n        }),\n        {} as {\n          [K: string]: number\n        }\n      )\n    const root = select('Root', notes, notes['C'])\n    const renderFingerFunctions = {\n      'Scientific Pitch Notation': getRenderFingerSpn(tunings.standard),\n      'Relative to Root': getRenderFingerRelative(tunings.standard, root)\n    }\n    const [strings, setStrings] = useState([0, 0, 0, 0, 0, 0])\n    const { play } = useSound({ E2, D3, G3, E4 }, strings)\n    return (\n      <Guitar\n        lefty={boolean('Lefty', false)}\n        frets={{\n          from: number('From fret', 0),\n          amount: number('Frets', 22)\n        }}\n        strings={strings}\n        renderFinger={\n          renderFingerFunctions[\n            select<keyof typeof renderFingerFunctions>(\n              'Notes',\n              ['Scientific Pitch Notation', 'Relative to Root'],\n              'Scientific Pitch Notation'\n            )\n          ]\n        }\n        theme={(themes as any)[select('Theme', Object.keys(themes), 'spanish')]}\n        onChange={setStrings}\n        onPlay={play}\n      />\n    )\n  })\n  .add('with fixed A minor', () => <Guitar strings={[0, 1, 2, 2, 0, -1]} />)\n  .add('with fixed and centered A bar chord', () => (\n    <Guitar\n      strings={[5, 5, 6, 7, 7, 5]}\n      lefty={boolean('Lefty', false)}\n      center\n    />\n  ))\n  .add('with fixed A minor and sound', () => {\n    const fretting = [0, 1, 2, 2, 0, -1]\n    const { play } = useSound({ E2, D3, G3, E4 }, fretting)\n    return <Guitar strings={fretting} onPlay={play} />\n  })\n  .add('editable', () => {\n    const [strings, setStrings] = useState([0, 0, 0, 0, 0, 0])\n    return <Guitar strings={strings} onChange={setStrings} />\n  })\n  .add('without strings', () => <Guitar />)\n  .add('ukelele', () => {\n    const [strings, setStrings] = useState([0, 0, 0, 0])\n    const { play } = useSound({ E2, D3, G3, E4 }, strings, tunings.ukelele)\n    return (\n      <Guitar\n        strings={strings}\n        onPlay={play}\n        renderFinger={getRenderFingerSpn(tunings.ukelele)}\n        onChange={setStrings}\n      />\n    )\n  })\n  .add('dark', () => (\n    <Guitar theme={themes.dark} strings={[0, 0, 0, 0, 0, 0]} />\n  ))\n  .add('coco', () => (\n    <Guitar theme={themes.coco} strings={[0, 0, 0, 0, 0, 0]} />\n  ))\n  .add('theming', () => (\n    <Guitar\n      theme={{\n        color: color('color', spanishTheme.color),\n        nut: { color: color('Nut color', spanishTheme.nut.color) },\n        fret: {\n          color: color('Fret color', spanishTheme.fret.color),\n          separator: {\n            color: color(\n              'Fret separator color',\n              spanishTheme.fret.separator.color\n            ),\n            radius: boolean('Fret separator radius', false),\n            shadow: boolean('Fret separator shadow', true),\n            width: select('Fret separator width', ['sm', 'md'], 'sm')\n          },\n          counter: {\n            color: color('Counter color', spanishTheme.fret.counter.color)\n          }\n        },\n        string: {\n          color: string =>\n            color(`String color ${string}`, spanishTheme.string.color(string))\n        },\n        finger: {\n          text: {\n            color: color('Finger text color', spanishTheme.finger.text.color)\n          },\n          color: color('Finger color', spanishTheme.finger.color)\n        }\n      }}\n      renderFinger={getRenderFingerSpn(tunings.standard)}\n      strings={[0, 0, 0, 0, 0, 0]}\n    />\n  ))\n"),__ADDS_MAP__={"guitar--theming":{startLoc:{col:7,line:109},endLoc:{col:3,line:143},startBody:{col:18,line:109},endBody:{col:3,line:143}},"guitar--coco":{startLoc:{col:7,line:106},endLoc:{col:3,line:108},startBody:{col:15,line:106},endBody:{col:3,line:108}},"guitar--dark":{startLoc:{col:7,line:103},endLoc:{col:3,line:105},startBody:{col:15,line:103},endBody:{col:3,line:105}},"guitar--ukelele":{startLoc:{col:7,line:91},endLoc:{col:3,line:102},startBody:{col:18,line:91},endBody:{col:3,line:102}},"guitar--without-strings":{startLoc:{col:7,line:90},endLoc:{col:42,line:90},startBody:{col:26,line:90},endBody:{col:42,line:90}},"guitar--editable":{startLoc:{col:7,line:86},endLoc:{col:3,line:89},startBody:{col:19,line:86},endBody:{col:3,line:89}},"guitar--with-fixed-a-minor-and-sound":{startLoc:{col:7,line:81},endLoc:{col:3,line:85},startBody:{col:39,line:81},endBody:{col:3,line:85}},"guitar--with-fixed-and-centered-a-bar-chord":{startLoc:{col:7,line:74},endLoc:{col:3,line:80},startBody:{col:46,line:74},endBody:{col:3,line:80}},"guitar--with-fixed-a-minor":{startLoc:{col:7,line:73},endLoc:{col:75,line:73},startBody:{col:29,line:73},endBody:{col:75,line:73}},"guitar--advanced":{startLoc:{col:7,line:31},endLoc:{col:3,line:72},startBody:{col:19,line:31},endBody:{col:3,line:72}}},themes={spanish:react_guitar__WEBPACK_IMPORTED_MODULE_1__.d,dark:react_guitar_theme_dark__WEBPACK_IMPORTED_MODULE_12__.a,coco:react_guitar_theme_coco__WEBPACK_IMPORTED_MODULE_11__.a};Object(_storybook_react__WEBPACK_IMPORTED_MODULE_2__.storiesOf)("Guitar",module).addParameters({storySource:{source:__STORY__,locationsMap:__ADDS_MAP__}}).addDecorator(withSourceLoader(__STORY__,__ADDS_MAP__,"/index.stories.tsx",[],{},"/home/runner/work/react-guitar/react-guitar/packages/react-guitar-storybook",{})).addDecorator(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_3__.withKnobs).add("advanced",(function(){var notes=Object(lodash__WEBPACK_IMPORTED_MODULE_5__.range)(12).map((function(note){return note+12})).reduce((function(acc,note){var _a;return __assign(__assign({},acc),((_a={})[Object(_tonaljs_midi__WEBPACK_IMPORTED_MODULE_4__.b)(note,{pitchClass:!0,sharps:!0})]=note,_a))}),{}),root=Object(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_3__.select)("Root",notes,notes.C),renderFingerFunctions={"Scientific Pitch Notation":Object(react_guitar__WEBPACK_IMPORTED_MODULE_1__.c)(react_guitar__WEBPACK_IMPORTED_MODULE_1__.e.standard),"Relative to Root":Object(react_guitar__WEBPACK_IMPORTED_MODULE_1__.b)(react_guitar__WEBPACK_IMPORTED_MODULE_1__.e.standard,root)},_a=Object(_storybook_addons__WEBPACK_IMPORTED_MODULE_6__.useState)([0,0,0,0,0,0]),strings=_a[0],setStrings=_a[1],play=Object(react_guitar__WEBPACK_IMPORTED_MODULE_1__.f)({E2:react_guitar_resources_E2_mp3__WEBPACK_IMPORTED_MODULE_7___default.a,D3:react_guitar_resources_D3_mp3__WEBPACK_IMPORTED_MODULE_8___default.a,G3:react_guitar_resources_G3_mp3__WEBPACK_IMPORTED_MODULE_9___default.a,E4:react_guitar_resources_E4_mp3__WEBPACK_IMPORTED_MODULE_10___default.a},strings).play;return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_guitar__WEBPACK_IMPORTED_MODULE_1__.a,{lefty:Object(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_3__.boolean)("Lefty",!1),frets:{from:Object(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_3__.number)("From fret",0),amount:Object(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_3__.number)("Frets",22)},strings:strings,renderFinger:renderFingerFunctions[Object(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_3__.select)("Notes",["Scientific Pitch Notation","Relative to Root"],"Scientific Pitch Notation")],theme:themes[Object(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_3__.select)("Theme",Object.keys(themes),"spanish")],onChange:setStrings,onPlay:play})})).add("with fixed A minor",(function(){return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_guitar__WEBPACK_IMPORTED_MODULE_1__.a,{strings:[0,1,2,2,0,-1]})})).add("with fixed and centered A bar chord",(function(){return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_guitar__WEBPACK_IMPORTED_MODULE_1__.a,{strings:[5,5,6,7,7,5],lefty:Object(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_3__.boolean)("Lefty",!1),center:!0})})).add("with fixed A minor and sound",(function(){var fretting=[0,1,2,2,0,-1],play=Object(react_guitar__WEBPACK_IMPORTED_MODULE_1__.f)({E2:react_guitar_resources_E2_mp3__WEBPACK_IMPORTED_MODULE_7___default.a,D3:react_guitar_resources_D3_mp3__WEBPACK_IMPORTED_MODULE_8___default.a,G3:react_guitar_resources_G3_mp3__WEBPACK_IMPORTED_MODULE_9___default.a,E4:react_guitar_resources_E4_mp3__WEBPACK_IMPORTED_MODULE_10___default.a},fretting).play;return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_guitar__WEBPACK_IMPORTED_MODULE_1__.a,{strings:fretting,onPlay:play})})).add("editable",(function(){var _a=Object(_storybook_addons__WEBPACK_IMPORTED_MODULE_6__.useState)([0,0,0,0,0,0]),strings=_a[0],setStrings=_a[1];return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_guitar__WEBPACK_IMPORTED_MODULE_1__.a,{strings:strings,onChange:setStrings})})).add("without strings",(function(){return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_guitar__WEBPACK_IMPORTED_MODULE_1__.a,null)})).add("ukelele",(function(){var _a=Object(_storybook_addons__WEBPACK_IMPORTED_MODULE_6__.useState)([0,0,0,0]),strings=_a[0],setStrings=_a[1],play=Object(react_guitar__WEBPACK_IMPORTED_MODULE_1__.f)({E2:react_guitar_resources_E2_mp3__WEBPACK_IMPORTED_MODULE_7___default.a,D3:react_guitar_resources_D3_mp3__WEBPACK_IMPORTED_MODULE_8___default.a,G3:react_guitar_resources_G3_mp3__WEBPACK_IMPORTED_MODULE_9___default.a,E4:react_guitar_resources_E4_mp3__WEBPACK_IMPORTED_MODULE_10___default.a},strings,react_guitar__WEBPACK_IMPORTED_MODULE_1__.e.ukelele).play;return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_guitar__WEBPACK_IMPORTED_MODULE_1__.a,{strings:strings,onPlay:play,renderFinger:Object(react_guitar__WEBPACK_IMPORTED_MODULE_1__.c)(react_guitar__WEBPACK_IMPORTED_MODULE_1__.e.ukelele),onChange:setStrings})})).add("dark",(function(){return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_guitar__WEBPACK_IMPORTED_MODULE_1__.a,{theme:themes.dark,strings:[0,0,0,0,0,0]})})).add("coco",(function(){return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_guitar__WEBPACK_IMPORTED_MODULE_1__.a,{theme:themes.coco,strings:[0,0,0,0,0,0]})})).add("theming",(function(){return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_guitar__WEBPACK_IMPORTED_MODULE_1__.a,{theme:{color:Object(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_3__.color)("color",react_guitar__WEBPACK_IMPORTED_MODULE_1__.d.color),nut:{color:Object(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_3__.color)("Nut color",react_guitar__WEBPACK_IMPORTED_MODULE_1__.d.nut.color)},fret:{color:Object(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_3__.color)("Fret color",react_guitar__WEBPACK_IMPORTED_MODULE_1__.d.fret.color),separator:{color:Object(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_3__.color)("Fret separator color",react_guitar__WEBPACK_IMPORTED_MODULE_1__.d.fret.separator.color),radius:Object(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_3__.boolean)("Fret separator radius",!1),shadow:Object(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_3__.boolean)("Fret separator shadow",!0),width:Object(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_3__.select)("Fret separator width",["sm","md"],"sm")},counter:{color:Object(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_3__.color)("Counter color",react_guitar__WEBPACK_IMPORTED_MODULE_1__.d.fret.counter.color)}},string:{color:function(string){return Object(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_3__.color)("String color "+string,react_guitar__WEBPACK_IMPORTED_MODULE_1__.d.string.color(string))}},finger:{text:{color:Object(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_3__.color)("Finger text color",react_guitar__WEBPACK_IMPORTED_MODULE_1__.d.finger.text.color)},color:Object(_storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_3__.color)("Finger color",react_guitar__WEBPACK_IMPORTED_MODULE_1__.d.finger.color)}},renderFinger:Object(react_guitar__WEBPACK_IMPORTED_MODULE_1__.c)(react_guitar__WEBPACK_IMPORTED_MODULE_1__.e.standard),strings:[0,0,0,0,0,0]})}))}.call(this,__webpack_require__(278)(module))},170:function(module,exports,__webpack_require__){module.exports=__webpack_require__.p+"static/media/E2.60d1bd4d.mp3"},171:function(module,exports,__webpack_require__){module.exports=__webpack_require__.p+"static/media/D3.a01e799c.mp3"},172:function(module,exports,__webpack_require__){module.exports=__webpack_require__.p+"static/media/G3.1fe79ca6.mp3"},173:function(module,exports,__webpack_require__){module.exports=__webpack_require__.p+"static/media/E4.ac1dc3ab.mp3"},8:function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"b",(function(){return getRenderFingerRelative})),__webpack_require__.d(__webpack_exports__,"c",(function(){return getRenderFingerSpn})),__webpack_require__.d(__webpack_exports__,"d",(function(){return spanishTheme})),__webpack_require__.d(__webpack_exports__,"e",(function(){return tunings})),__webpack_require__.d(__webpack_exports__,"f",(function(){return useSound}));var _emotion_core__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(22),tone__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(174),react__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(2),lodash_range__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(232),lodash_range__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(lodash_range__WEBPACK_IMPORTED_MODULE_3__),_tonaljs_note__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(168),classnames__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(962),classnames__WEBPACK_IMPORTED_MODULE_5___default=__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_5__),color__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(169),color__WEBPACK_IMPORTED_MODULE_6___default=__webpack_require__.n(color__WEBPACK_IMPORTED_MODULE_6__);function set(array,pos,item){var newArray=array.slice(0);return newArray[pos]=item,newArray}var makeTuning=function(text){return text.split(" ").map((function(name){var _a;return null!==(_a=Object(_tonaljs_note__WEBPACK_IMPORTED_MODULE_4__.c)(name))&&void 0!==_a?_a:0})).reverse()},tunings={standard:makeTuning("E2 A2 D3 G3 B3 E4"),"rondeña":makeTuning("D2 A2 D3 F#3 B3 E4"),dadgad:makeTuning("D2 A2 D3 G3 A3 D4"),ukelele:makeTuning("G4 C4 E4 A4"),lute:makeTuning("E2 A2 D3 F#3 B3 E4")};function useSound(samples,fretting,tuning,muted){void 0===tuning&&(tuning=tunings.standard);var _a=Object(react__WEBPACK_IMPORTED_MODULE_2__.useState)(!1),loaded=_a[0],setLoaded=_a[1],_b=Object(react__WEBPACK_IMPORTED_MODULE_2__.useState)(),synth=_b[0],setSynth=_b[1],_c=Object(react__WEBPACK_IMPORTED_MODULE_2__.useState)(tuning.map((function(){return!1}))),playing=_c[0],setPlaying=_c[1];Object(react__WEBPACK_IMPORTED_MODULE_2__.useEffect)((function(){if(!muted){var synth_1=new tone__WEBPACK_IMPORTED_MODULE_1__.b(samples,(function(){return setLoaded(!0)})).toMaster();return setSynth(synth_1),function(){synth_1.dispose()}}}),[muted]);var play=function(string,when){var _a;void 0===when&&(when=0);var fret=null!==(_a=fretting[string])&&void 0!==_a?_a:0;loaded&&!muted&&synth&&fret>=0&&(setPlaying((function(playing){return set(playing,string,!0)})),setTimeout((function(){return setPlaying((function(playing){return set(playing,string,!1)}))}),3e3),synth.triggerAttackRelease(Object(tone__WEBPACK_IMPORTED_MODULE_1__.a)(tuning[string]+fret,"midi").toFrequency(),4,Object(tone__WEBPACK_IMPORTED_MODULE_1__.c)()+when))};return{play:play,strum:function(up){lodash_range__WEBPACK_IMPORTED_MODULE_3___default()(tuning.length).forEach((function(i){var string=up?i:tuning.length-i-1;play(string,.05*i)}))},playing:playing}}var useLayoutEffect="undefined"!=typeof window?react__WEBPACK_IMPORTED_MODULE_2__.useLayoutEffect:react__WEBPACK_IMPORTED_MODULE_2__.useEffect,spanishTheme={color:"#333333",nut:{color:"#fffacd"},fret:{color:"#9e6429",separator:{color:"#daa520",shadow:!0},counter:{color:"#606c76"}},string:{color:function(){return"#eeeeee"}},finger:{text:{color:"#606c76"},color:"white"}},guitar=Object(_emotion_core__WEBPACK_IMPORTED_MODULE_0__.a)({fontFamily:"'Roboto', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",position:"relative",boxSizing:"border-box",maxWidth:"100%",overflowY:"auto",whiteSpace:"nowrap",margin:0,padding:0,listStyle:"none","&.lefty":{direction:"rtl"},"*, *::before, *::after":{boxSizing:"border-box"},"ol,li":{margin:0,padding:0,listStyle:"none"}}),sw=function(theme){return"md"===theme.fret.separator.width?.7:.3},strings=Object(_emotion_core__WEBPACK_IMPORTED_MODULE_0__.a)({width:"100%",display:"flex",flexDirection:"column",height:"20em"}),styles={guitar:guitar,fret:function(fret,theme){return Object(_emotion_core__WEBPACK_IMPORTED_MODULE_0__.a)({width:"10em",display:"inline-flex",flexDirection:"row-reverse",position:"relative",borderTopWidth:"0.5em",borderBottomWidth:"2em",borderTopStyle:"solid",borderBottomStyle:"solid",verticalAlign:"top",backgroundColor:0===fret?theme.nut.color:theme.fret.color,borderColor:theme.color,"&.nut":{width:"7em",flexShrink:0,zIndex:1},"&:not(.nut)::before":{content:'""',position:"absolute",top:"0",bottom:"0",width:sw(theme)+"em",backgroundColor:theme.fret.separator.color,borderRight:theme.fret.separator.shadow?"solid "+sw(theme)/2+"em "+color__WEBPACK_IMPORTED_MODULE_6___default()(theme.fret.separator.color).darken(.1):0,borderRadius:theme.fret.separator.radius?"3px":0,display:"inline-block"},".marker":{position:"absolute",left:"0",right:"0",top:"0",bottom:"0",display:"flex",alignItems:"center",justifyContent:"center",".lefty &":{transform:"scale(-1, 1)"}}})},strings:strings,string:function(string,fret,theme){return Object(_emotion_core__WEBPACK_IMPORTED_MODULE_0__.a)({zIndex:1,margin:"0",position:"relative",display:"flex",flexGrow:1,alignItems:"center",justifyContent:"center","&::after":{opacity:-1===fret?.2:1,transition:"opacity ease-in-out 0.1s",content:'""',width:"100%",height:"0.65em",position:"absolute",left:"0",borderBottom:"solid 0.2em "+color__WEBPACK_IMPORTED_MODULE_6___default()(theme.string.color(string)).darken(.35),backgroundColor:theme.string.color(string)},label:{fontSize:"1em",position:"absolute",top:"0",bottom:"0",left:"0",right:"0",display:"flex",alignItems:"center",justifyContent:"center",zIndex:2,margin:0},"&:hover input:not(:disabled):not(:checked) ~ .finger,input:focus:not(:disabled):not(:checked) ~ .finger":{opacity:.5},"input:not(:disabled)":{height:"100%",width:"100%"},"input:not(:disabled),input:not(:disabled) ~ .finger":{cursor:"pointer"},input:{position:"absolute",opacity:0,"&:checked ~ .finger":{opacity:1},"&:focus:not(:disabled) ~ .finger":{boxShadow:"0 0 0 0.2em rgba(66, 153, 225, 0.5)"}}})},finger:function(theme){return Object(_emotion_core__WEBPACK_IMPORTED_MODULE_0__.a)({color:theme.finger.text.color,transition:"opacity ease-in-out 0.1s",background:theme.finger.color,width:"5em",padding:"0",height:3.5/1.5+"em",borderRadius:"20px",borderBottom:"solid 0.2em "+color__WEBPACK_IMPORTED_MODULE_6___default()(theme.finger.color).darken(.35),boxShadow:"0 1px 2px rgba(0, 0, 0, 0.16), 0 1px 2px rgba(0, 0, 0, 0.23)",lineHeight:3.5/1.5+"em",textAlign:"center",fontWeight:"bold",opacity:0,display:"inline-flex",alignItems:"center",justifyContent:"center"})},counter:function(theme){return Object(_emotion_core__WEBPACK_IMPORTED_MODULE_0__.a)({width:"100%",height:"6%",position:"absolute",bottom:"-1.5em",fontWeight:"bold",textAlign:"center",color:theme.fret.counter.color})}};function getRenderFingerSpn(tuning){return function(string,fret){var _a=Object(_tonaljs_note__WEBPACK_IMPORTED_MODULE_4__.b)(Object(_tonaljs_note__WEBPACK_IMPORTED_MODULE_4__.a)(tuning[string]+fret)),letter=_a.letter,acc=_a.acc,oct=_a.oct;return Object(_emotion_core__WEBPACK_IMPORTED_MODULE_0__.b)("span",null,letter,"#"===acc?"♯":"b"===acc?"♭":"",Object(_emotion_core__WEBPACK_IMPORTED_MODULE_0__.b)("sub",null,oct))}}function getRenderFingerRelative(tuning,root){return function(string,fret){return Object(_emotion_core__WEBPACK_IMPORTED_MODULE_0__.b)(react__WEBPACK_IMPORTED_MODULE_2__.Fragment,null,["1","2m","2","3m","3","4","5dim","5","5aug","6","7m","7"][(n=tuning[string]+fret-root,m=12,(m+n%m)%m)]);var n,m}}__webpack_exports__.a=function Guitar(props){var _a=props.strings,strings=void 0===_a?[]:_a,_b=props.frets,frets=void 0===_b?{from:0,amount:22}:_b,_c=props.lefty,lefty=void 0!==_c&&_c,_d=props.center,center=void 0!==_d&&_d,renderFinger=props.renderFinger,_e=props.theme,theme=void 0===_e?spanishTheme:_e,fretsNodeRef=Object(react__WEBPACK_IMPORTED_MODULE_2__.useRef)(null),fretNodesRef=Object(react__WEBPACK_IMPORTED_MODULE_2__.useRef)({});return useLayoutEffect((function(){var fretsNode=fretsNodeRef.current;if(center&&fretsNode){var pressedFrets=strings.filter((function(fret){return fret>0})),minFret=Math.min.apply(Math,pressedFrets),maxFret=Math.max.apply(Math,pressedFrets),toFret=minFret+Math.floor((maxFret-minFret)/2),fretNode=fretNodesRef.current[toFret];fretNode&&(fretsNode.scrollLeft=fretNode.offsetLeft-fretsNode.offsetWidth/2+fretNode.offsetWidth/2)}}),[fretsNodeRef,fretNodesRef,strings,center,lefty]),Object(_emotion_core__WEBPACK_IMPORTED_MODULE_0__.b)("ol",{className:classnames__WEBPACK_IMPORTED_MODULE_5___default()("guitar",{lefty:lefty},props.className),css:styles.guitar,ref:fretsNodeRef},lodash_range__WEBPACK_IMPORTED_MODULE_3___default()(frets.from,frets.from+frets.amount+1).map((function(fret){return Object(_emotion_core__WEBPACK_IMPORTED_MODULE_0__.b)("li",{className:0===fret?"nut":void 0,key:fret,css:styles.fret(fret,theme),ref:function(node){return fretNodesRef.current[fret]=node}},theme.fret.marker&&Object(_emotion_core__WEBPACK_IMPORTED_MODULE_0__.b)("div",{className:"marker"},theme.fret.marker(fret)),Object(_emotion_core__WEBPACK_IMPORTED_MODULE_0__.b)("ol",{className:"strings",css:styles.strings},strings.map((function(currentFret,string){return Object(_emotion_core__WEBPACK_IMPORTED_MODULE_0__.b)("li",{key:string,css:styles.string(string,currentFret,theme),onMouseEnter:function(){var _a;return currentFret>=0&&(null===(_a=props.onPlay)||void 0===_a?void 0:_a.call(props,string))}},Object(_emotion_core__WEBPACK_IMPORTED_MODULE_0__.b)("label",null,Object(_emotion_core__WEBPACK_IMPORTED_MODULE_0__.b)("input",{disabled:!props.onChange,type:"checkbox",checked:currentFret===fret,onChange:function(){var _a;return null===(_a=props.onChange)||void 0===_a?void 0:_a.call(props,set(strings,string,0===fret&&0===strings[string]?-1:strings[string]===fret?0:fret))}}),Object(_emotion_core__WEBPACK_IMPORTED_MODULE_0__.b)("span",{className:"finger",css:styles.finger(theme)},null==renderFinger?void 0:renderFinger(string,fret))))}))),0!==fret&&Object(_emotion_core__WEBPACK_IMPORTED_MODULE_0__.b)("span",{className:"counter",css:styles.counter(theme)},fret))})))}},964:function(module,__webpack_exports__,__webpack_require__){"use strict";var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(2),react__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__),Skull=function(){return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg",{fill:"#feb756",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 131.62 144.09"},react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path",{d:"M41,102.9,43,93.72l4.22.89L45,104.79a41,41,0,0,0,11.9,2.91l-.1-9.51,4.3,0,.1,9.69a42.3,42.3,0,0,0,10.68-1.65L69.85,95.65l4.22-.83,2,10A55.37,55.37,0,0,0,85,100.3L83,90.49l4.23-.83,1.58,8.06c.79-.56,1.59-1.16,2.39-1.78,0-.12,0-.23,0-.34h0c1.82-3.81,3.2-12.22,4.1-16.35,8.07-1.37,17.13-1.59,24-6.58,5-3.6,8.25-9,10.13-14.76C133.24,46.46,132.21,32,125,22.05A54.11,54.11,0,0,0,96.53,1.93C83.88-1.7,70.69.71,57.86,1.76,39.45,3.26,21.61,7.92,9.52,22.85-.55,35.28-3.17,51.82,4.28,66.24A24.65,24.65,0,0,0,15.81,77.15c1.43.68,16.79,4.72,16.75,4q.51,7.92,1,15.83M104.5,27.49a3.73,3.73,0,1,1-3.29,4.13A3.72,3.72,0,0,1,104.5,27.49ZM91.25,24.43A3.73,3.73,0,1,1,88,28.56,3.75,3.75,0,0,1,91.25,24.43Zm-13,5.8A3.73,3.73,0,1,1,75,34.36,3.72,3.72,0,0,1,78.25,30.23ZM57.82,43.73a3.73,3.73,0,1,1-4.13-3.28A3.72,3.72,0,0,1,57.82,43.73ZM48.07,27.36a3.73,3.73,0,1,1-3.29,4.13A3.73,3.73,0,0,1,48.07,27.36ZM34.82,24.3a3.73,3.73,0,1,1-3.28,4.13A3.73,3.73,0,0,1,34.82,24.3Zm-13,5.79a3.73,3.73,0,1,1-3.29,4.14A3.74,3.74,0,0,1,21.82,30.09ZM15.67,47.86a3.73,3.73,0,1,1,4.13,3.29A3.72,3.72,0,0,1,15.67,47.86Zm10,15.91A3.73,3.73,0,1,1,29,59.64,3.72,3.72,0,0,1,25.67,63.77Zm13.2,3.4A3.73,3.73,0,1,1,42.15,63,3.75,3.75,0,0,1,38.87,67.17Zm-.72-9.31A12.49,12.49,0,1,1,49.13,44,12.48,12.48,0,0,1,38.15,57.86Zm10-.46a3.73,3.73,0,1,1,4.14,3.28A3.73,3.73,0,0,1,48.19,57.4ZM73.81,87.21c-2.89,1.16-4.94.83-6.22-.48s-3.41-5.8-3.41-5.8S62.27,85.4,61,86.71s-3.34,1.64-6.23.48S52,81.3,53,78.87c1.18-3,3.52-5.29,5.43-7.77s3.87-4.94,5.85-7.37V63.6l0,.06,0-.07v.14c1.77,2.19,3.51,4.4,5.24,6.62,2.16,2.8,5.07,5.41,6.21,8.84C76.61,81.59,76.64,86.08,73.81,87.21ZM72.1,48a3.73,3.73,0,1,1,4.13,3.28A3.74,3.74,0,0,1,72.1,48Zm10,15.91a3.73,3.73,0,1,1,3.28-4.14A3.75,3.75,0,0,1,82.11,63.91ZM95.3,67.3a3.73,3.73,0,1,1,3.28-4.13A3.73,3.73,0,0,1,95.3,67.3ZM94.58,58a12.49,12.49,0,1,1,11-13.83A12.48,12.48,0,0,1,94.58,58Zm14.18,2.83A3.73,3.73,0,1,1,112,56.68,3.73,3.73,0,0,1,108.76,60.82ZM111,48a3.73,3.73,0,1,1,3.29-4.14A3.73,3.73,0,0,1,111,48Z"}),react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path",{d:"M91.2,109.5l-4.22.83-1-5.23a57.09,57.09,0,0,1-9,4.25L78,114.66l-4.23.83-.94-4.82a46.33,46.33,0,0,1-7,1.38c-1.53.17-3,.25-4.46.28l.06,6.17-4.3,0L57,112.18a46.38,46.38,0,0,1-12.87-3L43,114.88,38.75,114l1.39-6.55A48.28,48.28,0,0,1,32.79,103l-2,14.13c-.63,9,2.43,18.33,10.62,22.88,6.63,3.69,14.73,4.39,22.17,4,1.56-.07,3.12-.2,4.67-.39a27.49,27.49,0,0,0,19.59-12.15c4-6,4.43-13.07,4-20.05-.19-3.23-.52-6.45-.67-9.69-.44.31-.89.64-1.33.93Z"}))},coco={color:"#333333",nut:{color:"#FEB756"},fret:{color:"#fefaf2",separator:{color:"#FEB756",radius:!0,shadow:!0,width:"md"},counter:{color:"#606c76"},marker:function(fret){return 3===fret?react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div",{style:{width:"7em",transform:"rotate(-90deg)"}},react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Skull,null)):[3,5,7,9,12,15,17,19,21].includes(fret)?react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div",{style:{backgroundColor:"#FEB756",height:"3em",width:"3em",transform:[7,12].includes(fret)?"rotate(45deg) skew(15deg, 15deg)":void 0,borderRadius:[3,7,12].includes(fret)?void 0:"100%"}}):null}},string:{color:function(){return"#f3f3f3"}},finger:{color:"white",text:{color:"#606c76"}}};__webpack_exports__.a=coco},965:function(module,__webpack_exports__,__webpack_require__){"use strict";var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(2),react__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__),dark={color:"#222831",nut:{color:"#222831"},fret:{color:"#393e46",separator:{color:"#eeeeee",shadow:!0},marker:function(fret){return[3,5,7,9,12,15,17,19,21].includes(fret)?react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span",{style:{width:"1em",height:"1em",borderRadius:"100%",backgroundColor:"#eeeeee"}}):null},counter:{color:"#606c76"}},string:{color:function(){return"#f3f3f3"}},finger:{color:"white",text:{color:"#606c76"}}};__webpack_exports__.a=dark},977:function(module,exports,__webpack_require__){__webpack_require__(978),__webpack_require__(1128),module.exports=__webpack_require__(1129)}},[[977,1,2]]]);
//# sourceMappingURL=main.956fcf46017449b59225.bundle.js.map