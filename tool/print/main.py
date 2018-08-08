#!/usr/bin/env python3

import click

@click.group(invoke_without_command=True)
@click.pass_context
def main(ctx):
    if ctx.invoked_subcommand is None:
        print(ctx.get_help())

@main.command(help="print text")
@click.argument("device")
@click.argument("text")
def text(device, text):
    print("text command")
    print("device:", device)
    print("text:", text)

@main.command(help="print image")
@click.argument("device")
@click.argument("path")
def image(device, path):
    print("image command")
    print("device:", device)
    print("path:", path)

if __name__ == "__main__":
    main()
