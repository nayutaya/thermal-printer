
import escpos.printer

class NetworkPrinter:
    def __init__(self, host, port):
        self.printer = escpos.printer.Network(host=host, port=port)

    def print_text(self, text):
        self.printer.text(text)

    def print_image(self, file):
        self.printer.image(file)

    def cut_paper(self):
        self.printer.cut(mode="PART")
