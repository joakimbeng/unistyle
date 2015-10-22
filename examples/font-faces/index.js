export default {
  '@font-face': [
    font('my-web-font', 'webfont'),
    font('my-other-font', 'otherfont')
  ]
};

function font(family, filename) {
  return {
    fontFamily: `"${family}"`,
    src: [
      `url("${filename}.eot")`,
      [
        `url("${filename}.eot?#iefix") format("embedded-opentype")`,
        `url("${filename}.woff2") format("woff2")`,
        `url("${filename}.woff") format("woff")`,
        `url("${filename}.ttf") format("truetype")`,
        `url("${filename}.svg?#svgFontName") format("svg")`
      ].join(', ')
    ]
  };
}
