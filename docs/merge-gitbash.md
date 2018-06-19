# Merge with Git Bash

After you have finished with a feature or a task, you may want to merge your feature branch into another branch.

`git merge` is one of the processes that git uses when you run `git pull` to retrieve commits from the remote (the other is `git fetch`). When we want to merge different branches however, we must do this manually.

Say we have the following structure, `branch-X` and `master`.

```ascii
     A--B--C branch-X
    /
D--E--F--G master
```

Let's assume we are on `master`.

* `branch-X` points to commit C, which has a history of B, A, and E.</br>E is the commit where `branch-X` diverged.

* `master` points to commit H, which has a history of G through D.

Our goal is to merge `branch-X` into `master`, resulting in:

```ascii
     A--B--C branch-X
    /       \
D--E--F--G---H master
```

`master` now points to a new commit H that has both commit H and commit C as its parents.

## Merge

I'll use my `examples` repo again to show a merge with Git Bash.

I created a `branch-X` and did some work on this branch, and let's assume there are some other commits on `master` that are not on `branch-x`. When I run `git branch` I can see my branches and which branch I have checked out.

```bash
BDM@usott-bdm MINGW64 /c/git/examples (master)
$ git branch
  branch-x
* master
```
I am currently on the `master` branch and my git looks something like this (from above):

```ascii
     A--B--C branch-X
    /
D--E--F--G master
```

To merge branches, run the following commands:

```bash
git merge branch-x -m "merge branch-x"
```

The -m flag and message are important for Git Bash. A merge is a commit. You can run a merge command without a message, but Git will open the vim editor which is quite annoying. It's also a good habit to just leave messages about what you are doing.

Check your status:

```bash
git status
$ git status
On branch master
Your branch is ahead of 'origin/master' by 2 commits.
  (use "git push" to publish your local commits)

nothing to commit, working tree clean
```

After a merge, you'll get a status message that your branch is X commits behind `origin/master`. This just means you haven't pushed your merge commit to the remote.

Push to remote:

```bash
git push
git status
Your branch is up to date with 'origin/master'.

nothing to commit, working tree clean

```

Next time you run git status you'll see a message that your up-to-date. 

We still have the 2 branches, and we no longer need `branch-x`.

## Delete

Make sure you are not checkout on the branch that you want to delete.

```bash
BDM@usott-bdm MINGW64 /c/git/examples (master)
$ git branch
  branch-x
* master
```

We need to delete the branch both locally and remotely.

### Remotely

We delete the local branch and then push that change to origin.

```bash
git push origin -d branch-x
To https://github.com/kyleweishaar/examples.git
 - [deleted]         branch-x
```

`origin` is most often the name of the remote unless you manually changed the name in GitHub or specified another name when you pushed your branch to the remote.

You will get a confirmation string that the branch is deleted.

### Locally

After we delete the branch remotely, check your branches again. The syntax to delete the branch locally is more obvious. After you delete your local branch, check branches again.

```bash
git branch
  branch-x
* master
git branch -d branch-x
Deleted branch branch-x (was 2855c94).
git branch
* master
```
