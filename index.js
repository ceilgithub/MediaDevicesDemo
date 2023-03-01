"use strict"

const socket = new WebSocket('ws://localhost:4096');
socket.binaryType = 'arraybuffer';
// 监听 WebSocket 连接打开事件
socket.addEventListener('open', () => {
    console.log('WebSocket connected!');
});

// 监听 WebSocket 消息事件
socket.addEventListener('message', event => {
    // console.log('WebSocket received message:', event.data);
    send_img();
});



// 监听 WebSocket 错误事件
socket.addEventListener('error', event => {
    console.error('WebSocket error:', event);
});

// 监听 WebSocket 关闭事件
socket.addEventListener('close', event => {
    console.log('WebSocket closed:', event);
});

const stream = await navigator.mediaDevices.getDisplayMedia({
    video: true,
    audio: false,
    cursor: false,
    displaySurface: 'application'
});

console.log(stream.getVideoTracks)

const canvas = document.getElementById('canvas');
canvas.width = 400;
canvas.height = 400;
const ctx = canvas.getContext('2d')

const videoElement = document.getElementById('screen-capture-video');
videoElement.srcObject = stream;


const send_img = ()=>{
    // console.timeEnd()
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
    // 发送像素数据到服务器
    socket.send(binaryData);

    imageData = null
    pixels = null
    // console.time()
    // console.clear()
}

videoElement.addEventListener('loadedmetadata', () => {
    setTimeout(() => {
        send_img();
    }, 1)
});
