# NameCase

A Javascript library for fixing the capitalization of people's names.

It is heavily based on the Perl [Lingua-EN-NameCase](http://cpansearch.perl.org/src/SUMMER/Lingua-EN-NameCase-1.15/) module.

It's always best to let the user capitalize their own name as there are too many variations to programmatically catch 
them all. However, when working with legacy databases, sometimes such a module is needed.

## Usage

NameCase provides three functions:

```NameCase.checkName()``` which returns true if the name is in all ```UPPERCASE``` or ```lowercase```.

```NameCase.singleField()``` which returns a properly capitalized name and works best on single name fields, specifially, 
your application stores first and last names in separate fields, this is the preferred method to use. 

```NameCase.combinedField()``` returns a properly capitalized name when a person's entire name is combined into the same field. 
It is the same as NameCase.singleField(), with the exception that it always capitalizes the first character in the name. 


## Examples

### Browser

```
<script source="namecase.js"></script>

<script>

  var name = "GEORGE WASHINGTON";

  if (NameCase.checkName(name)) {
    document.write(
      NameCase.combinedField(name)
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
    return nc.singleField(name);
  }
}

console.log("WILLIAM".toNameCase());
console.log("MCKINLEY".toNameCase());

```

