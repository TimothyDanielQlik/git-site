# Simple Workflow using Sourcetree

## Prerequisites

Make sure you have everything installed and set up so you can follow along with this tutorial.

* [Get Git](get-git.md)

Create a personal git repository on GitHub.

### Overview

The steps involved in a basic workflow look like this:

??? Info
    This table is taken from [Simple workflow using Git Bash](gitbashworkflow.md), but we need to do the same thing with Sourcetree. In the end, you'll see that it is simpler to use the GUI as we can combine some of our git commands.

| Step | git command    | Description   |
| ---  | ---            | ---           |
|1|`git pull`| Grabs any changes from remote for your checked out branch.|
|2|`git branch <new-branch>`|Creates a new branch from your checked out branch.|
|3| -- | Do your work, edit a file, etc.           |
|4|`git status`|Check your branch status. You'll see the files that you are working on in red.|
|6| `git add <file>`|Stage the working files. `<file>` is the name of the file, ex. _file.htm_.</br>To add _all_ files, use `git add .` or git `add --all`|
|7|`git status`|Check your staged files. You'll see the staged files in green.
|8| `git commit -m "commit message"`|Appends a message to this commit|
|9|`git push`|Pushes your committed files to the remote branch.|

## Preamble

For these work instructions, I created an `examples` repository. Feel free to create a repo on your personal GitHub account to play with.

![sourcetree](assets/images/sourcetreesexample1.png)

Under **Branches**, I have a single `master` branch. The graph shows some previous commits, but we shouldn't concern ourselves with that right now.

The labels on the graph show that our local `master` and `origin/master` are pointing to the same commit (they are in sync) and the `origin/HEAD` is pointing the the latest commit. If I don't want to see the labels for remote branches, I deselect **Show Remote Branches**.

## Branching

Before you begin, click **Pull** in the ribbon to make sure that your current branch grabs any changes that are sitting on the remote that are not on your local branch. No one else is working in this repo so there won't be any changes. However, in our omni-project, we'll all be working in the same repo, so this is just good practice.

To create a new branch:

1. Click the branch button in the ribbon.
1. Name your branch. The name should be lower case and use hyphens for spaces, for example: `new-branch-name` (I named my branch `develop`.)
1. Select **Working copy parent** to create a branch based on the latest commit.</br> Or select **Specified commit** to create a branch from a specific commit.
1. Select **Checkout new branch**.</br>This will create the branch and then switch from master to your new branch.

![newbranch](assets/images/createbranch-sourcetree.png)

You'll see the new branch appear in the **Branches** section in Sourcetree, and you'll see that it has a small circle beside it (meaning it is checkout).

## Set upstream branch

So, we've created a branch locally. If this branch is just for personal work that we are not sharing with anyone, you can leave it as is. If you want to push your work to the remote GitHub server, you need to push it upstream to track changes.

For example, `master` is on your local machine and on GitHub. You make changes locally, commit them to your local branch, and then you push those changes to the remote branch. Let's say that I want to set my branch upstream because I want someone to help me with this feature work.

1. Click **Push** in the ribbon.

    This dialog opens:

    ![pushbranch](assets/images/pushbranchsourcetree.png)

1. Select the new branch.

    The name of the remote branch will fill in automatically.

In the graph, we can see that all labels (`master` and `develop`) point to the exact same commit.

![graph](assets/images/bnewbranchgraph.png)

Now work on some content! When you're finished working, we can stage and commit our work.

??? Tip
    Add a couple of text files to your repo.

## Stage, commit, and push

Sourcetree tracks the files that are part of your current branch. When you save your changes, say, to your .htm files in Flare, Sourcetree detects these changes.

The image below shows us that we are on the `develop` branch. At the top of the graph we have some uncommitted changes, and in the lowest pane, Sourcetree lists the unstaged files. In this case, I created a small markdown file named `text`. It appears in the unstaged file pane.

![unstaged](assets/images/unstaged.png)

We want to do three things:

1. Stage the changed file.
1. Commit the changes to the branch.
1. Push changes from local branch to remote branch.

### Stage

We want to click on the unstaged file. The pane to the right shows us the changed content (green = content added || red = content removed).

1. Click **Stage All** or **Stage Selected**.

    Your unstaged file will move to the staged file pane.

### Commit and push

We want to commit the changes and add a commit message.

1. Click the **Commit** button in the ribbon.</br>A text field opens at the bottom.
1. Enter a commit message.
1. Select **Push changes immediately to origin/develop** </br> You can commit changes locally without pushing to the remote, but we are using the remote `develop` branch to backup our work and to collaborate with others, so it is a good idea to push when committing.
1. Click **Commit**.

## Where we are at

When we started, `develop` and `master` pointed to the same commit. We switched to the `develop` branch and did some work, committed that work, and pushed changes to the `origin/develop` branch. Let's look at the graph.

![stock](assets/images/takestock.png)

`master` points to the previous commit. `develop` is ahead by one. You can continue to work on this branch making small commits often. Every time you commit, you'll see the `develop` pointer move up to the latest commit. Eventually, you'll want to merge this branch back into `master`. Merging is covered in the [Merge with Git Extension](merge-gitExt.md) topic.