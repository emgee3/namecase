(function() {
  var namecase = function (input, opt) {
    var output = [];

    if (isArray(input)) {
      return input.map(function (i) {
        return namecase(i);
      });
    }

    if (typeof input === "string") {
      return nc(input, opt);
    }

    return input;
  };


  // Don't change capitalization unless capitalization isn't set
  namecase.checkName = function (name) {
    return name === name.toLowerCase() || name === name.toUpperCase();
  };


  // Strip out extraneous spaces
  namecase.normalize = function (name) {
    return name.replace(/\s{2,}/g, ' ');
  };


  // Actual case fixing function
  var nc = function (el, opt) {
    opt = opt || {};

    el = el
      .trim()
      .toLowerCase();

    // Split names on regex whitespace, dash or apostrophe, workaround for
    // Javascript regex word boundary \b splitting on unicode characters
    // http://stackoverflow.com/questions/5311618/javascript-regular-expression-problem-with-b-and-international-characters
    var splitters = [
      { s : /\s/, r : " "},
      { s : /\-/, r : "-"},
      { s : /\'/, r : "'"},
      { s : /\"/, r : '"'},
      { s : /\(/, r : "("},
      { s : /\./, r : "."},
      { s : /,/,  r : ","}
    ];

    for (var i = 0; i < splitters.length; i++) {
      var elArr = el.split(splitters[i].s);
      for (var j = 0; j < elArr.length; j++) {
        elArr[j] = elArr[j].charAt(0).toUpperCase() + elArr[j].slice(1);
      }
      el = elArr.join(splitters[i].r);
    }


    // Name case Mcs and Macs
    // Exclude names with 1-2 letters after prefix like Mack, Macky, Mace
    // Exclude names ending in a,c,i,o, or j are typically Polish or Italian
    if (new RegExp(/\bMac[A-Za-z]{2,}[^aciozj]\b/).test(el) ||
        new RegExp(/\bMc/).test(el)) {

      el = el.replace(
        /\b(Ma?c)([A-Za-z]+)/,
        function (x,y,z) {
          return y + z.charAt(0).toUpperCase() + z.substring(1);
        });

      // Now correct for "Mac" exceptions
      el =  el
        .replace(/\bMacEvicius\b/,  "Macevicius")
        .replace(/\bMacHado\b/,     "Machado")
        .replace(/\bMacHar\b/,      "Machar")
        .replace(/\bMacHin\b/,      "Machin")
        .replace(/\bMacHlin\b/,     "Machlin")
        .replace(/\bMacIas\b/,      "Macias")
        .replace(/\bMacIulis\b/,    "Maciulis")
        .replace(/\bMacKie\b/,      "Mackie")
        .replace(/\bMacKle\b/,      "Mackle")
        .replace(/\bMacKlin\b/,     "Macklin")
        .replace(/\bMacQuarie\b/,   "Macquarie")
        .replace(/\bMacOmber\b/,    "Macomber")
        .replace(/\bMacIn\b/,       "Macin")
        .replace(/\bMacKintosh\b/,  "Mackintosh")
        .replace(/\bMacKen\b/,      "Macken")
        .replace(/\bMacHen\b/,      "Machen")
        .replace(/\bMacHiel\b/,     "Machiel")
        .replace(/\bMacIol\b/,      "Maciol")
        .replace(/\bMacKell\b/,     "Mackell")
        .replace(/\bMacKlem\b/,     "Macklem")
        .replace(/\bMacKrell\b/,    "Mackrell")
        .replace(/\bMacLin\b/,      "Maclin")
        .replace(/\bMacKey\b/,      "Mackey")
        .replace(/\bMacKley\b/,     "Mackley")
        .replace(/\bMacHell\b/,     "Machell")
        .replace(/\bMacHon\b/,      "Machon")
        .replace(/\bMacAyla\b/,     "Macayla");
    }


    // And correct Mac exceptions otherwise missed
    el = el
      .replace(/\bMacmurdo/,        "MacMurdo")
      .replace(/\bMacisaac/,        "MacIsaac")


    // Fixes for "son (daughter) of" etc. in various languages.
      .replace(/\bAl(?=\s+\w)\b/g,  "al")     // al Arabic or forename Al.
      .replace(/\bAp\b/g,           "ap")     // ap Welsh.
      .replace(/\bBen(?=\s+\w)\b/g, "ben")    // ben Hebrew or forename Ben.
      .replace(/\bDell([ae])\b/g,   "dell$1") // della and delle Italian.
      .replace(/\bD([aeiu])\b/g,    "d$1")    // da, de, di Italian; du French.
      .replace(/\bDe([lr])\b/g,     "de$1")   // del Italian; der Dutch/Flemish.
      .replace(/\bEl\b/g,           "el")     // el Greek
      .replace(/\bLa\b/g,           "la")     // la French
      .replace(/\bLe(?=\s+\w)\b/g,  "le")     // le French
      .replace(/\bLo\b/g,           "lo")     // lo Italian
      .replace(/\bVan(?=\s+\w)\b/g, "van")    // van German or forename Van.
      .replace(/\bVon\b/g,          "von")    // von Dutch/Flemish


    // Fixes for roman numeral names, e.g. Henry VIII
      .replace(/\b(?:\d{4}|(?:[IVX])(?:X{0,3}I{0,3}|X{0,2}VI{0,3}|X{0,2}I?[VX]))$/i,
        function (v) {
          return v.toUpperCase();
        })


    // Nation of Islam 2X, 3X, etc. names
      .replace(/\b[0-9](x)\b/, function (v) { return v.toUpperCase(); } )


    // Somewhat arbitrary rule where two letter combos not containing vowels should be capitalized
    // fixes /JJ Abrams/ and /JD Salinger/
    // With some exceptions
      .replace(/\b[bcdfghjklmnpqrstvwxzBCDFGHJKLMNPQRSTVWXZ]{2}\s/, function (v) { return v.toUpperCase(); } )
      .replace(/\bMR\.?\b/,         "Mr")
      .replace(/\bMS\.?\b/,         "Ms")
      .replace(/\bDR\.?\b/,         "Dr")
      .replace(/\bST\.?\b/,         "St")
      .replace(/\bJR\.?\b/,         "Jr")
      .replace(/\bSR\.?\b/,         "Sr")
      .replace(/\bLT\.?\b/,         "Lt")


    // lowercase words
      .replace(/\bThe\b/g,          "the")
      .replace(/\bOf\b/g,           "of")
      .replace(/\bAnd\b/g,          "and")
      .replace(/\bY\s/g,            "y")


    // strip extra spaces
      .replace(/\s{2,}/g,           ' ');


    // check if we should force the first character to caps
    if (opt.hasOwnProperty('individualFields') && opt.individualFields === true) {
      // first character may be lowercase
      return el;
    }

    // force first character to be uppercase
    return el.charAt(0).toUpperCase() + el.substring(1);
  };


  if (typeof module !== 'undefined' && module && module.exports) {
    module.exports = namecase;
  } else {
    NameCase = namecase;
  }
}).call(this);

//polyfills just in case
var toString = {}.toString;

var isArray = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

[].map||(Array.prototype.map=function(a){for(var b=this,c=b.length,d=[],e=0,f;e<b;)d[e]=e in b?a.call(arguments[1],b[e],e++,b):f;return d})
