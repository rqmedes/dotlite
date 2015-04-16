var doT =  (function() {
	"use strict";
	function u(code) {
		return code.replace(/\\('|\\)/g, "$1").replace(/[\r\t\n]/g, " ");
	}
	return {
        template : function(t) {
           var str = ("var out='" + t.replace(/(^|\r|\n)\t* +| +\t*(\r|\n|$)/g," ")
                .replace(/\r|\n|\t|\/\*[\s\S]*?\*\//g,"")
                .replace(/'|\\/g, "\\$&")
                .replace(/\{\{=([\s\S]+?)\}\}/g, function(m, code) {
                    return "'+(" + u(code) + ")+'";
                })
                .replace(/\{\{([\s\S]+?(\}?)+)\}\}/g, function(m, code) {
                    return "';" + u(code) + "out+='";
                })
                + "';return out;")
                .replace(/\n/g, "\\n").replace(/\t/g, '\\t').replace(/\r/g, "\\r")
                .replace(/(\s|;|\}|^|\{)out\+='';/g, '$1').replace(/\+''/g, "");
           return new Function('data', str);
        }
    };
}());
