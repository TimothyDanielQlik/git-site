# Amend commits from command line

Let's say that you have some more changes that you want to add to your latest commit.

## Latest commit - local branch

```bash
git commit --amend
```

This command will open the previous commit in either the vim editor or the Git Extension editor, depending on from where you are using the command line.

!!!Warning
    By amending a commit, you are changing history. So don't amend commits that are pushed to the remote.

## Not latest commit - local branch

Let's say my branch history looks like this:

```ASCII
* [new-branch] yet another file
* another file
* added 2
* 1
* [master][origin/master] fixed typos in yml file
```

There are 4 commits on `new-branch` since branching off from `master`. Now, I want to amend the commits because the commit messages are not helpful and they probably don't need to be independent commits.

```bash
git rebase -i origin/master
```

This command is called "interactive rebase" and it rewrites history. It says "interactively rebase the commits on the current branch starting from the commit above `origin/master`".

!!!Warning
    By amending a commit, you are changing history. So don't amend commits that are pushed to the remote.

This command will open the interactive rebase in either the vim editor or the Git Extension editor, depending on from where you are using the command line.

The editor will look like this following:

```bash
pick 2182c55 1
pick def77a0 added 2
pick f0a8fae another file
pick e746cea yet another file

# Rebase 239d957..e746cea onto 239d957 (4 commands)
#
# Commands:
# p, pick <commit> = use commit
# r, reword <commit> = use commit, but edit the commit message
# e, edit <commit> = use commit, but stop for amending
# s, squash <commit> = use commit, but meld into previous commit
# f, fixup <commit> = like "squash", but discard this commit's log message
# x, exec <command> = run command (the rest of the line) using shell
# d, drop <commit> = remove commit
# l, label <label> = label current HEAD with a name
# t, reset <label> = reset HEAD to a label
# m, merge [-C <commit> | -c <commit>] <label> [# <oneline>]
# .       create a merge commit using the original merge commit's
# .       message (or the oneline, if no original merge commit was
# .       specified). Use -c <commit> to reword the commit message.
#
# These lines can be re-ordered; they are executed from top to bottom.
#
# If you remove a line here THAT COMMIT WILL BE LOST.
#
#	However, if you remove everything, the rebase will be aborted.
#
#	
# Note that empty commits are commented out
```

Interactive rebase is like a program that is going to execute from top to bottom and rewrite the history of your branch. You need to provide the input on what the program is to do. 

```bash
pick 2182c55 1
pick def77a0 added 2
pick f0a8fae another file
pick e746cea yet another file
```

The default program will just _pick_ the commits and rewrite them. If you saved and closed the interactive rebase, git will rewrite the commits with new objects (new hashes) that are identical. So, you'd not see any real changes.

In the editor message, you'll see options that you have but we'll focus on _reword_ and _squash_.

Let's say that we want to squash all of these commits and we want to change the commit message so that it is more useful. In the editor, change the top commit to _reword_. When the program runs, git will look at the first commit and ask you to provide a new commit message, then rewrite that commit into the history. The next three commits, we want to squash into the first commit, so change _pick_ to _squash_. The editor should look like this.

```bash
reword 2182c55 1
squash def77a0 added 2
squash f0a8fae another file
squash e746cea yet another file
```

!!!Note
    Notice that the message is not changed in the rebase editor.

Click save (git extension) or save and close the editor.

The editor will close and then open again, this time, asking you for a new commit message. Enter the message and save.

```bash
Add 4 files for example

# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
#
# Date:      Thu Aug 2 14:09:24 2018 -0400
#
# interactive rebase in progress; onto 239d957
# Last command done (1 command done):
#    reword 2182c55 1
# Next commands to do (3 remaining commands):
#    squash def77a0 added 2
#    squash f0a8fae another file
# You are currently editing a commit while rebasing branch 'new' on '239d957'.
#
# Changes to be committed:
#	new file:   1.txt
#
```

The editor will close and open again, this time asking you to adjust the squash commit message. It will look like this.

```bash
# This is a combination of 4 commits.
# This is the 1st commit message:

Add 4 files for example

# This is the commit message #1:

added 2

# This is the commit message #2:

another file

# This is the commit message #3:

yet another file

# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
#
# Date:      Thu Aug 2 14:09:24 2018 -0400
#
# interactive rebase in progress; onto 239d957
# Last commands done (4 commands done):
#    squash f0a8fae another file
#    squash e746cea yet another file
# No commands remaining.
# You are currently rebasing branch 'new' on '239d957'.
#
# Changes to be committed:
#	new file:   1.txt
#	new file:   2.txt
#	new file:   3.txt
#	new file:   4.txt
#
```

You can actually remove everything except the message from the first commit: "Add 4 files for example".

Save and close. Now the branch will have a single commit containing all 4 files, with a new message.