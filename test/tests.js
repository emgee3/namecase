var assert = require('assert');
var nc = require('../namecase');

describe('NameCase.checkName()', function () {
  it('should see if case fixes are necessary', function () {
    assert.equal(true,  nc.checkName('GEORGE WASHINGTON'));
    assert.equal(true,  nc.checkName('george washington'));
    assert.equal(false, nc.checkName('George Washington'));
  });
});


describe('Input Types', function () {
  it('should handle strings or arrays', function () {
    assert.equal('George Washington', nc('GEORGE WASHINGTON'));
    assert.deepEqual(
         ['George Washington', 'Thomas Jefferson'],
      nc(['George Washington', 'Thomas Jefferson'])
    );
  });
});


describe('NameCase', function () {
  it('should handle basic capitalization', function () {
    assert.equal('George Washington', nc('GEORGE WASHINGTON'));
    assert.equal('George Washington', nc('george washington'));
    assert.equal('George Washington', nc('gEoRgE wAsHiNgToN'));
  });
});


// Names from http://cpansearch.perl.org/src/SUMMER/Lingua-EN-NameCase-1.15/t/namecase.t
var individualFields = [
  "Keith",            "Leigh-Williams",       "McCarthy",
  "O'Callaghan",      "St. John",             "von Streit",
  "van Dyke",         "Van",                  "ap Llwyd Dafydd",
  "al Fahd",          "Al",                   "el Grecco",
  "ben Gurion",       "Ben",                  "da Vinci",
  "di Caprio",        "du Pont",              "de Legate",
  "del Crond",        "der Sind",             "van der Post",
  "von Trapp",        "la Poisson",           "le Figaro",
  "Mack Knife",       "Dougal MacDonald",
  // Mac exceptions
  "Machin",           "Machlin",              "Machar",
  "Mackle",           "Macklin",              "Mackie",
  "Macquarie",        "Machado",              "Macevicius",
  "Maciulis",         "Macias",               "MacMurdo",
  "Mackrell",         "Maclin",               "McConnachie",
  // Roman numerals
  "Henry VIII",       "Louis III",            "Louis XIV",
  "Charles II"
];

describe('NameCase on individual fields', function () {
  it('should handle list of names', function () {
    for (var i = 0; i < individualFields.length; i++) {
      assert.equal(individualFields[i], nc(individualFields[i], { individualFields : true }));
    }
  });
});


// thanks to http://en.wikipedia.org/wiki/List_of_programmers
var combinedFields = [
  "Michael Abrash",         "Scott Adams",            "Leonard Adleman",          "Alfred Aho",
  "JJ Allaire",
  "Andrei Alexandrescu",    "Paul Allen",             "Eric Allman",              "Marc Andreessen",
  "Bill Atkinson",          "John Backus",            "Richard Bartle",           "Brian Behlendorf",
  "Kent Beck",              "Donald Becker",          "Doug Bell",                "Fabrice Bellard",
  "Tim Berners-Lee",        "Daniel J. Bernstein",    "Sabeer Bhatia",            "Eric Bina",
  "Marc Blank",             "Joshua Bloch",           "Grady Booch",              "Bert Bos",
  "Stephen Richard Bourne", "David Bradley",          "Andrew Braybrook",         "Lawrence M. Breed",
  "Jack E. Bresenham",      "Dan Bricklin",           "Walter Bright",            "Richard Brodie",
  "Andries Brouwer",        "Danielle Bunten Berry",  "Dries Buytaert",           "Steve Capps",
  "John D. Carmack",        "Vinton Cerf",            "Ward Christensen",         "Edgar F. Codd",
  "Bram Cohen",             "Alain Colmerauer",       "Alan Cooper",              "Alan Cox",
  "Brad Cox",               "Mike Cowlishaw",         "Mark Crispin",             "Ward Cunningham",
  "William Crowther",       "Dave Cutler",            "Ole-Johan Dahl",           "James Duncan Davidson",
  "L. Peter Deutsch",       "Edsger Dijkstra",        "Matt Dillon",              "Jack Dorsey",
  "Martin Dougiamas",       "Adam Dunkels",           "Les Earnest",              "Brendan Eich",
  "Larry Ellison",          "Marc Ewing",             "Dan Farmer",               "Stuart Feldman",
  "David Filo",             "Brad Fitzpatrick",       "Andrew Fluegelman",        "Brian Fox",
  "Martin Fowler",          "Jim Fruchterman",        "Elon Gasper",              "Bill Gates",
  "Steve Gibson",           "John Gilmore",           "Adele Goldberg",           "Ryan C. Gordon",
  "James Gosling",          "Bill Gosper",            "Andrew Gower",             "Paul Gower",
  "Paul Graham",            "John Graham-Cumming",    "Ralph Griswold",           "Richard Greenblatt",
  "Scott Guthrie",          "Andi Gutmans",           "Jim Hall",                 "David Heinemeier Hansson",
  "David Albert Huffman",   "Rebecca Heineman",       "Anders Hejlsberg",         "Ted Henter",
  "Andy Hertzfeld",         "Rich Hickey",            "D. Richard Hipp",          "C. A. R. Hoare",
  "James Holmes",           "Grace Hopper",           "Dave Hyatt",               "Miguel de Icaza",
  "Roberto Ierusalimschy",  "Dan Ingalls",            "Geir Ivarsøy",
  "Kenneth E. Iverson",     "Toru Iwatani",           "Bo Jangeborg",             "Paul Jardetzky",
  "Lynne Jolitz",           "William Jolitz",         "Stephen C. Johnson",       "Bill Joy",
  "Robert K. Jung",         "Poul-Henning Kamp",      "Mitch Kapor",              "Phil Katz",
  "Alan Kay",               "Mel Kaye",               "John George Kemeny",       "Stan Kelly-Bootle",
  "Brian Kernighan",        "Gary Kildall",           "Tom Knight",               "Jim Knopf",
  "Donald E. Knuth",        "Andrew Koenig",
  /* "Andre LaMothe", Combined La names are an issue */
  "Tom Lane",               "Leslie Lamport",         "Butler Lampson",           "Sam Lantinga",
  "Richard H. Lathwell",    "Chris Lattner",          "Samuel J Leffler",         "Rasmus Lerdorf",
  "Michael Lesk",           "Gordon Letwin",          "Rockford Lhotka",          "Håkon Wium Lie",
  "Robert Love",            "Ada Lovelace",           "Al Lowe",                  "Raphael Manfredi",
  "Khaled Mardam-Bey",      "Yukihiro Matsumoto",     "John McCarthy",            "Craig McClanahan",
  "Daniel D. McCracken",    "Douglas McIlroy",        "Shawn McKenzie",           "Marshall Kirk McKusick",
  "Bertrand Meyer",         "Scott Meyers",           "Bob Miner",                "Jeff Minter",
  "Lou Montulli",           "Bram Moolenaar",         "David Moon",               "Charles H. Moore",
  "Roger Moore",            "Mike Muuss",             "Patrick Naughton",         "Peter Naur",
  "Fredrik Neij",           "Graham Nelson",          "Peter Norton",             "Kristen Nygaard",
  "Ed Oates",               "Martin Odersky",         "Jarkko Oikarinen",         "Oliver Twins",
  "John Ousterhout",        "Onel de Guzman",         "Larry Page",               "Alexey Pajitnov",
  "Seymour Papert",         "Tim Paterson",           "Markus Persson",           "Jeffrey Peterson",
  "Charles Petzold",        "Rob Pike",               "Kent Pitman",              "Theo de Raadt",
  "Jef Raskin",             "Eric S. Raymond",        "Hans Reiser",              "John Resig",
  "Craig Reynolds",         "Dennis Ritchie",         "Ron Rivest",               "John Romero",
  "Blake Ross",             "Guido van Rossum",       "Jeff Rulifson",            "Rusty Russell",
  "Steve Russell",          "Mark Russinovich",       "Bob Sabiston",             "Muni Sakya",
  "Carl Sassenrath",        "Chris Sawyer",           "Bill Schelter",            "Randal L. Schwartz",
  "Adi Shamir",             "Mike Shaver",            "Cliff Shaw",               "Zed Shaw",
  "Emily Short",            "Jacek Sieka",            "Ken Silverman",            "Charles Simonyi",
  "Colin Simpson",          "Rich Skrenta",           "Matthew Smith",            "Henry Spencer",
  "Joel Spolsky",           "Quentin Stafford-Fraser","Richard Stallman",         "Guy Steele",
  "Alexander Stepanov",     "Ludvig Strigeus",        "Bjarne Stroustrup",        "Zeev Suraski",
  "Gerald Jay Sussman",     "Herb Sutter",            "Gottfrid Svartholm",       "Tim Sweeney",
  "Andrew S. Tanenbaum",    "Audrey Tang",            "Simon Tatham",             "Larry Tesler",
  "Jon Stephenson von Tetzchner",                     "Avie Tevanian",            "Ken Thompson",
  "Michael Tiemann",        "Linus Torvalds",         "Andrew Tridgell",          "Roy Trubshaw",
  "Bob Truel",              "Wietse Venema",          "Pat Villani",              "Paul Vixie",
  "Patrick Volkerding",     "Larry Wall",             "Bob Wallace",              "John Walker",
  "John Warnock",           "Joseph Weizenbaum",      "Robert Watson",            "Pei-Yuan Wei",
  "Peter J. Weinberger",    "Andrew Welch",           "David Wheeler",            "Arthur Whitney",
  "Bruce Wilcox",           "Evan Williams",          "Roberta Williams",         "Sophie Wilson",
  "Dave Winer",             "Niklaus Wirth",          "Stephen Wolfram",          "Don Woods",
  "Steve Wozniak",          "Will Wright",            "Jerry Yang",               "Victor Yngve",
  "Jamie Zawinski",         "Philip Zimmermann",      "Mark Zuckerberg"
];

describe('NameCase on combined fields', function () {
  it('should handle list of names', function () {
    for (var i = 0; i < combinedFields.length; i++) {
      assert.equal(combinedFields[i], nc(combinedFields[i]));
    }
  });
});
