# About this website

## The docs

Docs are written in markdown. Docs are stored under `/docs`. 

## The TOC

To add a doc to the website, you must include it in the `yml` file in the root directory.

## Local build

The website is built with mkdocs. You can run the build locally by running `mkdocs serve`.
The website runs locally on http://127.0.0.1:8000/

If 8000 is busy, you specify the port number in the yml file.

`dev_addr: 127.0.0.1:<your-port-number>`

## To deploy

The website is built from the `gh-pages` branch.

!!! Warning
    Do not make changes to this branch!

1. Checkout master branch.
1. Run `mkdocs gh-pages` to rebuild the site.
    You do not need to merge `master` with `gh-pages`.
