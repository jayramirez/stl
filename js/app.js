Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};


var CONTOLNO = false;

function SuperLucky(){

	var self = this;
	self.ctrlno = [];
	self.combinations;
	self.bet;
	self.el;

	self.init = function(){
		self.el = {
			ctrlNumberConfirm : $('#ctrlNumberConfirm'),
			ctrlNumberClear : $('#ctrlNumberClear'),
			ctrlNumberValue : $('#ctrlNumberValue'),
			codeHolder : $('.code-holder'),
			combKeypad : $('#combinations'),
			combKeyHolder : $('.keypads .combinations'),
			betKeypad : $('#amount'),
			betKeyHolder : $('.keypads .amount'),
			ctrNoHolder : $('#ctrlNumber'),
			canvas : $('.canvas'),
			okCombinations : $('#okCombinations'),
			okBet : $('#okBet'),
			cancelBet : $('#cancelBet'),
			list : $('.lists ul'),
			viewCtrlno : $('#ctrlidinput'),
			viewComb : $('.selected-combinations'),
			viewBet : $('.selected-amount'),
			reload : $('#closeCurrent'),
			alphaKeys : $('.alpha'),
			numericKeys : $('.numeric')
		}

		self.el.reload.click(function(){
			window.location.reload();
		})

		self.createAlphaNumericKeys();

		$(self.el.ctrlNumberConfirm).click(function(){
			self.el.codeHolder.addClass('hide');
			CONTOLNO = self.ctrlno.join('');
			self.showCombinationKeys();
		
		})

		$(self.el.ctrlNumberClear).click(function(){
				self.el.viewCtrlno.html('');
				self.el.ctrlNumberConfirm.hide();
				self.ctrlno = [];
				CONTOLNO = '';
		})
	}

	self.createAlphaNumericKeys= function(){
		self.el.ctrlNumberConfirm.hide();	
		for (var i = 65; i <= 90; i++) {
			var btn = $('<span class="btnkey">'+String.fromCharCode(i)+'</span>');
			btn.appendTo(self.el.alphaKeys);

				btn.unbind('click').bind('click',function(){
					var el = $(this);

						if(self.ctrlno.length>=9){
							return false;
							//self.ctrlno.shift();
						}
						
						self.ctrlno.push(el.text());
						updateViewCtrlNumber();
				})

		};

		for (var i = 0; i <=9; i++) {
			var btn = $('<span class="btnkey">'+i+'</span>');
			btn.appendTo(self.el.numericKeys);

				btn.unbind('click').bind('click',function(){
					var el = $(this);

						if(self.ctrlno.length>=9){
							return false;
							//self.ctrlno.shift();
						}
						
						self.ctrlno.push(el.text());
						updateViewCtrlNumber();
				})

		};

		function updateViewCtrlNumber(){
			if(self.ctrlno.length==9){
				self.el.ctrlNumberConfirm.show();
			}

			self.el.viewCtrlno.html('');
			$.each(self.ctrlno,function(key, val){
			 	self.el.viewCtrlno.append(val)
			})
		}
	}
	
	self.bindCombination = function(elem,val){
		var el = $(elem);

		if(!el.hasClass('active')){
			if(self.combinations.length>=5){
				return false;
			}
			//el.addClass('active');
			self.combinations.push(val);

		}else{	
			//el.removeClass('active');
			self.combinations.remove(val);
		}

		self.updateViewCombinations();
	}


	self.updateViewCombinations = function(){

			self.el.viewComb.html('');
			$.each(self.combinations,function(key, val){
				self.el.viewComb.append('<span>'+val+'</span>')
			})

			if(self.combinations.length>1){
				self.el.okCombinations.fadeIn(0);
			}else{
				self.el.okCombinations.fadeOut(0)
			}
		}

	self.showCombinationKeys = function(){
		self.el.ctrNoHolder.text(CONTOLNO);
		
		self.el.canvas.fadeIn(0,function(){
			$(this).removeClass('hide');
		})

		self.combinations = [];
		self.bet = [];
		self.el.betKeypad.fadeOut(0,function(){
			self.el.betKeypad.addClass('hide');
			self.el.combKeypad.fadeIn(0,function(){
				self.el.combKeypad.removeClass('hide');
			})
		});

		self.el.combKeyHolder.children('span').remove();
		self.el.betKeyHolder.children('span').remove();

		self.el.okCombinations.hide();
		self.el.okBet.hide();	


		for (var i = 38; i > 0; i--) {
			var btn = $('<span class="btnkey" onclick="superLucky.bindCombination(this,'+i+')">'+i+'</span>');
			btn.prependTo(self.el.combKeyHolder);
		};

		self.el.okCombinations.unbind('click').bind('click',function(){
			self.showBetKeys();
		})
	}

	self.resetCombinations = function(){
		self.bet = [];
		self.el.betKeypad.fadeOut(0,function(){
			self.el.betKeypad.addClass('hide');
			self.el.combKeypad.fadeIn(0,function(){
				self.el.combKeypad.removeClass('hide');
			})
		});

		self.el.betKeyHolder.children('span').remove();
		self.el.okBet.hide();
		self.el.viewBet.html('');	
	}

	self.bindBet = function(elem,val){
		var el = $(elem);
		var max = 1;
		if(self.combinations.length==2){
			max = 2;
		}
		if(!el.hasClass('.active')){

			if(self.bet.length>=max){
				return false;
			}
			//el.addClass('active');
			self.bet.push(val);
		}else{	
			//el.removeClass('active');
			self.bet.remove(val);
		}

		self.updateViewBet();
	}


	self.updateViewBet = function(){
			self.el.viewBet.html('');
			$.each(self.bet,function(key, val){
				self.el.viewBet.append('<span>'+val+'</span>')
			})

			if(self.bet.length>0){
				self.el.okBet.fadeIn(0);
			}else{
				self.el.okBet.fadeOut(0)
			}
		}
	self.showBetKeys = function(){
		self.el.combKeypad.fadeOut(0,function(){
			self.el.combKeypad.addClass('hide');
			self.el.betKeypad.fadeIn(0,function(){
				self.el.betKeypad.removeClass('hide');
			})
		});

		var multiplier;

		switch( self.combinations.length ){
			case 2 : multiplier = 1; break;
			case 3 : multiplier = 6; break;
			case 4 : multiplier = 12; break;
			case 5 : multiplier = 20; break;
		}

		for (var i = 30; i > 0; i--) {
			var value = i*multiplier;
			var btn = $('<span  class="btnkey" onclick="superLucky.bindBet(this,'+i+')">'+value+'</span>');
			btn.prependTo(self.el.betKeyHolder);
		};


		self.el.okBet.unbind('click').bind('click',function(){
			self.finish();
		})
		self.el.cancelBet.unbind('click').bind('click',function(){
			self.resetCombinations();
		})

	}

	self.finish = function(){
		var combinations = self.combinations.join('-');
		var bet = self.bet.join(',');
		self.el.list.prepend('<li><span>'+combinations+'</span><span>'+bet+'</span></li>');
		self.showCombinationKeys();
		self.el.viewBet.html('');
		self.el.viewComb.html('');


		$.post('http://192.168.1.100/superlucky/api.php',{
			combinations : combinations,
			amount : bet,
			ctrlno : CONTOLNO

		})
	}
}


var superLucky = new SuperLucky();



$(function(){
	superLucky.init();
})

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}