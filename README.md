Emojilisp
========

Javascript interpreter generator for emojilisp

works in browser and node.js environment, demo is available at http://emojilisp.com

to setup nodejs version use "make setup"

to run emoji lisp interactive run "make run"
to run particular emojilisp program "make run examples/something.eli"

to run tests "make test"

currently lex parser (generated by pegjs) is kept in this repository, it's not good to keep generated files, I know, but otherwise it became unusable right after clone procedure

to rebuild lex and examples run "make rebuild"

## Support

Please report an issue on github.
