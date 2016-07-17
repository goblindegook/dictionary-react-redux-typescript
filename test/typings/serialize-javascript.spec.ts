import serialize = require("serialize-javascript");

serialize(undefined); // => 'undefined'
serialize(null); // => 'null'
serialize(NaN); // => 'null'
serialize(Infinity); // => 'null'

serialize(""); // => '""'
serialize("foo"); // => '"foo"'

serialize(-1); // => '-1'
serialize(0); // => '0'
serialize(1); // => '1'

serialize([]); // => '[]'
serialize(["1", "2", "3"]); // => '["1","2","3""]'
serialize([1, 2, 3]); // => '[1,2,3]'

serialize({}); // => '{}'
serialize({foo: "0"}); // => '{"foo":"0"}'
serialize({foo: 0}); // => '{"foo":0}'
