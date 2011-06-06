function notify(args) {
    if ($('#qc-notifications').length == 0)
        $('body').append($('<div id="qc-notifications"></div>'));

    var element = $("<div class='qc-notification' style='display:none'><h2>Message</h2><p></p></div>");
    var notification = {
        jQueryObject:element,
        hide:function() {
            this.jQueryObject.slideUp();
            return this;
        },
        show:function() {
            this.jQueryObject.show('fade');
            return this;
        },
        delay:function(time) {
            var _this = this;
            this.timer = setTimeout(function() {
                _this.hide()
            }, time);
            return this;
        },
        update:function(args) {
            if (args.title)
                this.jQueryObject.find('h2').text(args.title);
            if (args.msg)
                this.jQueryObject.find('p').text(args.msg);
            if (args.delay) {
                clearTimeout(this.timer);
                if (args.delay >= 0)
                    this.delay(args.delay);
            }
            if (args.style) {
                this.jQueryObject.removeClass(
                        function(index, klass) {
                            return (klass.match(/\bqc-notice\S+/g) || []).join(' ');
                        }).addClass('qc-notice-' + args.style);
            }
            return this;
        }
    };

    args.delay = args.delay || 5000;
    notification.update(args);
    $('#qc-notifications').append(element);
    notification.show();

    return notification;
}