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
	self.combinations;
	self.bet;
	self.el;

	self.init = function(){
		self.el = {
			ctrlNumberConfirm : $('#ctrlNumberConfirm'),
			ctrlNumberValue : $('#ctrlNumberValue'),
			codeHolder : $('.code-holder'),
			combKeypad : $('#combinations'),
			combKeyHolder : $('.keypads .combinations'),
			betKeypad : $('#amount'),
			betKeyHolder : $('.keypads .amount'),
			ctrNolHolder : $('#ctrlNumber'),
			canvas : $('.canvas'),
			okCombinations : $('#okCombinations'),
			okBet : $('#okBet'),
			cancelBet : $('#cancelBet'),
			list : $('.lists ul'),
			viewComb : $('.selected-combinations'),
			viewBet : $('.selected-amount'),
			reload : $('#closeCurrent')
		}

		self.el.reload.click(function(){
			window.location.reload();
		})

		$(self.el.ctrlNumberConfirm).click(function(){
			if(self.el.ctrlNumberValue.val()==''){
				$('#error', self.el.codeHolder).html('<div>Please enter a control number.</div>');
				$('#error div', self.el.codeHolder).fadeIn(300);
			}else{
				self.el.codeHolder.addClass('hide');
				CONTOLNO = self.el.ctrlNumberValue.val();
				self.showCombinationKeys();
			}
		})
	}

	self.showCombinationKeys = function(){
		self.el.ctrNolHolder.text(CONTOLNO);
		
		self.el.canvas.fadeIn(300,function(){
			$(this).removeClass('hide');
		})

		self.combinations = [];
		self.bet = [];
		self.el.betKeypad.fadeOut(300,function(){
			self.el.betKeypad.addClass('hide');
			self.el.combKeypad.fadeIn(300,function(){
				self.el.combKeypad.removeClass('hide');
			})
		});

		self.el.combKeyHolder.children('span').remove();
		self.el.betKeyHolder.children('span').remove();

		self.el.okCombinations.hide();
		self.el.okBet.hide();	


		for (var i = 30; i > 0; i--) {
			var btn = $('<span><input type="checkbox" value="'+i+'">'+i+'</span>');
			btn.prependTo(self.el.combKeyHolder);

				btn.unbind('click').bind('click',function(){
					var el = $(this);
					var input = $('input',el);

					if(!input.is(':checked')){

						if(self.combinations.length>=5){
							return false;
						}
						input.prop('checked',true);
						el.addClass('active');
						self.combinations.push(input.val());
						console.log(self.combinations,'add')
					}else{	
						input.prop('checked',false);
						el.removeClass('active');
						self.combinations.remove(input.val());
						console.log(self.combinations,'pop')
					}

					updateViewCombinations();

				})

		};

		self.el.okCombinations.unbind('click').bind('click',function(){
			self.showBetKeys();
		})

		function updateViewCombinations(){

			self.el.viewComb.html('');
			$.each(self.combinations,function(key, val){
				self.el.viewComb.append('<span>'+val+'</span>')
			})

			if(self.combinations.length>1){
				self.el.okCombinations.fadeIn();
			}else{
				self.el.okCombinations.fadeOut(300)
			}
		}

	}

	self.resetCombinations = function(){
		self.bet = [];
		self.el.betKeypad.fadeOut(300,function(){
			self.el.betKeypad.addClass('hide');
			self.el.combKeypad.fadeIn(300,function(){
				self.el.combKeypad.removeClass('hide');
			})
		});

		self.el.betKeyHolder.children('span').remove();
		self.el.okBet.hide();
		self.el.viewBet.html('');	
	}

	self.showBetKeys = function(){
		self.el.combKeypad.fadeOut(300,function(){
			self.el.combKeypad.addClass('hide');
			self.el.betKeypad.fadeIn(300,function(){
				self.el.betKeypad.removeClass('hide');
			})
		});

		var multiplier;
		var max = 1;

		switch( self.combinations.length ){
			case 2 : multiplier = 1; max=2; break;
			case 3 : multiplier = 6; break;
			case 4 : multiplier = 12; break;
			case 5 : multiplier = 20; break;
		}

		for (var i = 30; i > 0; i--) {
			var value = i*multiplier;
			var btn = $('<span><input type="checkbox" value="'+value+'">'+value+'</span>');
			btn.prependTo(self.el.betKeyHolder);

				btn.unbind('click').bind('click',function(){
					var el = $(this);
					var input = $('input',el);

					if(!input.is(':checked')){

						if(self.bet.length>=max){
							return false;
						}
						input.prop('checked',true);
						el.addClass('active');
						self.bet.push(input.val());
						console.log(self.bet,'add')
					}else{	
						input.prop('checked',false);
						el.removeClass('active');
						self.bet.remove(input.val());
						console.log(self.bet,'pop')
					}

					updateViewBet();

				})

		};


		self.el.okBet.unbind('click').bind('click',function(){
			self.finish();
		})
		self.el.cancelBet.unbind('click').bind('click',function(){
			self.resetCombinations();
		})

		function updateViewBet(){
			self.el.viewBet.html('');
			$.each(self.bet,function(key, val){
				self.el.viewBet.append('<span>'+val+'</span>')
			})

			if(self.bet.length>0){
				self.el.okBet.fadeIn();
			}else{
				self.el.okBet.fadeOut(300)
			}
		}
	}

	self.finish = function(){
		var combinations = self.combinations.join('-');
		var bet = self.bet.join(',');
		self.el.list.prepend('<li><span>'+combinations+'</span><span>'+bet+'</span></li>');
		self.showCombinationKeys();
		self.el.viewBet.html('');
		self.el.viewComb.html('');
	}
}


var superLucky = new SuperLucky();

$(function(){
	superLucky.init();
	FastClick.attach(document.body);
})