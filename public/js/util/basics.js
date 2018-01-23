;(function () {
    "use strict";


    HTMLFormElement.prototype.get_data = function () {
        let input = this.querySelectorAll("[name]");
        let form_data = new FormData(this);
        input.forEach(function (item) {
            if (item.type == "file") {
                var file = item.files[0];
                if (!file) {
                    return
                }
                form_data.append(item.name, file);
            } else {
                form_data.append(item.name, item.value);
            }
        });
        return form_data;
    }






    HTMLFormElement.prototype.set_data = function (row) {
        var me = this;
        var input_list = me.querySelectorAll('[name]');
        input_list.forEach(function (input) {
            var name = input.name;
            var new_val = row[name];
            // if (new_val === undefined)
            //     return;

            switch (input.nodeName) {
                case 'INPUT':
                    switch (input.type) {
                        case 'text':
                            // console.log("1",1111);
                        case 'number':
                        case 'email':
                        case 'url':
                        case 'search':
                            input.value = new_val;
                            break;
                        case 'checkbox':
                            input.checked = row[input.name][input.value];
                            break;
                        case 'radio':
                            input.checked = input.value == new_val;
                            break;
                        case 'file':
                            var holder;

                            holder = me.$holder;
                            if (!holder) {
                                holder = me.$holder = document.createElement('div');
                                me.insertBefore(holder, input);
                                holder.addEventListener('click', function () {
                                    holder.hidden = true;
                                    input.hidden = false;
                                });
                            }
                            input.hidden = true;
                            holder.hidden = false;
                            holder.innerHTML = '已上传文件：' + new_val + '，点击修改';
                            break;
                    }
                    break;
                case 'SELECT':
                    input.value = new_val;
                    break;
            }
        });
        return
    }



    HTMLFormElement.prototype.$reset = function () {
        var me = this;
        me
            .querySelectorAll('[name]')
            .forEach(function (input) {
                input.value = '';
                if (input.type == 'file') {
                    input.hidden = false;
                    me.$holder.hidden = true;
                }
            })
    }


})();