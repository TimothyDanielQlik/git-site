# Git branching strategy for documentation

First, the problem that I see with the Microsoft branching strategy and others like it, is that they assume that development is checked and tested before being merged into master. Part of the verification process for writers is to check the visual output of the documentation. For this, we need to be able to continuously push feature work to a branch and then build that branch. Work being pushed to this branch may break the build.

What we want:

1. As few public/shared branches as possible.
2. A simple workflow with simple commands (work can be done through CLI by any writer).
3. To avoid delays and problems due to merge conflicts or bad commits (isolate problems).
4. Maintain many releases.

## Minimum branches

### Shared/public

```ASCII
daily ---------------------------
(writers do daily merge commits to daily)
(writers create feature branches from daily)

master --------------------------
(writers cherry pick squashed commits to master)
(nothing merges into master)

relase/version-(n) --------------
(engineers create releases from master)
(writers do infrequent merge commits or cherry-pick to release branch)
```

### Local/private
```ASCII
feature/JIRA -------------------
(always local, never long-lived)

bug/JIRA -----------------------
(always local, never long-lived)
```

## Branch interactions

### Feature branches

- Writers create local branches from `daily` which is a branch from `master`.

- Writers make merge commits early and often to `daily` to verify output.

- Feature conditions are still relevant because as these are the easiest way to turn feature on/off.

```ASCII
(same letter = same commit)

master A
        \
daily    A --------------F---H--I------L---M
          \             /   /  /      /   /
feature/x  A--B--C--D--E---G--/---J--K   /
            \                /          /
feature/y    A-----Z--Y--X--W--V--U----T
```

The reason I suggest we do this is to allow writers to continue working in the same way they are with TFS: that is, pushing many changes, big and small, to the branch to kick off a build. Sometimes they break a build and they need to roll back changes or ask someone else to help them fix the build. This can be time consuming. Since we always have a clean `master`, even a complete destruction of `daily` is not that bad. We can recreate it via master and local feature branches.

Since we are doing merge commits, we can simply revert the merge-commit which will remove everything associated with that feature branch.

#### Revert a merge commit

Assume that someone does a merge commit and the build breaks. They know it is something wrong with their commit but they don't know what. We can simply revert the commit and then push changes to remote.

```bash
Example of a revert commit

BDM@usott-bdm MINGW64 /c/git/test-area/chapter1 (daily)
$ git pull

$ git log --oneline -2 (the number specifies how many commits to show, if empty, shows all)

bc79a23 (origin/daily, origin/master) removed old files
e664efc (HEAD -> daily, origin/master) Some message

$ git revert e664efc

[daily f89f948] :Revert "Some message"
 4 files changed, 3 deletions(-)
 delete mode 100644 chapter1/3.txt
 delete mode 100644 chapter1/section
 delete mode 100644 chapter1/section2.txt

$ git push

$ git log --oneline -3
f89f948 (HEAD -> master, origin/master) :Revert "Some message"
bc79a23 (origin/daily, daily) removed old files
e664efc (HEAD -> daily, origin/master) Some message
```

After we re-run the log we can see there is a new commit at the top that is prefixed with "Revert". Now the changes from the writer's merge commit is undone via another commit, and the build should be fixed.

#### From a build perspective

- LD = `daily` with toggles turned off.

- RC = `daily` with toggles turned on.

  - After the work is checked on `daily`, the local branch should be squash-merged and cherry-picked to `master`, and then deleted.

### Master branch

- `master` has a linear history, so no merge commits to `master`, only cherry-pick.

- This also reduces the number of commits on master. The commit history should be 1 commit per feature or large, releasable chunk of work.

- This makes the history of `master` branch much easier to follow.

#### Cherry-pikcing to master

```ASCII
master A--------------N----O    (N and O are the two cherry-picked features)
        \
daily    A--F--H--I--L--M...    (these are all the commits from the writer's work)
          \ 
feature/x  A--------------N     (N is the squashed commits from feature x)

feature/y  A-------------O      (O the squashed commits from feature y)
```

- Before a release, `master` is merged _into_ daily.

- By doing this, `master` and `daily` stay in sync (in theory, even without this merge, daily is in  sync, but this is an extra step to make sure nothing gets missed).

```ASCII
master A--N---------------O (master maintains linear commit history)
        \                  \
daily    A--F--H--I--L--M---P (P is the merge commit from master)
```

## Releasing

- Release branches are branched off of `master` and then they live until no longer supported.

- To build a public and permanent release branch, branch off of `master`.

```ASCII
release/version-1.0  C
                    /
master A--B--------C
```

- Feature work on a release branch is small, and most often it is patches, quick fixes, and other small changes.

- This work should also be done on local (bug or feature) branches.


```ASCII
bug/z                  O--M--N (bug/z from release; merge back into release)
                      /       \
release/version-0    O---------Q
                    /
master A--N--------O
```

- Most often, the bug fix will need to be added to other release branches, and master.

- Squash commits and cherry pick or merge to any release branch.

- Always cherry-pick to `master`

```ASCII
bug/z                  O--(MN) (squashed commits of bug/z)
                      /      \
release/version-0    O--------Q
                    /
master A--N--------O--(MN) (cherry-pick)

release/version-1.2    Y--(MN) (cherry-pick)

release/version-0.1    X--(MN) (cherry-pick)
```

- When the fix is cherry-picked to all relevant branches, delete the local branch.

- After a release, merge `master` back into `daily`, again, just to prevent diversion of `master` and `daily`.

```ASCII
release/version-1.2    Y--(MN)

release/version-0.1    X--(MN)

release/version-0    O--P--Q
                    /
master A--N--------O--(MN)
                       \
daily                P--R
```

### Few commands to learn

All of this can be done with very few commands:

|git | result |
|---|---|
|git add|adds changed content from working directory and adds it to index|
|git commit|commits content from index to repository|
|git push|moves local content to the remote|
|git pull|grabs remote content and merges it to the local copy|
|git merge|merges two branches together|
|git merge --squash|squashes the commits on a branch and stages them on another|
|git checkout|switch to a branch|
|git checkout -b|creates a branch and checks it out|
|git branch -d|delete a branch|

90% of the work can be done with the commands above.

## Full example using this branching strategy

### Repo details

**Name**: test-area

```ASCII
test-area |
          -chapter1
          |       |
          |       -section1

          -chapter2
                  |
                  -section1
```

The goal of this example is to show how writers would create feature branches, interact with master, and produce multiple releases.

### Feature

- feature branch created from daily.

- do work on feature branch.

```bash
BDM@usott-bdm MINGW64 /c/git/test-area (daily)
$ git branch
* daily
  master

$ git checkout -b feature/kyle
Switched to a new branch 'feature/kyle'
```

- add section 2 to each chapter

```bash
BDM@usott-bdm MINGW64 /c/git/test-area (feature/kyle)
$ git status
On branch feature/kyle
Untracked files:
  (use "git add <file>..." to include in what will be committed)

        chapter1/section2.txt
        chapter2/section2.txt

nothing added to commit but untracked files present (use "git add" to track)

$ git add .

$ git commit -m "added sections for each chapter"
[feature/kyle 1043072] added sections for each chapter
 2 files changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 chapter1/section2.txt
 create mode 100644 chapter2/section2.txt
```

- merge feature to daily

- push daily to remote

```bash
(brief example)

BDM@usott-bdm MINGW64 /c/git/test-area (feature/kyle)
$ git checkout daily
Switched to branch 'daily'
Your branch is up to date with 'origin/daily'.

$ git pull
Already up to date.

$ git merge feature/kyle

$ git push
```

- add two more sections to chapter 1

- merge to daily

```bash
(full example) 

BDM@usott-bdm MINGW64 /c/git/test-area (daily)
$ git checkout feature/kyle
Switched to branch 'feature/kyle'

$ git status
On branch feature/kyle
Untracked files:
  (use "git add <file>..." to include in what will be committed)

        chapter1/section4.txt
        chapter1/setion3.txt

nothing added to commit but untracked files present (use "git add" to track)

$ git add .

$ git commit -m "added two more sections to chapter 1"
[feature/kyle bbfa206] added two more sections to chapter 1
 2 files changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 chapter1/section4.txt
 create mode 100644 chapter1/setion3.txt

BDM@usott-bdm MINGW64 /c/git/test-area (feature/kyle)
$ git checkout daily
Switched to branch 'daily'
Your branch is up to date with 'origin/daily'.

$ git pull
Already up to date.

$ git merge feature/kyle
Updating 1043072..bbfa206
Fast-forward
 chapter1/section4.txt | 0
 chapter1/setion3.txt  | 0
 2 files changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 chapter1/section4.txt
 create mode 100644 chapter1/setion3.txt

$ git push
Counting objects: 3, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (3/3), done.
Writing objects: 100% (3/3), 337 bytes | 337.00 KiB/s, done.
Total 3 (delta 0), reused 0 (delta 0)
To https://github.com/kyleweishaar/test-area.git
   1043072..bbfa206  daily -> daily

```

**Note:** This always results in FF merge because I am working by myself. There would be more merge commits when collaborating with others.

```ASCII
What I have done so far (ignoring the fact that in my example it was a FF merge)

master     A
            \
daily        A------C--E
              \    /  /
feature/kyle   A--B--D
```

- Verify/review with other writer if needed.

- Feature = OK then cherry pick to master

```bash
BDM@usott-bdm MINGW64 /c/git/test-area (daily)
$ git checkout master
Switched to branch 'master'
Your branch is up to date with 'origin/master'.

BDM@usott-bdm MINGW64 /c/git/test-area (master)
$ git pull
Already up to date.

$ git merge --squash feature/kyle
Updating 3c6092a..bbfa206
Fast-forward
Squash commit -- not updating HEAD
 chapter1/section2.txt | 0
 chapter1/section4.txt | 0
 chapter1/setion3.txt  | 0
 chapter2/section2.txt | 0
 4 files changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 chapter1/section2.txt
 create mode 100644 chapter1/section4.txt
 create mode 100644 chapter1/setion3.txt
 create mode 100644 chapter2/section2.txt

$ git status
On branch master
Your branch is up to date with 'origin/master'.

Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

        new file:   chapter1/section2.txt
        new file:   chapter1/section4.txt
        new file:   chapter1/setion3.txt
        new file:   chapter2/section2.txt
```

- The `merge --squash` command squashes and stages the commit.

- Now, it needs to be committed and pushed to master

```bash
BDM@usott-bdm MINGW64 /c/git/test-area (master)
$ git add .

$ git commit -m "Adding squash commit from JIRA/kyle"
[master 37dd887] Adding squash commit from JIRA/kyle
 4 files changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 chapter1/section2.txt
 create mode 100644 chapter1/section4.txt
 create mode 100644 chapter1/setion3.txt
 create mode 100644 chapter2/section2.txt

$ git push
Counting objects: 4, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (4/4), done.
Writing objects: 100% (4/4), 398 bytes | 398.00 KiB/s, done.
Total 4 (delta 0), reused 0 (delta 0)
To https://github.com/kyleweishaar/test-area.git
   3c6092a..37dd887  master -> master
```

- feature branch can now be deleted

- **Note:** use -D (force delete) because the branch was not merge-commited, git throws a merge error.

- merge `master` into `daily` to keep in sync

```bash
BDM@usott-bdm MINGW64 /c/git/test-area (master)
$ git branch -D feature/kyle
Deleted branch feature/kyle (was bbfa206).

$ git checkout daily
Switched to branch 'daily'
Your branch is up to date with 'origin/daily'.

BDM@usott-bdm MINGW64 /c/git/test-area (daily)
$ git pull
Already up to date.

$ git merge master
Merge made by the 'recursive' strategy.
```

```ASCII
What I have done so far

master     A-----------(BD)
            \            \
daily        A------C--E--F (merge master into daily)
              \    /  /
feature/kyle   A--B--D --> (BD) squashed and then deleted
```

## Release

Before the first ever release, the state of the branches would look like this, where the release branch comes from `master`.

```ASCII
Where (BD) = C and E = G
release                   G
                         /
master     A-----------(BD)
            \            \
daily        A------C--E--F (F is the merge commit of master into daily)
```

- Any bug fixes etc. must be done on local branches

- bug branch are merged into the release branch

```bash
BDM@usott-bdm MINGW64 /c/git/test-area (daily)
$ git checkout master
Switched to branch 'master'
Your branch is up to date with 'origin/master'.

BDM@usott-bdm MINGW64 /c/git/test-area (master)
$ git pull
Already up to date.

(I did not yet have a release branch on my test repo)
$ git checkout -b release/version
Switched to a new branch 'release/version'

BDM@usott-bdm MINGW64 /c/git/test-area (release/version)
$ git checkout -b bug/kyle
Switched to a new branch 'bug/kyle'
```

- Let's say the bug fix is just a typo or some minor fix.

- We do that on bug branch and merge to release/version

```bash
BDM@usott-bdm MINGW64 /c/git/test-area (bug/kyle)
$ git status
On branch bug/kyle
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

        modified:   chapter1/section1.txt

no changes added to commit (use "git add" and/or "git commit -a")

$ git add .

$ git commit -m "HLP-1, bug fix for type in section 1"
[bug/kyle 6227f77] HLP-1, bug fix for type in section 1
 1 file changed, 1 insertion(+)

$ git checkout release/version
Switched to branch 'release/version'

BDM@usott-bdm MINGW64 /c/git/test-area (release/version)
$ git merge bug/kyle
Updating 37dd887..6227f77
Fast-forward
 chapter1/section1.txt | 1 +
 1 file changed, 1 insertion(+)
```

```ASCII
so far...

bug/kyle                    G
                           / \
release                   G   H
                         /
master     A-----------(BD)
            \            \
daily        A------C--E--F
```

- We also need that bug added to master

- Then we can delete that bug branch now since it was checked on the release branch, and there are no other release branches to add the work to.

- These commands are the same as working from feature to master so I won't repeat them.

- Once a release branch is created, it is permanent.

```ASCII
release/3.0                        O-Q---
                                  /
release/2.0                  L--P/----
                            /   /
release/1.0           G--H-/---/---
                     /    /   /
master     A-------(BD)---L--O---
            \        \     \  \
daily        A--C--E--F--K--M--N---
```

- Patches and minor releases are branches off of the major release.

```ASCII
release/2.1                         P--R----
                                   /
release/3.0                       / O-Q---
                                 / /
release/2.0                  L--P /----
                            /    /
release/1.0           G--H-/--- /---
                     /    /    /
master     A-------(BD)---L---O---
            \        \     \   \
daily        A--C--E--F--K--M---N---
```

### The 12 Rules of Engagement

1. All writing work is done on local branches.

1. Daily work is _merged_ to `daily`.

1. Features are _cherry-picked_ to `master`.

1. Feature branches are deleted once cherry-picked to `master`.

1. `master` merges _into_ `daily` before release.

1. Releases are created from `master`.

1. Bug branches created from `release/version`.

1. Bug branch merged into `release/version`.

1. Bug is _cherry-picked_ to other release branches if needed, and to `master`.

1. `master` merges _into_ `daily` after release.

1. Bug branch deleted after _cherry-picked_ to other branches.

1. Releases do not merge back into `master`.
