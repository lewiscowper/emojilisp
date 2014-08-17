module.exports = (function() {
	function defun(context, AST) {
		if (AST.contents.length !== 3) 
			throw new Error("You need exaclty three elements in a list to define function");
		if (AST.contents[0].type!="Identifier")
			throw new Error("First argument should be identifier");

		var Func = { 
			"type": "function",
			"args": AST.contents[1], 
			"body": AST.contents[2]};

		context.functions[AST.contents[0].name] = Func;
		return Func;
	}

	function lambda(context, AST) {
		if (AST.contents.length !== 2)
			throw new Error("You need exaclty two elements in a list to define lambda");

		return { 
			"type": "function",
			"args": AST.contents[0], 
			"body": AST.contents[1]};
	}

	function list(context, AST) {
		return AST;
	}

	function quote(context, AST) {
		return AST;		
	}

	function eval(context, AST) {
		return context.execute(AST);
	}

	function iff(context, AST) {
		if (AST.contents.length !== 3) 
			throw new Error("You need exaclty three elements (condition, then, else)");
		if (context.execute(AST.contents[0]))
			return context.execute(AST.contents[1]);
		else
			return context.execute(AST.contents[2]);
	}

	function orr(context, AST) {
		for (var i=0;i<AST.contents.length; i++) {
			if (context.execute(AST.contents[i])) return true;
		}
		return false;
	}

	function equals(context, AST) {
		if (AST.contents.length < 1) return true;
		var val = context.execute(AST.contents[0]);
		for (var i=1;i<AST.contents.length; i++) {
			if (context.execute(AST.contents[i])!== val) return false;
		}
		return true;
	}

	function morethan(context, AST) {
		if (AST.contents.length !== 2)
			throw new Error("You need exaclty two elements to compare");
		return (context.execute(AST.contents[0])>context.execute(AST.contents[1]));
	}

	function lessthan(context, AST) {
		if (AST.contents.length !== 2)
			throw new Error("You need exaclty two elements to compare");
		return (context.execute(AST.contents[0])<context.execute(AST.contents[1]));
	}

	function minus(context, AST) {
		if (AST.contents.length !== 2)
			throw new Error("You need exaclty two elements for minus");
		return (context.execute(AST.contents[0])-context.execute(AST.contents[1]));
	}

	function plus(context, AST) {
		if (AST.contents.length !== 2)
			throw new Error("You need exaclty two elements for plus");
		return (context.execute(AST.contents[0])+context.execute(AST.contents[1]));
	}

	function car(context, AST) {
		if (AST.contents.length < 1)
			throw new Error("You need at least one element for car");
		return context.execute(AST.contents[0]);
	}

	function cdr(context, AST) {
		if (AST.contents.length < 1)
			throw new Error("You need at least one element for cdr");
		return context.execute(AST.contents[AST.contents.length]);
	}

	return {
		"functions":{
			"defun": defun,
			"lambda": lambda,
			"list": list,
			"quote": quote,
			"eval": eval,
			"if": iff,
			"or": orr,
			"equals": equals,
			"morethan": morethan,
			"lessthan": lessthan,
			"minus": minus,
			"plus": plus,
			"car": car,
			"cdr": cdr
		}}
	};
})();