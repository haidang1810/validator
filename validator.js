function validator(formSelector,options){
    var formElement = document.querySelector(formSelector);
    var formRules = {};
    var validatorRules = {
        required: function(value){
            return value ? undefined : '* Vui lòng nhập trường này';
        },
        email: function(value){
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : '* Vui lòng nhập email';
        },
        min: function(min){
            return function(value){
                return value.length >= min ? undefined : `* Vui lòng nhập ít nhất ${min} ký tự`;
            }
        },
        max: function(max){
            return function(value){
                return value.length <= max ? undefined : `* Vui lòng nhập nhiều nhất ${max} ký tự`;
            }
        }
    };
    function getParent(element, selector){
        while(element.parentElement){
            if(element.parentElement.matches(selector))
                return element.parentElement;
            element = element.parentElement;
        }
    }
    if(formElement){
        var inputs = formElement.querySelectorAll('[name][rules]');
        for(var input of inputs){
            var rules = input.getAttribute('rules').split('|');
            for(rule of rules){
                var ruleInfo;
                var isRuleHasValue = rule.includes(':');
                if(isRuleHasValue){
                    ruleInfo = rule.split(':');
                    rule = ruleInfo[0];
                }
                var ruleFunc = validatorRules[rule];
                if(isRuleHasValue){
                    ruleFunc = ruleFunc(ruleInfo[1]);
                }
                if(Array.isArray(formRules[input.name])){
                    formRules[input.name].push(ruleFunc);
                }else{
                    formRules[input.name] = [ruleFunc];
                }
            }
            input.onblur = handleValidate;
            input.oninput = handleClearError;
        }
        function handleValidate(event){
            var rules = formRules[event.target.name];
            var errorMessage;
            for(var rule of rules){
                errorMessage = rule(event.target.value)
                if(errorMessage)
                    break;
            }
            if(errorMessage){
                var formGroup = getParent(event.target,options.formGroup);
                if(formGroup){
                    var formMessage = formGroup.querySelector(options.formMessage);
                    if(formMessage){
                        formMessage.innerText = errorMessage;
                    }
                }
            }
            return !errorMessage;
        }
        function handleClearError(event){
            var formGroup = getParent(event.target,options.formGroup);
            var formMessage = formGroup.querySelector(options.formMessage);
            formMessage.innerText = "";
        }
        formElement.onsubmit = function(event){
            event.preventDefault();
            var inputs = formElement.querySelectorAll('[name][rules]');
            var isValid = true;
            for(var input of inputs){
                if(!handleValidate({ target: input }))
                    isValid = false;
            }
            if(isValid){
                if(typeof (options.onSubmit) ==='function'){
                    options.onSubmit();
                }else{
                    formElement.submit();
                }
                
            }
        }
    }
}

