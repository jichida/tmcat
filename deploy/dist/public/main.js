(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node / CommonJS
        factory(require('jquery'));
    } else {
        factory(jQuery);
    }
})(function ($) {
    'use strict';
    $(function(){
        $("#crop-avatar").css("min-height",window.innerHeight+"px");
        var thisimg = null
        var avatarInput = $("#avatarInput");
        var avatarWrapper = $("#avatar-wrapper");
        var resetupload = $("#resetupload");
        var cropperbtn = $("#cropperbtn");
        var avatarurl = $("#avatar-url");
        var avatarclick = $("#avatarclick");
        var avatarData = $('.avatar-data');
        // var imageData = $().cropper('getImageData');

        var url = '';

        cropperbtn.click(function(){
            if(!!thisimg){
                var imgdata = thisimg.cropper("getImageData");
                var canvasData = thisimg.cropper("getCanvasData");                
                var croppedCanvas = thisimg.cropper('getCroppedCanvas').toDataURL("image/png");
                avatarclick.attr("src", croppedCanvas);
                avatarData.val(avatarData);
                avatarWrapper.html("点击上传图片");
                resetupload.hide();
                hidemodal();
                thisimg.cropper("clear");
                thisimg.cropper('destroy');
                thisimg.remove();
            }
        })
        
        avatarclick.click(function(){
            showmodal();
        })

        resetupload.click(function(){
            avatarInput.click();
        })

        avatarInput.change(function(e){
            console.log(e);
            inputchange();
        })  

        function showmodal(){
            $("#avatar-modal").modal('show');
            avatarWrapper.css({"height": (window.innerWidth-50)+"px", width:(window.innerWidth-50)+"px",  "overflow": "hidden"})
        }
        function hidemodal(){
            $("#avatar-modal").modal('hide');
        }
        function inputchange(){
            var files, file;
            var support = {
                fileList: !!$('<input type="file">').prop('files'),
                blobURLs: !!window.URL && URL.createObjectURL,
                formData: !!window.FormData
            }
            if (!!support.fileList && !!support.blobURLs) {
                files = avatarInput.prop('files');
                console.log(files);
                if (files.length > 0) {
                    file = files[0];
                    if (isImageFile(file)) {
                        url = URL.createObjectURL(file);
                        startCropper();
                    }
                }
            }
        }
        function isImageFile(file) {
            if (file.type) {
                return /^image\/\w+$/.test(file.type);
            } else {
                return /\.(jpg|jpeg|png|gif)$/.test(file);
            }
        }
        //重新上传
        function clearimg(){
            avatarWrapper.find("img").cropper("clear");
        }

        function startCropper(){
            console.log("startCropper");
            var _this = this;
            thisimg = $('<img src="' + url + '" style="max-height:'+(window.innerHeight-164)+'px;">');
            avatarWrapper.empty().html(thisimg);
            avatarWrapper.css("z-index", 200);
            resetupload.show();
            thisimg.cropper({
                aspectRatio: 1,
                strict: false,
                guides: false,
                dragCrop: false,
                movable: false,
                resizable: false,
                rotatable: false,
                modal : true,
                background : false,
                crop: function (data) {
                    console.log(data);
                    var json = [
                        '{"x":' + data.x,
                        '"y":' + data.y,
                        '"height":' + data.height,
                        '"width":' + data.width,
                        '"rotate":' + data.rotate + '}'
                    ].join();
                    avatarData.val(json);
                },
                built: function () {
                    thisimg.cropper('setCropBoxData', {"left": 25, "top": 25, "width": avatarWrapper.width()-50, "height": avatarWrapper.width()-50});
                    thisimg.cropper('setData', {"width": window.innerWidth-30, "height": window.innerWidth-30});
                },
            });
        }
    })
});