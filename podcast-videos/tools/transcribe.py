import sys, json
from faster_whisper import WhisperModel
audio, out = sys.argv[1], sys.argv[2]
m = WhisperModel("small", device="cpu", compute_type="int8", cpu_threads=4)
import subprocess, numpy as np
pcm=subprocess.run(["ffmpeg","-v","error","-i",audio,"-ac","1","-ar","16000","-f","s16le","-"],capture_output=True).stdout
arr=np.frombuffer(pcm,np.int16).astype(np.float32)/32768
segs, info = m.transcribe(arr, language="es", word_timestamps=True, vad_filter=True)
res = []
for s in segs:
    res.append({"start": s.start, "end": s.end, "text": s.text.strip(),
                "words": [{"s": w.start, "e": w.end, "w": w.word} for w in s.words]})
    print(f"[{s.start:7.1f}] {s.text.strip()}", flush=True)
json.dump(res, open(out, "w"), ensure_ascii=False)
print("DONE")
