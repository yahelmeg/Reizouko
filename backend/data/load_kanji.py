import json
from pathlib import Path
from sqlmodel import Session
from typing import List
from backend.database.db_config import engine

from backend.models.jlpt_kanji import JLPTKanji

file_path = Path("kanji_data.json")
with open(file_path, encoding="utf-8") as f:
    data = json.load(f)

kanji_list: List[JLPTKanji] = []
for entry in data:
    kanji_list.append(JLPTKanji(
        kanji=entry["kanji"],
        meaning=entry["meanings"],
        onyomi=entry.get("on_readings", ""),
        kunyomi=entry.get("kun_readings", ""),
        jlpt_level=entry["jlpt_level"]
    ))

with Session(engine) as session:
    session.add_all(kanji_list)
    session.commit()




