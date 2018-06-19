# Git Bash Cheat Sheet

Wanna use the command line? Walk trough the examples in this topic and bookmark this page for a quick reference to simple commands.

## Before you begin

Read the [Moving to Git](/index.md) page.

On your local machine, `cd` to the git repo.

```bash
cd git/omni-project
```

??? Info
    Git bash probably opens in the Home directory: `user/%localhost%`. You can change this. Learn how with [Change the Git Bash default path](gitbash-tips.md#change-the-git-bash-default-path)

The branch that you are on (checked out) is indicated in parentheses.

```bash
BDM@usott-bdm MINGW64 /c/git/omni-project (master)
```

## Basic workflow and commands

The sections below follow a basic workflow of creating a branch, doing some work, and merging that branch.

### Basic commands

|Command | Description |
|:-------| :---------- |
|`git status`|Shows the state of your current branch </br> This is a very helpful tool to run after every command to see what state you're in.|
|`git log` | Shows a list of commits and metadata about those commits|
|`git branch` | Shows a list of branches</br>The current branch is marked with an (*)|

When you want to start working, you probably want to work on a new branch.

### Branching commands

???Info
    `<new-branch>` should be replaced by a name, no brackets or special characters, and no spaces.

|Command | Description |
|:-------| :---------- |
|`git branch <new-name>`| Creates a new branch and assigns name to branch.|
|`git checkout <new-name>`| Switches from current branch to new branch.|
|`git checkout -b <new-branch>`| Creates a new branch, assigns a name to it, and switches to it (checkout).|
|`git branch -d <new-name>`| Deletes the branch `<new-name>`. </br> You can't delete the branch that you are on.|

When you create a new branch, it is based on a copy of the branch that you are currently on. So, if you are on master, and you run `git branch <new-branch>`, then `<new-branch>` is a copy of the latest commit on master.

You create branches locally. If you want to have the branch stored on GitHub so you can keep a backup, share your work, and submit pull requests for others to comment on your work, you need to push the branch to the repository and set it to track the branch upstream (meaning on GitHub).

#### Track the local branch on Gitub

|Command | Description |
|:-------| :---------- |
|`git push --set-upstream origin <new-branch>`| Pushes the branch to the repository and tells Git to track it. Now, `<new-branch>` is a branch on your machine and on GitHub.

???Tip
    You only have to use this command once. Afterwards, `git push` will know where to push the changes.

### Stage and Commit commands

Changes passed through a staging area. When you change a file, the changes are initially _unstaged_, you add them to the index so they become _staged_, and then you commit then to the branch.

??? Info
    It's 1990, and to store photos, you first get them developed and printed, spread out on the living room floor (unstaged). Once organized, you place them in a photo album, sorted in such as way that you can retrace your steps as your turn the pages (staged). The album looks great, so you label and date the spine, put it on the shelf, and wait for someone to ask "How was your trip?" (committed).

|Command | Description |
|:-------| :---------- |
|`git add <file-name>` | Takes a working file and stages it.|
|`git add --all` | Stages all unstaged working files. </br> A shortcut to staging each file individually.|
|`git commit -m "some commit message"`| Commits the staged files and appends a commit message.|

Now that you have committed your files to your `<new-branch>`, you'll want to update the branch in GitHub. So far, your git commits are only local commits.

#### Push your commits

|Command | Description |
|:-------| :---------- |
|`git push`| Pushes your commits to the GitHub repo.</br>If you didn't set the branch upstream, you'll receive a note in Git to `git push --set-upstream origin <new-branch>`. This command only works for branches that have upstream (in GitHub) branches.

## Keep in mind

When you are working on a file, you need to make sure that you are working on the appropriate branch. This is because Git changes your working directory based on the branch that you are on.

For example, if you are on `<new-branch>` and you change an `.htm` file in Flare, and then you switch to `master`, you'll notice that file changes back to the state it was in on `master` (it won't show the changes tat you did on `<new-branch>`.

A TFS branch is a copy of every single file. A git branch is a tiny reference object that points to a tree that points to individual blobs (files). Git only stores the new change and adds that change to the index.

To open a file on a branch in git, you just switch to that branch. The same working directory reflects the objects of the checked out branch.

To open a file on a branch in TFS, you navigate to the working directory where you have a copy of that branch. I have four release branches stored locally, each is a full copy. This is redundant * 4.

![assets](assets/images/TFS.png)

## Keeping in sync

As many people are working in this omni-project, we'll need to make sure that our branches are up-to-date. It is good practice to do a `git pull` of `git fetch` before you do a `git push`.

|Command | Description |
|:-------| :---------- |
|`git pull`| Pulls the contents of a branch from GitHub and merges it.|
|`git fetch`| Pulls the content of a branch from GitHub and _doesn't_ merge.</br>If you `fecth` then you'll have to manually `merge`.|
|`git merge <new-branch>`|Whatever branch you are on, it will take `<new-branch>` and merge it.|

### Working together

Let's say your colleague Thor asks you for help on his new feature. He as his local branch and it is tracked on the remote GitHub server too. Let's say the branch is called `thors-branch`. When you do `git branch` you don't see `thors-branch` because it hasn't been fetched from remote. You just have to fetch the remote and then checkout the new branch.

```bash
git fetch
From https://github.com/qlik-trial/omni-project
 * [new branch]        thors-branch -> origin/thors-branch
git checkout `thors-branch`
```

Git will fetch remote branches and list them for you so that you can then check it out.

## Revert a merge commit

Made a mistake? That's ok. Use `git revert`.

* Safe process.
* Keeps commit history.
* Reverse the commit by creating a new commit.

```ascii
A--B--C
git revert (reverse C by committing D)
A--B--C--D
```

1. Checkout the branch you want to revert commit.

```bash
git checkout <branch>
git pull origin/<branch>
git revert -m "revert message" 1 HEAD
```

This reverts the branch to the 1st parent. You can go back X number of commits by changing the argument.
