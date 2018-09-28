# About this website

This help site is written in Github-flavored markdown and built and deployed using MkDocs. Read this section if you are
responsible for writing and updating this content.

## Content

The help content is located under `/docs` in the root directory.

## Table of Contents

The structure of the website is determined by the `mkdocs.yml` file, which is located in the root directory. This file
contains information about the website, lists extensions to use when deploying the website, and specifies the TOC.

## Branches

On Github, or if you run `git branch`, you'll notice that there is a branch called `gh-pages`. 

**Do not touch this branch**.

MkDocs uses this branch to convert the markdown files to `html` pages, builds a site map and index, and to deploy the
site. You do not need to merge anything to this branch, you do not need to pull this branch, etc. 

**Just leave it alone**.

## Local build

As you develop new documentation, you can run the build locally to see the changes immediately.

From the root directory, run the following command:

```bash
mkdocs serve
```

The website runs locally on http://127.0.0.1:8000/

If `8000` is busy, you can specify a port number in the `yml` file. Add the following line below the 

`dev_addr: 127.0.0.1:<your-port-number>`

## Deploy the website

The website is built from the `gh-pages` branch.

!!! Warning
    Do not make changes to the `gh-pages` branch!

To deploy the website, do the following.

1. Checkout master branch.
1. Make sure any changes are pushed to the master branch.
1. Run `mkdocs gh-pages` to rebuild the site.
1. The page is deployed to:
    `https://<git-space>.github.io/<name-of-repo>/`,
    unless you specify a unique url in the github settings.

!!! Note
    You do not need to merge `master` with `gh-pages`.
