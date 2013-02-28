define(function (require, exports, module) {
  var $ = require('$');
  var Widget = require('widget');
  var AutoComplete = Widget.extend({
    attrs: {
      trigger: {
        value: null, // required
        getter: function (val) {
          return $(val);
        }
      },
      parentNode: {
        value: null, // required
        getter: function (val) {
          return $(val).first();
        }
      },
      template: '<ul data-role="autocomplete" class="ui-autocomplete"></ul>',
      itemTemplate: '<li data-role="item" class="ui-autocomplete-item">{{value}}</li>',
      delay: 300,
      dataSource: [] //Array or function
    },
    events: {
      'touchstart [data-role=item]': '_touchstart',
      'touchmove [data-role=item]': '_touchmove',
      'touchend [data-role=item]': '_touchend'
    },
    setup: function () {
      this.get('trigger').attr('autocomplete', 'off')
        .on('blur.autocomplete', $.proxy(this._blurEvent, this))
        .on('input.autocomplete', $.proxy(this._inputEvent, this));
      this.get('parentNode').append(this.element);
    },
    _blurEvent: function () {
      this.hide();
    },
    _inputEvent: function () {
      var value = this.get('trigger').val();
      if (this.valueCache === value) return;
      this.valueCache = value;
      var dataSource = this.get('dataSource');
      var data;

      if (typeof dataSource === 'function') {
        data = dataSource(value, $.proxy(this, '_dataRender'));
      } else {
        data = dataSource;
      }
      data && (this._dataRender(data));
    },
    _dataRender: function (data) {
      if (!(typeof data === 'object' && data.length > 0)) {
        this.hide();
        return;
      }

      this.element.empty();
      var me = this;
      var tpl = this.get('itemTemplate');
      var key = this.get('dataKey');
      $.each(data, function (i, item) {
        var value = key ? item[key] : item;
        me.element.append($(tpl.replace('{{value}}', value)).data('item', item));
      });
      this.show();
    },
    _touchstart: function () {
      this.touchState = 'start';
    },
    _touchmove: function () {
      this.touchState = 'move';
    },
    _touchend: function (e) {
      if (this.touchState === 'start') {
        var item = $(e.currentTarget).data('item');
        var key = this.get('dataKey');
        var value = key ? item[key] : item;
        this.get('trigger').val(value);
        setTimeout($.proxy(this, 'hide'), 360);
      }
    },
    show: function () {
      this.element.show();
    },
    hide: function () {
      this.element.hide();
    }
  });

  return AutoComplete;
});