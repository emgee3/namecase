# NameCase

A Javascript library for fixing the capitalization of people's names.

It is heavily based on the Perl [Lingua-EN-NameCase](http://cpansearch.perl.org/src/SUMMER/Lingua-EN-NameCase-1.15/) module.

It's always best to let the user capitalize their own name as there are too many variations to programmatically catch 
them all. However, when working with legacy databases, sometimes such a module is needed.

## Usage

NameCase provides two functions:

```NameCase.checkName()``` which returns true if the name is in all ```UPPERCASE``` or ```lowercase```.

```NameCase(string or array, { individualFields : boolean })``` returns a properly capitalized name.

The option ```individualFields``` defaults to false which works best when the person's names are combined 
into a single field. If ```individualFields``` is set to true, it means you're passing in given and surnames 
separately. The only difference between these two options is with ```individualFields``` set to false, 
the first character is always capitalized.

Namecase can also be executed from the command line via ```namecase```, which accepts data from stdin and outputs the formatted names to stdout. 


## Examples

### Browser

```
<script source="namecase.js"></script>

<script>

  var name = "GEORGE WASHINGTON";

  if (NameCase.checkName(name)) {
    document.write(
      NameCase(name)
    );
  } else {
    document.write(name);
  }

</script>

```

### Node

```
var nc = require('namecase');

String.prototype.toNameCase = function () {
  var name = this.toString();

  if (nc.checkName(name)) {
    return nc(name, { individualFields : true } );
  }
}

console.log("WILLIAM".toNameCase());
console.log("MCKINLEY".toNameCase());

```

### Command line

Install with ```npm install -g namecase```.

```
namecase < input.txt > ouput.txt
```

### Meteor Integration

NameCase also includes [Meteor](http://meteor.com) integration. The `NameCase` function is available
on the Client and Server and comes with a Template helper entitled `NameCase`.

```
<template name="templateName">
  {{ NameCase "abe lincoln" optionalNamecaseOptionsHelper }}
</template>
```

```
Template.templateName.helpers({
  optionalNamecaseOptionsHelper : function () {
    return { individualFields : true };
  }
});
```

[![Build Status](https://travis-ci.org/emgee3/namecase.png)](https://travis-ci.org/emgee3/namecase)
