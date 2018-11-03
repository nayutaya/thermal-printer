#!/usr/bin/env python3

import click
import escpos.printer

@click.group(invoke_without_command=True)
@click.pass_context
def main(ctx):
    if ctx.invoked_subcommand is None:
        print(ctx.get_help())

@main.command(help="print text")
@click.argument("device")
@click.argument("text")
def text(device, text):
    print("device:", device)
    print("text:", text)
    printer = escpos.printer.Serial(device)
    printer.text(text)
    printer.cut()

@main.command(help="print image")
@click.argument("device")
@click.argument("path")
def image(device, path):
    print("device:", device)
    print("path:", path)

if __name__ == "__main__":
    main()
