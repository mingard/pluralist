'usestrict';

var rules = require('./rules').rules;

function stripRegex(regex) {
    return regex.toString().replace(/\//g, "").replace(/\$/g, "").replace(/\^/g, "");
}

function plural(string) {
    var cases = {
        origin: string
    };
    var BreakException= {};

    try {
        rules.forEach(function(rule) {
            var regTest = new RegExp(rule.singular_suffix).test(string);
            if (regTest) {
                if (rule.anglicised_plural) {
                    cases.anglicised_plural = string.replace(rule.singular_suffix, stripRegex(rule.anglicised_plural));
                }
                if (rule.classic_plural) {
                    cases.classic_plural = string.replace(rule.singular_suffix, stripRegex(rule.classic_plural));
                }
               throw BreakException;
           }
        });
    } catch(e) {
        if (e!==BreakException) throw e;
    }
    return cases;
}

//WIP
function singular(string) {
    var cases = {
        origin: string
    };
    var BreakException= {};

    try {
        rules.forEach(function(rule) {
            var regTest = new RegExp(rule.classic_plural).test(string);
            if (regTest) {
                if (rule.singular_suffix) {
                    cases.singular_suffix = string.replace(rule.classic_plural, stripRegex(rule.singular_suffix));
                }
                // throw BreakException;
            }
            
            regTest = new RegExp(rule.anglicised_plural).test(string);
            
            if (regTest) {
                if (rule.singular_suffix) {
                    cases.singular_suffix = string.replace(rule.anglicised_plural, stripRegex(rule.singular_suffix));
                }
                // throw BreakException;
           }
        });
    } catch(e) {
        if (e!==BreakException) throw e;
    }
    return cases;
}

module.exports.plural = plural;
module.exports.singular = singular;