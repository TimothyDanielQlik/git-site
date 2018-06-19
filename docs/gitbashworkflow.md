# Simple Workflow using Git Bash

## Prerequisites

Make sure you have everything installed and set up so you can follow along with this tutorial.

* [Get Git](get-git.md)

Create a personal git repository on GitHub.

### Refresh your CLI skills

* [Tips for Using Git Bash](gitbash-tips.md)

* [Git Bash Cheat Sheet](cheat-gitbash.md)

On your local machine, `cd` to the git repo you created for this tutorial.

```bash
cd git/<name-of-repo>
```

???Info
    Git bash probably opens in the Home directory: `user/%localhost%`.

The branch that you are on is indicated in parentheses.

```bash
BDM@usott-bdm MINGW64 /c/git/<name-of-repo> (master)
```

### Overview

An overview of the basic workflow looks like this:

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

## Branching

Before you begin, run `git pull` to make sure that your current branch grabs any changes that are sitting on the remote that are not on your local branch.

|Command | Description |
|:-------| :---------- |
|`git branch <new-name>`| Creates a new branch and assigns name to branch.|
|`git checkout <new-name>`| Switches from current branch to new branch.|
|`git checkout -b <new-branch>`| Creates a new branch, assigns a name to it, and switches to it.|
|`git branch -d <new-name>`| Deletes the branch `<new-name>`. </br> You can't delete the branch that you are on.|

???Info
    `<new-branch>` should be replaced by a name, no brackets or special characters, and no spaces. Naming convention for branches should be to use lowercase and hyphens: `new-branch-name`.

When you create a new branch, it is based on a copy of the branch that you are currently on. So, if you are on master, and you `git branch <new-branch>`, then `<new-branch>` is a copy of master.

## Set upstream branch

You are creating branches locally. If you want to have the branch stored on GitHub so you can keep a backup, share your work, and submit pull requests for others to comment on your work, you need to push the branch to the repository and set it to track the branch upstream (meaning on GitHub).

|Command | Description |
|:-------| :---------- |
|`git push --set-upstream origin <new-branch>`| Pushes the branch to the repository and tells Git to track it. Now, `<new-branch>` is a branch on your machine and on GitHub.

???Tip
    You only have to use this command once. Afterwards, `git push` will know where to push the changes.

When you are finished making changes to a file, you'll want to commit those changes. A file has three states in Git, _unstaged_ (a file that has been changed but not staged), _staged_ (a file that is ready to commit), _commited_ (a file that is commited to the branch).

## Stage and commit

|Command | Description |
|:-------| :---------- |
|`git add <file-name>` | Takes a working file and stages it.|
|`git commit -m "some commit message"`| Commits the staged files and appends a commit message.|
|`git add --all`</br>or</br>`git add .`| Stages all unstaged working files. </br> A shortcut to staging each file individually.|

Now that you have committed your files to your `<new-branch>`, you'll want to update the branch in GitHub. So far, your git commits are only local commits.

## Push changes

|Command | Description |
|:-------| :---------- |
|`git push`| Pushes your commits to the GitHub repo.</br>If you did not push your branch before and set the origin to track your local branch, you'll receive a note in Git to `git push --set-upstream origin <new-branch>`. This command only works for branches that have upstream (in GitHub) branches.

## Keep in mind

When you are working on a file, you need to make sure that you are working on the appropriate branch. This is because Git changes your working directory based on the branch that you are on.

See [Branches](branches.md) for a more detailed explanation of branches and working directory.

## Staying in sync

As many people are working in this omni-project, we'll need to make sure that our branches are up-to-date. It is good practice to grab any changes to your branch that have been pushed to the GitHub repo _before_ you push your changes.

|Command | Description |
|:-------| :---------- |
|`git pull`| Fetches the changes from a remote branch and merges those changes with your local branch.|
|`git fetch`| Fetches the changes from a remote branch.</br>`fetch` as the changes to your local repository but does not merge them with your local branch.|
|`git merge <new-branch>`|Whatever branch you are on, it will take `<new-branch>` and merge it.|

It might be the case that you are working with a colleague who pushes a branch that they created to GitHub, and you want to see it on your machine. Let's say the branch is called `thors-branch`. When you do `git branch` you don't see `thors-branch` because it hasn't been fetched from remote. You just have to `fetch` and then checkout the new branch.

```bash
git fetch
From https://github.com/kyleweishaar/examples
 * [new branch]        thors-branch -> origin/thors-branch
git checkout thors-branch
```