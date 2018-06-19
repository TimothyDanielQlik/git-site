# Sandbox Project

Welcome to the sandbox environment. This repo contains one of the omni-project iterations that we can play with, without worrying about causing any irreversible problems. Use this repository for learning the many git operations. Make a bunch of branches. Create some merge conflicts. Reverse a commit. The sandbox is yours!

## Prerequisites

1. Have a basic understanding of the basic git topics under `Learn the basics` on this site.
1. Have Git, Git bash, and Sourcetree installed.

## Let's get started

### Clone the sandbox repo.

* https://github.com/qlik-trial/help-doc-sandbox.git

If you need a reminder on how to clone the repo using Sourcetree, see [Clone the Project with Sourcetree](get-code.md).

You can use either Git bash or Sourcetree.

??? Recommendation
    I recommend that you use Sourcetree. It is probably the tool you'll find most useful and intuitive for daily work, plus I am writing these tutorials from the perspective of Sourcetree!

After you clone the repo, open Explorer and have a look around the folders. All of our projects are nested under `Content`. Each project is nested under its own folder. We have a single Flare project, many targets, many TOCs, and A LOT of topics. This is what the real omni project will look like (more or less).

### Sourcetree

Wen you first open Sourcetree and the sandbox repo, it should look similar to this (perhaps a bit more graph elements).

![sandbox](assets/images/sandbox-sourcetree.png)

The ribbon along the top gives you quick access to basic operations: `merge`, `commit`, `branch`, `push`, and `pull`. It also gives you the option to set up Git Flow (we may not implement this), you can open terminal, and your repo explorer.

The left-hand menu shows your file status, your local branches, your remote branches, your tags, and your stashes.

The three remaining window panes show the Git graph -- a visual representation of git branches and history. There is a file status area, and a file diff area where file changes are shown. These panes will become more familiar as we go through start-to-finish work examples.