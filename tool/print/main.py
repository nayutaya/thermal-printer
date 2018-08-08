#!/usr/bin/env python3

import click

@click.group(invoke_without_command=True)
@click.pass_context
def main(ctx):
    if ctx.invoked_subcommand is None:
        print(ctx.get_help())
    else:
        print("gonna invoke %s" % ctx.invoked_subcommand)

@main.command(help="description 1")
@click.argument("target", required=False)
def subcommand1(target):
    print("sub command 1")

@main.command(help="description 2")
@click.argument("target", required=False)
def subcommand2(target):
    print("sub command 2")

if __name__ == "__main__":
    main()
