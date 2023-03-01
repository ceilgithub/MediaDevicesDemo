// (async () => {
//
// })()


let elementById = document.getElementById('start');

elementById.addEventListener('click', () => {
    console.log(1)
    console.log(navigator.mediaDevices.getSupportedConstraints())
    navigator.mediaDevices.getDisplayMedia({
        video: {
            frameRate: {ideal: 144, max: 999},
            cursor: 'never',
        },
        audio: false,
        cursor: 'never',
        displaySurface: 'application'
    }).then(steam => {
            const videoElement = document.createElement('video')
            videoElement.autoplay = true
            videoElement.srcObject = steam

            const canvas = document.getElementById('canvas');
            canvas.width = 400;
            canvas.height = 400;
            const ctx = canvas.getContext('2d')


            setInterval(() => {
                console.time("time")
                ctx.drawImage(videoElement,
                    (videoElement.videoWidth - 400) / 2, (videoElement.videoHeight - 400) / 2,  // 视频截取的起点坐标
                    400, 400,  // 截取的宽高
                    0, 0,  // 在 canvas 上的起点坐标
                    400, 400  // 在 canvas 上绘制的宽高
                );
                // 获取画布中的像素数据
                let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                let pixels = imageData.data;
                let binaryData = new Uint8Array(pixels.buffer);

                // console.log(binaryData)

                // ctx.toBlob((bb)=>{
                //     console.log(bb)
                // },'image/jpeg')
                console.timeEnd("time")
            }, 5)


        }
    ).catch(error => {
        console.log(error)
    })
})


