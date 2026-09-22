# Approved mansion animation

Glam selected the **first** animation. Do not use revision 2 or generate another.

- First Manus task: https://manus.im/app/SMwGAiERQrW7xX9VXNreiQ
- Repository: nakeymasi-coder/GLAM-HUSTLE-HUB
- Netlify must remain disconnected; update GitHub preview only.

The approved source is `halloween-mansion-10s-loop-silent-4k.mp4`, supplied by
Glam. The source is 3840 x 2160, 24 fps, 10 seconds, H.264, without audio.
The original 4K upload is preserved. The website copy is
`videos/mansion-halloween-v1.mp4`: 1920 x 1080, 24 fps, 10 seconds,
H.264/yuv420p, CRF 23, fast-start metadata, no audio, 4,628,267 bytes.
Only resolution and compression were changed; timing and the approved scene
were retained. Sampled first/last frames closely match.

`index.html` points `#mansionVideo` to that relative path. Navigation, room
coordinates, support links and other pages are unchanged. The video is muted,
loops inline and sits below the room links.
Reduced-motion and data-saving preferences default to the still image, with
manual playback available once a source is configured. Failed media falls back
to the still image. A paused visitor is not automatically restarted.

Maintenance:

1. To disable motion, clear `data-src` on `#mansionVideo`; the original Halloween
   image and all links remain usable, and the playback control stays hidden.
2. For a future approved replacement, add the new file first and then change
   `data-src`. Keep the same framing and aspect ratio for the room links.
3. Test actual playback, pause/resume, cropping, fallback and room/menu links in
   the GitHub Pages preview after a media change.
4. Do not reconnect or deploy Netlify until Glam explicitly requests it.

Run `npm --prefix qa ci` and `node qa/video-check.mjs` for the controller checks.
Those checks use a simulated media element; actual decoding, visual alignment
and the loop boundary also require a browser review.
