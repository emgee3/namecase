if (Meteor.isClient) {
  Template.registerHelper("NameCase", function () {
    var opts = {}, str;

    var args = Array.prototype.slice.call(arguments);
    args.pop();

    if (typeof args[args.length - 1] === "object") {
      opts = args.pop();
    }

    str = args.join(' ');

    return NameCase.checkName(str) ? NameCase(str, opts) : str;
  });
}
