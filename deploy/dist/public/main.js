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
        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/; 
        $("#crop-avatar").css("min-height",window.innerHeight+"px");
        var thisimg = null
        var inputname = $("input[name='name']");
        var inputphone = $("input[name='phone']");
        var avatarInput = $("#avatarInput");
        var avatarWrapper = $("#avatar-wrapper");
        var resetupload = $("#resetupload");
        var cropperbtn = $("#cropperbtn");
        var avatarurl = $("#avatar-url");
        var avatarclick = $("#avatarclick");
        var avatarData = $('.avatar-data');
        var submitbtn = $("#submitbtn");
        var uploadeddata;
        // var imageData = $().cropper('getImageData');

        var url = '';

        submitbtn.click(function(){
            // console.log(thisimg.cropper('getCroppedCanvas'));

            // var croppng = thisimg.cropper('getCroppedCanvas').toDataURL("image/png");

            var name = inputname.val();
            var phone = inputphone.val();

            if(!myreg.test(phone)){
                alert('请输入有效的手机号码！'); 
                return false; 
            }else if(name==''){
                alert('您的姓名'); 
                return false;
            }else{
                $.ajax({
                    type: 'POST',
                    url: '/api/insertuser',
                    data: {
                      pngimageData: uploadeddata,
                      name:inputname.val(),
                      phone:inputphone.val()
                    },
                    success: function(output) {
                      // alert(JSON.stringify(output));
                      window.location = `/info/${output._id}`;
                    }
                })
            }
            // thisimg.cropper('getCroppedCanvas').toBlob(function (blob) {
            //     console.log(blob);
            //     // var formData = new FormData();
            //     // formData.append('croppedImage', blob);
            //     // formData.append('name', 'wxq');
            //     // formData.append('phone', '15961125167');
            //
            //     // $.ajax('/api/insertuser', {
            //     //     method: "POST",
            //     //     data: formData,
            //     //     processData: false,
            //     //     contentType: false,
            //     //     success: function () {
            //     //         console.log('Upload success');
            //     //     },
            //     //     error: function () {
            //     //         console.log('Upload error');
            //     //     }
            //     // });
            // });
        })

        cropperbtn.click(function(){
            if(!!thisimg){
                var imgdata = thisimg.cropper("getImageData");
                var canvasData = thisimg.cropper("getCanvasData");
                // thisimg.cropper('rotate', 90);
                var croppedCanvas = thisimg.cropper('getCroppedCanvas', { width: 140, height: 140}).toDataURL("image/png");

                uploadeddata = croppedCanvas;
                avatarclick.attr("src", croppedCanvas);
                avatarData.val(avatarData);
                avatarWrapper.html("点击上传图片");
                resetupload.hide();
                hidemodal();
                avatarInput.val('');
                avatarWrapper.css("z-index", 99);
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
                rotatable: true,
                scalable:true,
                checkOrientation: true,
                aspectRatio: 1,
                strict: false,
                guides: false,
                dragCrop: false,
                movable: false,
                resizable: false,
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
