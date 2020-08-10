// JavaScript source code
class Options {
    constructor(optionsGiven, appendTo, onselect, name) {
        var selector = document.createElement('select');

        var options = optionsGiven.filter(function (item, pos) {
            return optionsGiven.indexOf(item) == pos;
        });
        options.sort();
        if (options.find(elem => elem == "") == undefined) {
            options.push('');
        }

        this.options = options;
        this.selector = selector;

        for (var option of options) {
            var newOption = document.createElement('option');
            newOption.value = option.replace('_', ' ');
            newOption.innerHTML = option.replace('_',' ');
            selector.appendChild(newOption);
        }

        var label = document.createElement('p');
        label.innerHTML = name + ': ';
        this.label = label;

        appendTo.appendChild(label);
        label.appendChild(selector);
        selector.onchange = onselect;
    }

    get Value() {
        return this.options[this.selector.selectedIndex]
    }

    set Value(value) {
        for (var i in this.selector) {
            if (this.options[i] == value) {
                this.selector.selectedIndex = i;
                return;
            }
        }
    }

    switch(onoff) {
        this.label.hidden = this.selector.hidden = !Boolean(onoff);
    }
}

class OptionsLine {
    constructor(OptionsList, appendTo, optionsNames, bindingWords) {
        var self = this;
        
        
        for (var num in OptionsList) {
            var i = Number(num);
            this['_' + String(i)] = new Options(OptionsList[i], appendTo,
                function () {
                    var j = 1;
                    while (self['_' + String(Number(this.owner.number) + j)] != undefined) {
                        var isNotEmpty = Boolean(self['_' + String(Number(this.owner.number) + j - 1)].Value);
                        var isNotHidden = !Boolean(self['_' + String(Number(this.owner.number) + j - 1)].selector.hidden);
                        self['_' + String(Number(this.owner.number) + j)].switch(
                            isNotEmpty
                            && isNotHidden &&
                            self['_' + String(Number(this.owner.number + 1) + j)] != undefined)
                        j++;
                    }
                    j = 0;
                    self.signature.innerHTML = "";
                    while (self['_' + Number(j+1)] != undefined && self['_' + j].Value)
                    {
                        var bindingWord = Boolean(bindingWords[j]) ? bindingWords[j] : "";
                        self.signature.innerHTML = self.signature.innerHTML + " " + self['_' + j].Value + " " + bindingWord;
                        
                        j++;
                    }

                }, optionsNames[i]);
            this["_" + i].selector.owner = this["_" + i];
            this["_" + i].number = i;
        }

        this.signature = document.createElement('h4');
        this.signature.style.textAlign = 'center';
        appendTo.appendChild(this.signature);
    }

    GetValue(index) {
        return this['_' + String(index)].Value
    }
}


