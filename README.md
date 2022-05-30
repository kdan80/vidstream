# vidstream
A youtube inspired video streaming app

![demo image](https://raw.githubusercontent.com/kdan80/vidstream/master/frontend/public/vidstream.webp)

<p>
	A portfolio project built to demonstrate knowledge of API interfaces, CRUD and separate frontend and backend code bases. This project was built with React, expressjs, mongodb and ffmpeg for video processing.
</p>

<p>
	The animated gifs below have been included to demonstrate some
	of the functionality of vidstream.
</p>


#### Stream video

<p>
A video stream created sing the "fs" module from node.js.
</p>

![stream video](https://github.com/kdan80/vidstream/blob/master/gifs/vs-stream-video.gif)

#### Filter videos

<p>
Filter the list of displayed videos using the standard js filter() array method.
</p>

![stream video](https://github.com/kdan80/vidstream/blob/master/gifs/vs-filter-videos.gif)

#### Upload a video

<p>
Upload a video. ffmpeg is used to process the video, extracting a thumbnail image, computing duration etc. The metadata is then stored in a mongodb document.
</p>

![stream video](https://github.com/kdan80/vidstream/blob/master/gifs/vs-upload-video.gif)
