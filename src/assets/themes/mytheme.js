ace.define("src/assets/themes/mytheme",["require","exports","module"], function(acequire, exports, module) {

    exports.isDark = true;
    exports.cssClass = "ace-mytheme";
    exports.cssText = ".ace-mytheme .ace_gutter {\
    background: transparent;\
    color: #4effa1\
    font-size: \
    }\
    \
    .ace-mytheme {\
    background: transparent;\
    color: #F8F8F2\
    }\
    .ace-mytheme .ace_cursor {\
    color: #F8F8F0\
    }\
    .ace-mytheme .ace_marker-layer .ace_selection {\
    background: #69c\
    }\
    .ace-mytheme.ace_multiselect .ace_selection.ace_start {\
    box-shadow: 0 0 3px 0px #272822;\
    }\
    .ace-mytheme .ace_marker-layer .ace_step {\
    background: rgb(102, 82, 0)\
    }\
    .ace-mytheme .ace_marker-layer .ace_bracket {\
    margin: -1px 0 0 -1px;\
    border: 1px solid #49483E\
    }\
    .ace-mytheme .ace_marker-layer .ace_active-line {\
    background: \
    }\
    .ace-mytheme .ace_gutter-active-line {\
    background-color: #202020 \
    }\
    .ace-mytheme .ace_marker-layer .ace_selected-word {\
    border: 1px solid #49483E\
    }\
    .ace-mytheme .ace_invisible {\
    color: #52524d\
    }\
    .ace-mytheme .ace_entity.ace_name.ace_tag,\
    .ace-mytheme .ace_keyword,\
    .ace-mytheme .ace_meta.ace_tag,\
    .ace-mytheme .ace_storage {\
    color: #6ded7c\
    }\
    .ace-mytheme .ace_punctuation,\
    .ace-mytheme .ace_punctuation.ace_tag {\
    color: #6ded7c\
    }\
    .ace-mytheme .ace_constant.ace_character,\
    .ace-mytheme .ace_constant.ace_language,\
    .ace-mytheme .ace_constant.ace_numeric,\
    .ace-mytheme .ace_constant.ace_other {\
    color: #AE81FF\
    }\
    .ace-mytheme .ace_invalid {\
    color: #F8F8F0;\
    background-color: #F92672\
    }\
    .ace-mytheme .ace_invalid.ace_deprecated {\
    color: #F8F8F0;\
    background-color: #AE81FF\
    }\
    .ace-mytheme .ace_support.ace_constant,\
    .ace-mytheme .ace_support.ace_function {\
    color: #66D9EF\
    }\
    .ace-mytheme .ace_fold {\
    background-color: #A6E22E;\
    border-color: #F8F8F2\
    }\
    .ace-mytheme .ace_storage.ace_type,\
    .ace-mytheme .ace_support.ace_class,\
    .ace-mytheme .ace_support.ace_type {\
    font-style: italic;\
    color: #66D9EF\
    }\
    .ace-mytheme .ace_entity.ace_name.ace_function,\
    .ace-mytheme .ace_entity.ace_other,\
    .ace-mytheme .ace_entity.ace_other.ace_attribute-name,\
    .ace-mytheme .ace_variable {\
    color: #A6E22E\
    }\
    .ace-mytheme .ace_variable.ace_parameter {\
    font-style: italic;\
    color: #FD971F\
    }\
    .ace-mytheme .ace_string {\
    color: #E6DB74\
    }\
    .ace-mytheme .ace_comment {\
    color: #75715E\
    }\
    .ace-mytheme .ace_indent-guide {\
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAEklEQVQImWPQ0FD0ZXBzd/wPAAjVAoxeSgNeAAAAAElFTkSuQmCC) right repeat-y\
    }";
    
    var dom = acequire("../lib/dom");
    dom.importCssString(exports.cssText, exports.cssClass);
    });
    