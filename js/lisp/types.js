(function(window){

	var LAtom = function() {}

	function LNumber(value) {
		
		var self = this;
		self.value = value;
		self.toString = function(){
			if (self.value == undefined) {
				return "NaN";
			} else {
				return "" + self.value;
			}
		}
	}
	LNumber.prototype = new LAtom();

	// Nil
	var nil;
	function LNil() {
		this.type = "Nil";
		if (!nil) nil = this;
		return nil;
	}
	LNil.prototype = new LAtom();
	LNil.prototype.toString = function(){
			return "\'()"		
		}	

	// True
	function LTrue() {}
	LTrue.prototype = new LAtom();
	LTrue.prototype.toString = function(){
			return "#t"		
		}	

	// False
	function LFalse() {}
	LFalse.prototype = new LAtom();
	LFalse.prototype.toString = function(){
			return "#f"		
		}	

	// Procedure
	function LProcedure(name, returnType, func) {
		this.name = name;
		this.returnType = returnType;
		this.func = func;
		this.call = function(args) {
			return new this.returnType(this.func(args));
		}
	}

	LProcedure.prototype = new LAtom();
	LProcedure.prototype.toString = function(){
			return "#<procedure:"+this.name+">";
		};

	// Symbol - these are singletons!
	var symbols = {};
	function LSymbol(val) {
		if (symbols.hasOwnProperty(val)) return symbols[val];		
		this.value = val;
		symbols[val] = this;
	}
	LSymbol.prototype = new LAtom();
	LSymbol.prototype.toString = function(){
			return ""+this.value;
		}	

	// String
	function LString(val) {		
		this.value = val;
	}
	LString.prototype = new LAtom();
	LString.prototype.toString = function(){
			return ""+this.value;
		}	

	// List
	function LList(first, rest) {
		this.type = "List";

		this[0] = first;
		this[1] = rest;

		var self = this;

		this.first = function() {
			return self[0];
		}

		this.rest = function() {
			return self[1];
		}

		this.toString = function(child) {
			if (child) 
				pass
			else
				return "("+self.first()+" . "+self.rest(true)+")";
		}
	}

	if (!window.Lisp) window.Lisp = {};
	window.Lisp.Atom = LAtom;
	window.Lisp.Number = LNumber;
	window.Lisp.Nil = LNil;
	window.Lisp.True = LTrue;
	window.Lisp.False = LFalse;
	window.Lisp.Procedure = LProcedure;
	window.Lisp.Symbol = LSymbol;
	window.Lisp.String = LString;
	window.Lisp.List = LList;

})(window)