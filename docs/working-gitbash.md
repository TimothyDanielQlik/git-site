# Working on a file with Git Bash

The majority of our work involves creating and editing individual files. We can use Git Bash to do things like see file changes, stage files, commit files, and stash changes.

## Prerequisites

You should be familiar with the basic git commands using Git Bash.

* [Tips for using Git Bash](commandline-tips.md)

Either before of after, and to use as a reference anytime, the cheat sheet is a quick walk through of the basic Git Bash commands.

* [Git Bash Cheat Sheet](commands.md)

!!! Tip
    If Git Bash goes into interactive shell mode when you are running the commands on this page, you can type `q` then hit `Enter` to return to the command shell. If you enter vim (the shell-bashed text editor), hit `esc` then type `x`, then hit `enter`.

## See the changes to a file

When you start to edit a file in a git repo, git keeps tracks of the change and places the file in an _unstaged_ state.

* Run: `git status`

```bash
git status
On branch master
Your branch is up to date with 'origin/master'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

        modified:   text.md

no changes added to commit (use "git add" and/or "git commit -a")
```

Beside **modified**, git lists the files that have changed. We can see the difference in Git Bash.

* Run: `git diff <file-name>`

```bash
git diff text.md
diff --git a/text.md b/text.md
index a791549..818c005 100644
--- a/text.md
+++ b/text.md
@@ -1,9 +1,4 @@
-# Title
+# Gaius Marius
```

Git shows the difference of _unstaged_ files relative to the index (the current file version on git). In other words, git shows what changes can be added to the index.

The change is shown like this:

```bash
-# Title
+# Gaius Marius
```

"\# Title" is removed and "\# Gaius Marius" is added.

## Stage the file and/or changes

Files in git are in one of three states:

* _unstaged_ (they are being worked on - not in index)
* _staged_ (they are ready to be committed - added to index)
* _committed_ (they have been pushed to a branch - committed to branch)

When you make changes to a file or files, git tracks those files and their chages.

Run: `git status`

```
git status
On branch master
Your branch is up to date with 'origin/master'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

        modified:   text.md
        modified:   text_3.md

no changes added to commit (use "git add" and/or "git commit -a")
```

So far, I've change two files. They appear beside modified, and they should be highlighted in red in your Git Bash shell.

```bash
modified:   text.md
modified:   text_3.md
```

### Stage all

If you have many files to stage, use a shorthand command to stage all.

Run `git add .` or `git add --all` or `git add -A`. Stage individual files with `git add <file>`.

```bash
git add --all
git status
```

The previously _unstaged_ files are now _staged_ and they appear in green.

To _unstage_ the newly _staged_ files, run `git reset` or `git reset HEAD <file>` to unstage a specific file.

```bash
git reset HEAD text.md
git reset HEAD text_3.md
```

### Stage hunks

You can stage a subset of the file by staging hunks. You can do this with the `git add -p` or `git add --patch` command. Git determines hunks by proximity/distance. Changes that are close together are _hunked_ together.

First, run `git status` to see your _unstaged_ files, then run `git add -p <file-name>` to open the `diff` in Git Bash. Git will show you each hunk and ask you what to do in interactive shell mode.

If Git calculates multiple hunks, Git will show you one hunk at a time. After the hunk, Git gives the following options:

|Option |What it does|
|---    |---         |
|`y`|Yes, stage this hunk.|
|`n`|No, don't stage this hunk.|
|`q`|Quit, clear this command.|
|`a`|Stage this and all hunks.|
|`d`|Don't stage this or any hunks.|
|`/`|Search for a hunk given a regex.|
|`e`|Edit the current hunk.|
|`?`|Print help|

Say that I only want to commit one hunk, not the other. I type `y` then hit `Enter` to stage the first hunk. Then I type `n`, then hit `Enter` to not stage the second hunk. Now, when I run `git status`, I see the same file in both _unstaged_ (Changes to be committed) and _staged_ (Changes not staged for commit) states. This represents the two hunks of the same file.

```bash
git status
On branch master
Your branch is ahead of 'origin/master' by 1 commit.
  (use "git push" to publish your local commits)

Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

        modified:   README.md

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

        modified:   README.md
```

The reason to do this might be to have a specific changeset associated with a single commit. This is useful when you want to reverse commit some changes or you want a more granular and focused commit history.

### Split hunks with patch

If you have a file that you want to stage in hunks, but it only shows you one hunk, you can force a split.

After running `git add -p <file-name>`, print the patch help by entering `?` option. Notice that you have more options than what's displayed.

`s - split the current hunk into smaller hunk`

Enter `s` and press enter. If git is able to automatically split the hunk, it will. If the hunk cannot be split, you'll have to do this manually with a GUI like Sourcetree (or read the git documentation to do this manually with Git Bash: [Git Tools - Interactive Staging](https://git-scm.com/book/en/v2/Git-Tools-Interactive-Staging)).

!!! Info
    I am not documenting splitting hunks with Git Bash because it is much easier just to use Sourcetree. </br>See how you can do this with a GUI: [Stage the file and/or changes](working-gitExt.md#stage-the-file-andor-changes).

## Commit file changes to a branch

Your files are staged, now you commit.

Run `git commit` to commit the changes.

```bash
git commit -m "some message"
```

Use the `-m` flag to add a commit message. Messages should be succinct and useful. Include the JIRA if possible.

Run `git status`.

If you've staged and committed all of the tracked files, you'll notice that when you run `git status` there is nothing to commit but that you are ahead of `origin/master`.

```bash
git status
On branch master
Your branch is ahead of 'origin/master' by 1 commit.
  (use "git push" to publish your local commits)

nothing to commit, working tree clean
```

You need to push your changes to the remote. If your branch is tracked upstream, run `git push`.

If you do not yet have an upstream branch, you'll have to set the upstream remote.

```bash
git push -u origin <branch-name>
```

or

```bash
git push --set-upstream origin <branch-name>
```

To learn about branching, and tracking branches upstream, see: [Branching with Git Bash](branch-gitbash.md).

## Stash file changes for later

You can stash changes to a file with the `git stash` command. Stash stores the changes to a file and the index, and returns to a clean working directory. This is helpful when you are making changes to a file that you do not yet want to commit to a branch, but that you don't want to lose.

There are a couple ways to do this. If we have a single file that has changes, we can stage and then stash.

```bash
git add <file>
git stash save "A good stash message"
```
This creates a stash with the appended message and returns your index to a clean state.

Run `git status` to see that the _staged_ file is no longer there.

Run `git stash list` to see your stash.

```bash
git stash list
stash@{0}: On master: a good stash message
```

You can create as many stashes as you want.

If I make another change to the file and stash it again, see what happens.

```bash
git stash list
stash@{0}: On master: another really good stash message
stash@{1}: On master: a good stash message
```

Notice that the first stash changed its index: stash@{1}. This is a zero-based index which means that 0 is the first item in the index.

To apply a stash, use `git stash apply`

Now, we have two stashes in the index: 0 and 1.

`git apply` by default applies the stash at the top of the index. When you apply a stash, it is brought back into the working directory in an _unstaged_ state. You need to run `git add` to stage it and `git commit` to commit it.

`git apply` does not delete the stash, so it remains in the index.

`git stash pop` applies the top stash and deletes it.

You can select the stash to apply by specifying the index.

```bash
git stash apply stash@{1}
```

This would apply the second stash, at index position 1.

To force delete a stash, use `git stash drop stash@{index}`.

To delete all stashes, use `git stash clear`.

## Recommit a file to a previous version

Sometimes you need to return a file to a previous version. You can do this with Git Bash by restoring a specific file to the state it was in for a given commit.

You need to take several steps:

1. Find the commit hash that you want to restore.
1. Check the file.
1. Checkout the file from that commit.
1. Commit the file again.

### Find the commit hash

You can see a quick commit history by running `git log`. This command returns a list of commits and their SHA1s, dates, and commit messages. You might want to see a history for a specific file rather than the commit history of a branch. Run the following command to get a file history for a specific file.

```bash
git log -p -- <file-name>
```

You'll see a commit history with the file changes at each commit

If the file has been renamed, use the `--follow` flag to track a file across name changes.

```bash
git log --follow -p -- <file-name>
```

When you see the commit you want to recommit, copy the first 6 digits of the SHA1.

### Check the file

To see all of the file changes at a commit, use `git diff`.

```bash
git diff -p <hash> -- <file-name>
```

The `-p` flag prints the patches (the changes) for the file at the specific commit <hash\>.
You'll see the patches for the named file for the specified commit.

You can see the state of the file (what the file looked like) at this commit wit `git show`.

```bash
git show <hash>:<file-name>
```

You'll see the state of the file at this commit. You won't see what patches are associated with the commit.

### Checkout and recommit

To restore the file to a previous version, run the following commands.

```bash
git checkout <hash> -- <file-name>
git add <file-name>
git commit -m "restoring <file-name> to previous commit"
git push
```

If you run `git log` again, your new commit will appear at the top.
