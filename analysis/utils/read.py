from pypdf import PdfReader

def read_pdf(filepath: str):
    reader = PdfReader(filepath)
    contents = []
    for page in reader.pages:
        contents.append(page.extract_text())
    return contents
