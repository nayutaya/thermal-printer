
class PrinterMock:
    def __init__(self):
        pass

    def print_text(self, text):
        print("print_text:", text)

    def print_image(self, file):
        print("print_image")

    def cut_paper(self):
        print("cut_paper")
