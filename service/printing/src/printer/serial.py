
import escpos.printer

class SerialPrinter:
    def __init__(self, device):
        self.printer = escpos.printer.Serial(device)

    def print_text(self, text):
        self.printer.text(text)

    def print_image(self, file):
        self.printer.image(file)

    def cut_paper(self):
        self.printer.cut()
