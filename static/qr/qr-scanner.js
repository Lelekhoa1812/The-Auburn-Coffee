// QrScanner will be loaded via UMD script tag in HTML

const qrButton = document.getElementById('qrButton');
const scanQRCodeButton = document.getElementById('scanQRCode');
const qrModal = document.getElementById('qrModal');
const userCodeInput = document.getElementById('userCodeInput');
const userInfoContainer = document.createElement("div");
userInfoContainer.id = "userInfoContainer";

let isScanning = false;
let currentScanner = null;
let currentPreviewStream = null; // preview stream
let currentScanStream = null;    // decoder stream (clone)
let isSubmitting = false; // prevent duplicate submissions
let visibilityHandlerAttached = false;

// Live logging throttle
let lastLiveLogTs = 0;
const LIVE_LOG_INTERVAL_MS = 500;
let liveTickerId = null;
let engineWatchdogId = null;
let lastEngineActivityTs = 0;
let warmupCanvas = null, warmupCtx = null;

function streamIsEnded(stream) {
	try {
		if (!stream) return true;
		const tracks = stream.getTracks ? stream.getTracks() : [];
		return tracks.length === 0 || tracks.every(t => t.readyState === 'ended');
	} catch (e) { return true; }
}

async function ensureActivePlayback() {
	try {
		const previewVideo = document.getElementById('qrPreviewVideo');
		const scanVideo = document.getElementById('qrScanVideo');
		if (previewVideo && previewVideo.srcObject && previewVideo.paused) {
			await previewVideo.play().catch(() => {});
		}
		if (scanVideo && scanVideo.srcObject && scanVideo.paused) {
			await scanVideo.play().catch(() => {});
		}
		if (scanVideo && scanVideo.srcObject && scanVideo.readyState < 2) {
			try { await scanVideo.play(); } catch (e) {}
		}
	} catch (e) {}
}

async function primeFrames(iterations = 4) {
	return new Promise(resolve => {
		let count = 0;
		const step = () => {
			count++;
			if (count >= iterations) return resolve();
			requestAnimationFrame(step);
		};
		requestAnimationFrame(step);
	});
}

async function reAcquireIfNeeded(force) {
	if (!isScanning) return;
	const needPreviewReacquire = force || !currentPreviewStream || streamIsEnded(currentPreviewStream);
	const needScanReacquire = force || !currentScanStream || streamIsEnded(currentScanStream);
	if (!needPreviewReacquire && !needScanReacquire && !force && document.visibilityState !== 'visible') return;
	if (!force && document.visibilityState !== 'visible') return;
	try {
		if (needPreviewReacquire || needScanReacquire) {
			console.log('[QR DEBUG] Reacquiring MediaStreams after visibility change');
			// Acquire a fresh base stream
			const base = await navigator.mediaDevices.getUserMedia({
				video: { facingMode: 'environment', width: { ideal: 1280, min: 640 }, height: { ideal: 720, min: 480 } }
			});
			// Assign preview stream
			currentPreviewStream = base;
			// Clone track for scan stream
			const baseTrack = base.getVideoTracks()[0];
			const clonedTrack = baseTrack ? baseTrack.clone() : null;
			currentScanStream = clonedTrack ? new MediaStream([clonedTrack]) : null;
			const previewVideo = document.getElementById('qrPreviewVideo');
			const scanVideo = document.getElementById('qrScanVideo');
			if (previewVideo) previewVideo.srcObject = currentPreviewStream;
			if (scanVideo && currentScanStream) scanVideo.srcObject = currentScanStream;
		}
		await ensureActivePlayback();
		if (currentScanner && typeof currentScanner.start === 'function') {
			currentScanner.start().then(() => console.log('[QR DEBUG] Scanner restarted after visibility change')).catch(() => {});
		}
	} catch (e) {
		console.log('[QR DEBUG] Reacquire error:', e);
	}
}

// Append user info container and video streaming container
document.addEventListener("DOMContentLoaded", () => {
	const modalContent = document.querySelector(".modal2-content");
	if (modalContent) {
		modalContent.appendChild(userInfoContainer);
		
		// Create video streaming container with scanning corners
		const videoStreamingContainer = document.createElement("div");
		videoStreamingContainer.id = "videoStreamingContainer";
		videoStreamingContainer.style.cssText = `
			position: relative;
			width: 100%;
			height: 300px;
			margin: 20px 0;
			border-radius: 15px;
			overflow: hidden;
			background: #000;
			display: none;
		`;
		
		// Create preview video element (visible)
		const previewVideo = document.createElement("video");
		previewVideo.id = "qrPreviewVideo";
		previewVideo.className = "qr-video";
		previewVideo.setAttribute("autoplay", "");
		previewVideo.setAttribute("muted", "");
		previewVideo.setAttribute("playsinline", "");
		previewVideo.style.cssText = `
			width: 100%;
			height: 100%;
			object-fit: cover;
			border-radius: 15px;
		`;

		// Create hidden scan video element (not visible, used only for decoding)
		const scanVideo = document.createElement("video");
		scanVideo.id = "qrScanVideo";
		scanVideo.setAttribute("autoplay", "");
		scanVideo.setAttribute("muted", "");
		scanVideo.setAttribute("playsinline", "");
		// Keep full size but invisible so frames keep flowing even when hidden
		scanVideo.style.cssText = `
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			opacity: 0;
			pointer-events: none;
		`;
		
		// Create scanning overlay
		const scanningOverlay = document.createElement("div");
		scanningOverlay.className = "scanning-overlay";
		scanningOverlay.style.cssText = `
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			pointer-events: none;
		`;
		
		// Create scanning corners
		const scanningCorners = document.createElement("div");
		scanningCorners.className = "scanning-corners";
		scanningCorners.style.cssText = `
			position: relative;
			width: 100%;
			margin: 15px 0;
		`;
		
		// Create corner elements
		const corners = [
			{ class: "corner top-left", style: "position: absolute; display: inline-block; width: 20px; height: 20px; border: 3px solid #6B4226; margin: 0 5px; border-right: none; border-bottom: none; border-radius: 15px 0 0 0; top: -90px; left: 0;" },
			{ class: "corner top-right", style: "position: absolute; display: inline-block; width: 20px; height: 20px; border: 3px solid #6B4226; margin: 0 5px; border-left: none; border-bottom: none; border-radius: 0 15px 0 0; top: -90px; right: 0;" },
			{ class: "corner bottom-left", style: "position: absolute; display: inline-block; width: 20px; height: 20px; border: 3px solid #6B4226; margin: 0 5px; border-right: none; border-top: none; border-radius: 0 0 0 15px; bottom: -150px; left: 0;" },
			{ class: "corner bottom-right", style: "position: absolute; display: inline-block; width: 20px; height: 20px; border: 3px solid #6B4226; margin: 0 5px; border-left: none; border-top: none; border-radius: 0 0 15px 0; bottom: -150px; right: 0;" }
		];
		
		corners.forEach(corner => {
			const cornerElement = document.createElement("div");
			cornerElement.className = corner.class;
			cornerElement.style.cssText = corner.style;
			scanningCorners.appendChild(cornerElement);
		});
		
		// Create scanning text
		const scanningText = document.createElement("p");
		scanningText.className = "scanning-text";
		scanningText.textContent = "Position QR code within the frame";
		scanningText.style.cssText = `
			margin-top: 15px;
			color: #6B4226;
			font-weight: 500;
			text-align: center;
		`;
		
		// Assemble the container
		scanningOverlay.appendChild(scanningCorners);
		scanningOverlay.appendChild(scanningText);
		videoStreamingContainer.appendChild(previewVideo);
		videoStreamingContainer.appendChild(scanningOverlay);
		// Hidden scan video is added to DOM (full-size invisible) so frames flow
		videoStreamingContainer.appendChild(scanVideo);
		
		// Place the video preview directly under the Start Camera button
		const startButton = document.getElementById('scanQRCode');
		if (startButton && startButton.parentElement) {
			// Insert after Start Camera button
			startButton.parentElement.insertBefore(videoStreamingContainer, startButton.nextSibling);
		} else {
			// Fallback: try to place above the OR splitter
			const orText = document.querySelector('.or-text');
			if (orText && orText.parentElement) {
				orText.parentElement.insertBefore(videoStreamingContainer, orText);
			} else {
				// Final fallback: append at end of modal content
				modalContent.appendChild(videoStreamingContainer);
			}
		}
	}
});

// Open/Close Modal
const openQRModal = () => (qrModal.style.display = 'block');
const closeQRModal = () => {
	qrModal.style.display = 'none';
	userCodeInput.value = "";
	userInfoContainer.innerHTML = "";
	stopScanning();
};

window.closeQRModal = closeQRModal;

document.addEventListener('DOMContentLoaded', () => {
	const waitForQrScanner = () => {
		if (typeof QrScanner !== 'undefined') {
			console.log('[QR DEBUG] QrScanner UMD detected:', QrScanner ? 'OK' : 'MISSING');
			try {
				QrScanner.hasCamera().then(v => console.log('[QR DEBUG] QrScanner.hasCamera():', v)).catch(e => console.log('[QR DEBUG] hasCamera error:', e));
				QrScanner.listCameras().then(list => console.log('[QR DEBUG] QrScanner.listCameras():', list)).catch(e => console.log('[QR DEBUG] listCameras error:', e));
			} catch (e) {}
			if (qrButton) {
				qrButton.addEventListener('click', openQRModal);
			}
			if (scanQRCodeButton) {
				scanQRCodeButton.addEventListener('click', scanQRCode);
			}
		} else {
			setTimeout(waitForQrScanner, 100);
		}
	};
	waitForQrScanner();
	if (typeof QrScanner !== 'undefined') {
		if (qrButton) {
			qrButton.addEventListener('click', openQRModal);
		}
		if (scanQRCodeButton) {
			scanQRCodeButton.addEventListener('click', scanQRCode);
		}
	}
});

function setScanButtonState(active) {
	if (!scanQRCodeButton) return;
	if (active) {
		scanQRCodeButton.textContent = 'Stop Scanning';
		scanQRCodeButton.style.backgroundColor = '#c62828';
		scanQRCodeButton.style.color = '#ffffff';
		scanQRCodeButton.style.borderColor = '#c62828';
	} else {
		scanQRCodeButton.textContent = 'Scan QR';
		scanQRCodeButton.style.backgroundColor = '';
		scanQRCodeButton.style.color = '';
		scanQRCodeButton.style.borderColor = '';
	}
}

function detachVisibilityHandler() {
	if (visibilityHandlerAttached) {
		try { document.removeEventListener('visibilitychange', reAcquireIfNeeded); } catch (e) {}
		visibilityHandlerAttached = false;
	}
}

function stopScanning() {
	const videoStreamingContainer = document.getElementById("videoStreamingContainer");
	const previewVideo = document.getElementById('qrPreviewVideo');
	const scanVideo = document.getElementById('qrScanVideo');
	if (liveTickerId) { try { clearInterval(liveTickerId); } catch (e) {} liveTickerId = null; }
	if (engineWatchdogId) { try { clearInterval(engineWatchdogId); } catch (e) {} engineWatchdogId = null; }
	warmupCanvas = null; warmupCtx = null;
	if (currentScanner) {
		try { currentScanner.stop(); console.log('[QR DEBUG] QrScanner.stop() called'); } catch (e) {}
		currentScanner = null;
	}
	if (currentPreviewStream) {
		try { currentPreviewStream.getTracks().forEach(t => t.stop()); console.log('[QR DEBUG] Preview MediaStream tracks stopped'); } catch (e) {}
		currentPreviewStream = null;
	}
	if (currentScanStream) {
		try { currentScanStream.getTracks().forEach(t => t.stop()); console.log('[QR DEBUG] Scan MediaStream tracks stopped'); } catch (e) {}
		currentScanStream = null;
	}
	if (previewVideo) { try { previewVideo.srcObject = null; previewVideo.pause(); } catch (e) {} }
	if (scanVideo) { try { scanVideo.srcObject = null; scanVideo.pause(); } catch (e) {} }
	if (videoStreamingContainer) { videoStreamingContainer.style.display = "none"; }
	isScanning = false;
	setScanButtonState(false);
	detachVisibilityHandler();
}

async function scanQRCode() {
	try {
		if (isScanning) {
			stopScanning();
			return;
		}
		const videoStreamingContainer = document.getElementById("videoStreamingContainer");
		if (videoStreamingContainer) {
			videoStreamingContainer.style.display = "block";
		}
		// Acquire a base stream
		const baseStream = await navigator.mediaDevices.getUserMedia({ 
			video: { 
				facingMode: "environment",
				width: { ideal: 1280, min: 640 },
				height: { ideal: 720, min: 480 }
			} 
		});
		console.log('[QR DEBUG] MediaStream acquired');
		// Split into preview and scan streams
		currentPreviewStream = baseStream;
		const baseTrack = baseStream.getVideoTracks()[0];
		const clonedTrack = baseTrack ? baseTrack.clone() : null;
		currentScanStream = clonedTrack ? new MediaStream([clonedTrack]) : null;
		const previewVideo = document.getElementById("qrPreviewVideo");
		const scanVideo = document.getElementById("qrScanVideo");
		if (!previewVideo || !scanVideo || !currentScanStream) {
			throw new Error('Video elements or scan stream not available');
		}
		// Attach streams
		previewVideo.srcObject = currentPreviewStream;
		scanVideo.srcObject = currentScanStream;
		await Promise.all([
			previewVideo.play().then(()=>console.log('[QR DEBUG] previewVideo.play() ok')).catch(e=>console.log('[QR DEBUG] previewVideo.play() error', e)),
			scanVideo.play().then(()=>console.log('[QR DEBUG] scanVideo.play() ok')).catch(e=>console.log('[QR DEBUG] scanVideo.play() error', e))
		]);
		if (scanVideo.readyState < 2) {
			await new Promise(resolve => {
				const handler = () => { scanVideo.removeEventListener('loadeddata', handler); resolve(); };
				scanVideo.addEventListener('loadeddata', handler);
			});
		}
		await primeFrames(6); // warm up rendering a bit more
		isScanning = true;
		setScanButtonState(true);
		console.log('[QR DEBUG] Creating QrScanner instance');
		let decodedOnce = false;
		const qrScanner = new QrScanner(scanVideo, result => {
			if (!isScanning) return;
			if (currentScanner && currentScanner !== qrScanner) return;
			if (decodedOnce) return;
			decodedOnce = true;
			lastEngineActivityTs = Date.now();
			console.log('[QR LIVE]', result && result.data ? result.data : 'Empty');
			console.log('[QR DEBUG] onDecode fired with result:', result);
			isScanning = false;
			stopScanning();
			if (!isSubmitting) {
				const code = result && result.data ? String(result.data).trim() : '';
				if (!code) {
					console.log('[QR DEBUG] Decoded result missing data field, ignoring', result);
					return;
				}
				sendUserCode(code);
			}
		}, {
			highlightScanRegion: true,
			highlightCodeOutline: true,
			overlay: null,
			returnDetailedScanResult: true,
			maxScansPerSecond: 25,
			onDecodeError: (err) => {
				if (!isScanning) return;
				if (!err) return;
				const msg = String(err);
				if (msg.includes('No QR code found')) {
					lastEngineActivityTs = Date.now();
					const now = Date.now();
					if (now - lastLiveLogTs >= LIVE_LOG_INTERVAL_MS) {
						console.log('[QR LIVE] Empty');
						lastLiveLogTs = now;
					}
					return;
				}
				console.log('[QR DEBUG] onDecodeError:', err);
			}
		});
		currentScanner = qrScanner;
		console.log('[QR DEBUG] QrScanner instance created');
		qrScanner.start()
			.then(()=> { console.log('[QR DEBUG] QrScanner.start() resolved - scanning active'); lastEngineActivityTs = Date.now(); })
			.catch(e=> console.log('[QR DEBUG] QrScanner.start() error', e));
		if (!visibilityHandlerAttached) {
			document.addEventListener('visibilitychange', () => reAcquireIfNeeded(false));
			visibilityHandlerAttached = true;
		}
		// Force the same path as a visibility change once after start
		setTimeout(() => { reAcquireIfNeeded(true); }, 200);
		// Prepare warmup canvas for draw nudges
		if (!warmupCanvas) {
			warmupCanvas = document.createElement('canvas');
			warmupCtx = warmupCanvas.getContext('2d');
		}
		// Live ticker keeps playback warm and forces draw to stimulate frame flow
		if (liveTickerId) { try { clearInterval(liveTickerId); } catch (e) {} }
		liveTickerId = setInterval(() => {
			if (!isScanning) return;
			const now = Date.now();
			const sv = document.getElementById('qrScanVideo');
			if (sv && sv.videoWidth && sv.videoHeight && warmupCtx) {
				warmupCanvas.width = 64; warmupCanvas.height = 64;
				try { warmupCtx.drawImage(sv, 0, 0, 64, 64); } catch (e) {}
			}
			if (now - lastLiveLogTs >= LIVE_LOG_INTERVAL_MS) {
				const tracks = sv && sv.srcObject ? sv.srcObject.getVideoTracks() : [];
				const trackState = tracks && tracks[0] ? tracks[0].readyState : 'none';
				console.log('[QR LIVE] tick', { readyState: sv ? sv.readyState : 'noVideo', track: trackState });
				lastLiveLogTs = now;
			}
			ensureActivePlayback();
		}, 400);
		// Initial multi-kick in first seconds to avoid needing tab switch
		setTimeout(()=>{ try { currentScanner && currentScanner.start().catch(()=>{}); } catch (e) {} ensureActivePlayback(); }, 250);
		setTimeout(()=>{ try { currentScanner && currentScanner.start().catch(()=>{}); } catch (e) {} ensureActivePlayback(); }, 750);
		setTimeout(()=>{ try { currentScanner && currentScanner.start().catch(()=>{}); } catch (e) {} ensureActivePlayback(); }, 1500);
	} catch (error) {
		console.log('[QR DEBUG] scanQRCode error:', error);
		alert("Unable to access camera. Please enter user code manually.");
		stopScanning();
	}
}

// Remove programmatic listener; rely on inline onclick on the button in HTML
// document.getElementById("submitUserCodeButton").addEventListener("click", submitUserCode);
function submitUserCode() {
	const userCode = userCodeInput.value.trim();
	if (!userCode) {
		alert("Please enter a valid user code.");
		return;
	}
	if (!isSubmitting) {
		sendUserCode(userCode);
	}
}

// const BASE_URL = window.location.origin includes("localhost")
// ? "http://localhost:3000/api"
// : "https://auburn-coffee-backend.vercel.app/api";
const BASE_URL = "https://auburn-coffee-backend.vercel.app/api";

async function sendUserCode(userCode) {
	if (isSubmitting) return;
	isSubmitting = true;
	try {
		const payload = { user_code: String(userCode || '').trim() };
		console.log('[QR DEBUG] POST /user/increment payload:', payload);
		const response = await fetch(`${BASE_URL}/user/increment`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload),
		});
		if (!response.ok) {
			let errorText = '';
			try { errorText = await response.text(); } catch (e) {}
			console.error('[QR DEBUG] increment failed', { status: response.status, body: errorText });
			return;
		}
		const userData = await response.json();
		userInfoContainer.innerHTML = `
		<p><strong>User:</strong> ${userData.user_name}</p>
		<p><strong>Streak:</strong> ${userData.user_streak}</p>
		${userData.user_streak >= 10 ? `<button id=\"redeemStreakButton\" class=\"redeem-button\">Redeem Streak</button>` : ""}
		`;
		setTimeout(() => {
			const redeemButton = document.getElementById("redeemStreakButton");
			if (redeemButton) {
				redeemButton.addEventListener("click", () => redeemStreak(userCode));
				try { redeemButton.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch (e) {}
			} else {
				try { userInfoContainer.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch (e) {}
			}
		}, 100);
		alert("Loyalty streak updated successfully!");
	} catch (error) {
		// Suppress immediate alert on transient network errors to avoid misleading error-before-success UX
		console.error('sendUserCode error:', error);
	} finally {
		// Allow a retry fairly quickly
		setTimeout(() => { isSubmitting = false; }, 300);
	}
}

async function redeemStreak(userCode) {
	try {
		const response = await fetch(`${BASE_URL}/user/decrement`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ user_code: userCode }),
		});
		if (!response.ok) {
			throw new Error("Failed to redeem streak.");
		}
		const updatedUser = await response.json();
		userInfoContainer.innerHTML = `
			<p><strong>User:</strong> ${updatedUser.user_name}</p>
			<p><strong>Streak:</strong> ${updatedUser.user_streak}</p>
			${updatedUser.user_streak >= 10 ? `<button id=\"redeemStreakButton\" class=\"redeem-button\">Redeem Streak</button>` : ""}
		`;
		setTimeout(() => {
			const redeemButton = document.getElementById("redeemStreakButton");
			if (redeemButton) {
				redeemButton.addEventListener("click", () => redeemStreak(userCode));
				try { redeemButton.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch (e) {}
			} else {
				try { userInfoContainer.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch (e) {}
			}
		}, 100);
		alert("Streak redeemed successfully! 10 points used.");
	} catch (error) {
		alert("Error redeeming streak. Please try again.");
	}
}

window.sendUserCode = sendUserCode;