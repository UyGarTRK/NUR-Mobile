"""Extract the printed surah index of Diyanet publication 949, 5th edition (2018).
Source PDF is preserved unchanged. PDF page 2 is Fatiha; printed 1..604 = PDF 3..606.
Requires pdfplumber. This is an offline content preparation tool, not a build dependency.
"""
import hashlib, json
from pathlib import Path
import pdfplumber
root = Path(__file__).resolve().parents[1]
source = root / 'src/mushaf/diyanet-949-2018.pdf'
starts = {}
with pdfplumber.open(source) as pdf:
    assert len(pdf.pages) == 616
    for index in (612, 613, 614):
        words = [w for w in pdf.pages[index].extract_words() if all(c in '٠١٢٣٤٥٦٧٨٩' for c in w['text'])]
        for number_range, page_range in [((235, 260), (140, 165)), ((430, 450), (335, 360))]:
            numbers = [w for w in words if number_range[0] < w['x0'] < number_range[1]]
            rows = []
            for word in numbers:
                if not rows or abs(rows[-1][0]['top'] - word['top']) > 2:
                    rows.append([word])
                else:
                    rows[-1].append(word)
            for row in rows:
                number = int(''.join(w['text'] for w in sorted(row, key=lambda w:w['x0'])))
                page_words = sorted([w for w in words if page_range[0] < w['x0'] < page_range[1] and abs(w['top']-row[0]['top']) < 2], key=lambda w:w['x0'])
                starts[number] = int(''.join(w['text'] for w in page_words))
assert sorted(starts) == list(range(1,115))
starts[1] = 0 # Dedicated unnumbered Fatiha opening page, not Bakara's printed page 1.
assert all(starts[n] <= starts[n+1] for n in range(1,114))
assert starts[2] == 1 and starts[3] == 49 and starts[36] == 439 and starts[114] == 604
manifest = {'edition':'diyanet-949-2018-v1','title':'Diyanet Kur’an-ı Kerim · 5. baskı, 2018',
 'source':'https://webdosya.diyanet.gov.tr/kuran/kuranikerim/dosyalar/document/kuran.pdf',
 'sha256':hashlib.sha256(source.read_bytes()).hexdigest(),'pdfPageCount':616,
 'firstPdfPage':2,'lastPdfPage':606,'lastPrintedPage':604,
 'surahStarts':{str(n):starts[n] for n in range(1,115)}}
(root/'src/mushaf/manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
print('Verified 114 surah starts from the printed index; 605 reading leaves including Fatiha.')
