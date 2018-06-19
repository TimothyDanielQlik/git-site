# Squash and Merge with GitBash

Let's learn how to squash merge!

## What to do

First, assume you have two branches:

* `work-branch`

* `squash-branch`

We'll do work on `work-branch` and then squash merge into `squash-branch`.

??? Note
    Squashing is only useful when you have many commits.

```ASCII
A--B--C--D (work-branch)
```

Above, we have 4 commits on `work-branch`. I want to squash them so that I have a single commit that represents all of that work. Then, I want to merge that commit with my `squash-branch`.

```bash
git checkout squash-branch
git merge --squash work-branch
Updating 0d02a7f..57ba06a
Fast-forward
Squash commit -- not updating HEAD
 New Text Document (2).txt | 0
 New Text Document (3).txt | 0
 New Text Document (4).txt | 0
 New Text Document.txt     | 0
 4 files changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 New Text Document (2).txt
 create mode 100644 New Text Document (3).txt
 create mode 100644 New Text Document (4).txt
 create mode 100644 New Text Document.txt

```

This command told git to first, checkout the branch we want to merge into. Next, it says to squash `work-branch`. Git will list the files from each commit and then stage those files again.

```bash
git status
On branch squash-branch
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

        <your changes>
```

We need to commit those files.

```bash
git commit #
```

This commits the files and opens up the vim editor. The vim editor lets you type into the bash shell and then save the message. Your shell will look something like the following:

```bash
Squashed commit of the following:

commit ...
author: ...
date: ...

    <message>

commit ...
author: ...
date: ...

    <message>

...
```

Press `Insert` on your keyboard. The cursor appears, find it by using the up or down arrows. You want to leave a message above the first line.

```bash
<some message should go here>
Squashed commit of the following:

commit ...
author: ...
date: ...

    <message>

commit ...
author: ...
date: ...

    <message>

...
```

To save your message, press `esc` and then `:x`. You should be taken back to the shell. It should look like this, with your message at the top:

```bash
git commit #
[squash-merge 3bde628] Some message here: Squashed commit of the following:
 5 files changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 New Text Document - Copy (2).txt
 create mode 100644 New Text Document - Copy (3).txt
 create mode 100644 New Text Document - Copy (4).txt
 create mode 100644 New Text Document - Copy.txt
 create mode 100644 New Text Document.txt
```

## What happened

Git took the commits on your branch and squashed them. Then, git placed that commit on the branch you had checked out. The result is not a true merge but more like a cherry-pick.

```ASCII
(my-branch) B--C--D --> becomes --> E (all commits squashed)

(squash-branch) A -- E (commit E gets placed onto squash branch)
```