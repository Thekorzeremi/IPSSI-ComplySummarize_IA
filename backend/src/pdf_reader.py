import sys, json, itertools
from pdfminer.high_level import extract_pages
from pdfminer.layout import LTTextContainer

def gen_text(path):
    for page in extract_pages(path):
        for element in page:
            if isinstance(element, LTTextContainer):
                yield element.get_text()

if __name__ == "__main__":
    text = "".join(itertools.islice(gen_text(sys.argv[1]), None))
    print(json.dumps({"text": text}))
