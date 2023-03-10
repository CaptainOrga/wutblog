/*
+--------------------------------------------------------------------------
|   Mblog [#RELEASE_VERSION#]
|   ========================================
|   Copyright (c) 2014, 2015 mtons. All Rights Reserved
|   http://www.mtons.com
|
+---------------------------------------------------------------------------
*/

define(function(require, exports, module) {
    var J = jQuery, _BATH = _MTONS.BASE_PATH;

    var _configs = {
        errorElement: "p",
        errorPlacement: function (error, element) {
            error.addClass("help-block");
            if ( element.prop( "name" ) === "email" ) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        },
        highlight: function (element, errorClass, validClass) {
            J(element).closest("div").addClass("has-error").removeClass("has-success");
        },
        unhighlight: function (element, errorClass, validClass) {
            J(element).closest("div").addClass("has-success").removeClass("has-error");
        }
    };

    var _bind_validate = function (formId, configs) {
        var options = J.extend({}, _configs, configs);

        require.async(['validation', 'validation-additional'], function () {
            J(formId).validate(options);
        });
    };

    var Validate = {
        register: function (formId, sendCodeButtonId) {
            _bind_validate(formId, {
                rules: {
                    username: {
                        required: true,
                        check_username: true
                    },
                    email: {
                        required: true,
                        email: true
                    },
                    code: {
                        required: true
                    },
                    password: {
                        required: true
                    },
                    password2: {
                        required: true,
                        equalTo: "#password"
                    }
                },
                messages: {
                    username: {
                        required: '??????????????????',
                        check_username: '???????????????/??????+??????,?????????5???'
                    },
                    email: {
                        required: '?????????????????????',
                        email: '?????????????????????'
                    },
                    code: {
                        required: '???????????????????????????'
                    },
                    password: {
                        required: '???????????????'
                    },
                    password2: {
                        required: '?????????????????????',
                        equalTo: '??????????????????????????????'
                    }
                }
            });

            J(sendCodeButtonId).click(function () {
                debugger;
                var btn = J(this).button('sending');
                var email = J('input[name=email]').val();
                if (email==''){
                    J('#message').html('<div class="alert alert-success">???????????????????????????</div>');
                    return;
                }
                J.getJSON(_BATH + '/email/send_code', {'email': email, 'type': 3}, function (data) {
                    debugger;
                    if (data.code === 0) {
                        btn.text('????????????');
                        J('#message').html('<div class="alert alert-success">' + data.message + '</div>');
                    } else {
                        J('#message').html('<div class="alert alert-danger">' + data.message + '</div>');
                    }

                    btn.button('reset');
                });
                debugger;
                var time = 60;
                settime($(this));
                function settime(obj){
                    if (time==0) {
                        $(obj).attr('disabled', false);
                        btn.text('????????????');
                        time = 60;
                        return;
                    } else{
                        $(obj).attr('disabled', true);
                        btn.text(time+"??????????????????");
                        time--;
                    }
                    setTimeout(function() {
                        settime(obj)
                    },1000)
                }

            });
        },
        oauthRegister: function (formId) {
            _bind_validate(formId, {
                rules: {
                    username: {
                        required: true,
                        check_username: true
                    }
                },
                messages: {
                    username: {
                        required: '??????????????????',
                        check_username: '???????????????/??????+??????,?????????5???'
                    }
                }
            });
        },
        forgot: function (formId, sendCodeButtonId) {
            J(sendCodeButtonId).click(function () {
                var btn = J(this).button('sending');
                var email = J('input[name=email]').val();
                J.getJSON(_BATH + '/email/send_code', {'email': email, 'type': 2}, function (data) {
                    if (data.code === 0) {
                        btn.text('????????????');
                        J('#message').html('<div class="alert alert-success">' + data.message + '</div>');
                    } else {
                        J('#message').html('<div class="alert alert-danger">' + data.message + '</div>');
                    }

                    btn.button('reset');
                });
            });

            _bind_validate(formId, {
                rules: {
                    email: {
                        required: true,
                        email: true
                    },
                    password: 'required',
                    code: 'required',
                    password2: {
                        required: true,
                        equalTo: "#password"
                    }
                },
                messages: {
                    email: {
                        required: '?????????????????????',
                        email: '?????????????????????'
                    },
                    password: '??????????????????',
                    code: '???????????????????????????',
                    password2: {
                        required: '?????????????????????',
                        equalTo: '??????????????????????????????'
                    }
                }
            });
        },
        updateEmail: function (formId, sendCodeButtonId) {
            _bind_validate(formId, {
                rules: {
                    email: {
                        required: true,
                        email: true
                    },
                    code: {
                        required: true
                    }
                },
                messages: {
                    email: {
                        required: '?????????????????????',
                        email: '?????????????????????'
                    },
                    code: {
                        required: '???????????????????????????'
                    }
                }
            });

            J(sendCodeButtonId).click(function () {
                debugger;
                var btn = J(this).button('sending');
                var email = J('input[name=email]').val();
                if (email==''){
                    J('#message').html('<div class="alert alert-success">???????????????????????????</div>');
                    return;
                }

                var time = 60;
                settime($(this));
                function settime(obj){
                    if (time==0) {
                        $(obj).attr('disabled', false);
                        btn.text('????????????');
                        time = 60;
                        return;
                    } else{
                        $(obj).attr('disabled', true);
                        btn.text(time+"??????????????????");
                        time--;
                    }
                    setTimeout(function() {
                        settime(obj)
                    },1000)
                }
                J.getJSON(_BATH + '/email/send_code', {'email': email, 'type': 1}, function (data) {
                    if (data.code === 0) {
                        btn.text('????????????');
                        J('#message').html('<div class="alert alert-success">' + data.message + '</div>');
                    } else {
                        J('#message').html('<div class="alert alert-danger">' + data.message + '</div>');
                    }
                    btn.button('reset');
                });
            });
        },

        updatePassword: function (formId) {
            _bind_validate(formId, {
                rules: {
                    oldPassword: 'required',
                    password: 'required',
                    password2: {
                        required: true,
                        equalTo: "#password"
                    }
                },
                messages: {
                    oldPassword: '?????????????????????',
                    password: '??????????????????',
                    password2: {
                        required: '?????????????????????',
                        equalTo: '??????????????????????????????'
                    }
                }
            });
        },

        updateProfile: function (formId) {
            _bind_validate(formId, {
                rules: {
                    name: 'required'
                },
                messages: {
                    name: '???????????????'
                }
            });
        }
    };

    module.exports = Validate;
});