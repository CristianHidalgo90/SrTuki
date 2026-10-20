"""Actualizar los videos públicos recientes desde el feed oficial de YouTube."""
import json
import re
import urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path

CHANNEL = "UC2JYh941HAUH_9DHKnqC3Gw"
url = "https://www.youtube.com/feeds/videos.xml?channel_id=" + CHANNEL
request = urllib.request.Request(url, headers={"User-Agent": "SrTuki-site/1.0"})
with urllib.request.urlopen(request, timeout=30) as response:
    root = ET.fromstring(response.read())
ns = {"atom": "http://www.w3.org/2005/Atom", "yt": "http://www.youtube.com/xml/schemas/2015"}
if root.findtext("yt:channelId", namespaces=ns) != CHANNEL:
    raise ValueError("El feed no corresponde al canal esperado")
videos = []
for entry in root.findall("atom:entry", ns):
    video_id = entry.findtext("yt:videoId", default="", namespaces=ns)
    if re.fullmatch(r"[A-Za-z0-9_-]{11}", video_id):
        videos.append({"id": video_id, "title": entry.findtext("atom:title", default="", namespaces=ns)})
if not videos:
    raise ValueError("Feed vacío: se conserva la lista anterior")
path = Path("datos/youtube.json")
path.parent.mkdir(parents=True, exist_ok=True)
path.write_text(json.dumps({"videos": videos}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
