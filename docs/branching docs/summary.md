# Microsoft document

## How to do a feature branch

- Feature branches to do local work and bug fixes
- JIRA/name (feature branches)
- Branch from master
- All work needs to be under a feature flag. This prevents unfinished work from being deployed.

They suggest all merges are reviewed under pull request (this is really for developer code)

- I don't think writers want or need to have their work reviewed when working on local features.
- They suggest keeping master 100% deployable anytime
  - this means master will need to be checked with every

### Summary thus far

```ASCII
master branch           A------D------------I
                         \    / \          /     (merges are via pull request)
JIRA-X/writer             B--C   E--F--G--H
```

## How to do a release branch

- Release branches are for the help site release
- Release/version (release branches)
- Branch from master
- Long-lived release (until no longer supported)
- Feature branches are branched off of release to handle bugs or hot fixes
- These branches are merged under a pull request

### Summary thus far

```ASCII
Bug/writer                                                 O--P
                                                          /    \
Bug/writer                                      K--L--M  /      \
                                               /       \/        \
release/version                               J---------N---------Q
                                             /
master branch           A------D------------I
                         \    / \          /     (merges are via pull request)
JIRA-X/writer             B--C   E--F--G--H
```

**Important:** Bug fixes and hot fixes must be cherry-picked back to master to prevent regression of code. Do not merge the release branch into master.

```ASCII
Bug/writer                                   O--P
                                            /    \
Bug/writer                        K--L--M  /      \
                                 /       \/        \
release/version                 J---------N---------Q
                               /
master branch           A--D--I-----------(KLM)-----(OP)   (bug fixes squashed and cherry picked)
```

## Full example using this branching strategy

### Repo details

**Name**: test-area

```ASCII
test-area |
          -chapter1
          |       |
          |       -section1
          |       -section2
          |       -section3
          |
          -chapter2
                  |
                  -section1
                  -section2
                  -section3
```

The goal of this example is to add a section4 doc to chapter1. This will be done as a feature branch. Then for a release, I will create a bug branch and add section4 to chapter2.

**Note:**

I don't think pull requests are the way to go with the daily work.
Pull requests can be done from CLI but this is not straight forward.
The easiest way is to initate a pull request via GitHub.
This also means that writers would need to push their local
branches to the remote which adds an unnecessary level of complexity.

**JIRA-XXX/kyle**: my feature branch to add a new section to chapter 1.

#### Steps for features:

1. `git pull` master to sync latest changes to master.
2. `git checkout -b JIRA-XXX/kyle` to create my local branch.


```bash
BDM@usott-bdm MINGW64 /c/git/test-area (master)
$ git pull
Already up to date.

$ git checkout -b JIRA-XXX/kyle
Switched to a new branch 'JIRA-XXX/kyle'
```

3. Do my work
4. `git add .` to add my changes to the index.
5. `git commit -m "JIRA-XXX/kyle: wrote section 3 for chapter 1.` to commit my work to the repository (my branch)
6. `git checkout master` to switch back to the master branch.

```bash
BDM@usott-bdm MINGW64 /c/git/test-area (JIRA-XXX/kyle)
$ cd chapter1

$ ls
section1.txt  section2.txt  section3.txt

$ touch section4.txt

$ ls
section1.txt  section2.txt  section3.txt  section4.txt

$ cd ..

$ git status
On branch JIRA-XXX/kyle
Untracked files:
  (use "git add <file>..." to include in what will be committed)

        chapter1/section4.txt

nothing added to commit but untracked files present (use "git add" to track)

$ git add .

$ git commit -m "JIRA-XXX/kyle: added section 4 to chapter 1"
[JIRA-XXX/kyle 7dc183a] JIRA-XXX/kyle: added section 4 to chapter 1
 1 file changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 chapter1/section4.txt

$ git checkout master
Switched to branch 'master'
Your branch is up to date with 'origin/master'.
```

7. `git pull` to sync any changes on master before I merge my changes.
8. `git merge JIRA-XXX/kyle` to merge my local branch into master.
9. `git push` to push the changes upstream.

```bash
BDM@usott-bdm MINGW64 /c/git/test-area (master)
$ git pull
Already up to date.

$ git merge JIRA-XXX/kyle
Updating f14bfac..7dc183a
Fast-forward
 chapter1/section4.txt | 0
 1 file changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 chapter1/section4.txt

$ git push
Counting objects: 3, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (3/3), done.
Writing objects: 100% (3/3), 326 bytes | 326.00 KiB/s, done.
Total 3 (delta 1), reused 0 (delta 0)
remote: Resolving deltas: 100% (1/1), completed with 1 local object.
To https://github.com/kyleweishaar/test-area.git
   f14bfac..7dc183a  master -> master

```

**Note:** Look at the commit [history](https://github.com/kyleweishaar/test-area/commits/master)

If 14 writers are making many merge commits often to master, then the commit history can get a bit messy.

#### Steps for release:

1. `git checkout master` to make sure you are on the master branch
2. `git pull` to sync your copy of master
3. `git checkout -b release/version` to create the release branch (this branch must be tracked which means that there is an additional step of pushing the branch upstream)
4. `git push --set-upstream origin release/version` to track the branch upstream

```bash
BDM@usott-bdm MINGW64 /c/git/test-area (master)
$ git checkout master

$ git pull
Already up to date.

$ git checkout -b release/version
Switched to a new branch 'release/version'

$ git push --set-upstream origin release/version
Total 0 (delta 0), reused 0 (delta 0)
To https://github.com/kyleweishaar/test-area.git
 * [new branch]      release/version -> release/version
Branch 'release/version' set up to track remote branch 'release/version' from 'origin'.
```

5. `git checkout -b bug-XXX/kyle` to create a bug branch for this release
6. do work

```bash
BDM@usott-bdm MINGW64 /c/git/test-area (release/version)
$ git checkout -b bug-XXX/kyle
Switched to a new branch 'bug-XXX/kyle'

$ git status
On branch bug-XXX/kyle
Untracked files:
  (use "git add <file>..." to include in what will be committed)

        chapter2/section4.txt

nothing added to commit but untracked files present (use "git add" to track)

$ git add .

$ git commit -m "bug-XXX/kyle: section 4 for chapter two was not added. Re-added the section4 for chapter 2"
[bug-XXX/kyle 4e0533f] bug-XXX/kyle: section 4 for chapter two was not added. Re-added the section4 for chapter 2
 1 file changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 chapter2/section4.txt
```

7. `git checkout release/version` to switch to the release branch
8. `git pull` to sync your copy of release
9. `git rebase bug-XXX/kyle` to rebase your bug branch commits ontop of release branch
9. `git push` to push release branch to the remote

```bash
BDM@usott-bdm MINGW64 /c/git/test-area (bug-XXX/kyle)
$ git checkout release/version
Switched to branch 'release/version'

$ git rebase bug-XXX/kyle
First, rewinding head to replay your work on top of it...
Fast-forwarded release/version to bug-XXX/kyle.

$ git status
On branch release/version
Your branch is ahead of 'origin/release/version' by 1 commit.
  (use "git push" to publish your local commits)

nothing to commit, working tree clean

$ git push
Counting objects: 2, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (2/2), done.
Writing objects: 100% (2/2), 283 bytes | 283.00 KiB/s, done.
Total 2 (delta 0), reused 0 (delta 0)
To https://github.com/kyleweishaar/test-area.git
   7dc183a..4e0533f  release/version -> release/version
```

#### Steps for cherry-picking bug work back to master:

1. `git checkout master`
2. `git pull` to sync master
3. `git merge --squash bug-XXX/kyle` to squash the commits on bug branch and cherry pick to master
4. `git commit -m "message"` to commit it to master (vim editor - see help writing resources for instructions)
5. `git push` to push changes to master

```bash
BDM@usott-bdm MINGW64 /c/git/test-area (release/version)
$ git checkout master
Switched to branch 'master'
Your branch is up to date with 'origin/master'.

$ git pull
Already up to date.

$ git merge --squash bug-XXX/kyle
Updating 7dc183a..4e0533f
Fast-forward
Squash commit -- not updating HEAD
 chapter2/section4.txt | 0
 1 file changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 chapter2/section4.txt

$ git status
On branch master
Your branch is up to date with 'origin/master'.

Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

        new file:   chapter2/section4.txt

$ git commit .
[master 9479a5f] Example of a squash commit Squashed commit of the following:
 1 file changed, 0 insertions(+), 0 deletions(-)
 create mode 100644 chapter2/section4.txt

$ git status
On branch master
Your branch is ahead of 'origin/master' by 1 commit.
  (use "git push" to publish your local commits)

nothing to commit, working tree clean

$ git push
Counting objects: 2, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (2/2), done.
Writing objects: 100% (2/2), 383 bytes | 383.00 KiB/s, done.
Total 2 (delta 0), reused 0 (delta 0)
To https://github.com/kyleweishaar/test-area.git
   7dc183a..9479a5f  master -> master
```

## Summary

This branching strategy works well and can be done by writers using only the command line using only a few git commands.

I do not think that pull requests are necessary for daily work. Since this branching strategy assumes 1 static master branch to which everything is merged, pull requests would create an unnecessary bottle neck.

The release process is straight forward. I showed an example using rebase because that is what we talked about in stand-up today. This could be accomplished all the same with simple merge commits.

From build perspective:

* LD = `master` with toggles turned off
* RC = `master` with toggles turned on
* release branch = `release/version`

Main take-aways:

* master is sacred (all content is merged to master)
* all work is toggled
* release fixes, bug fixes, hotfixes are done on local branches that are branched off of the release.
* release _never_ merges back into `master`.
* all commits (work) that are rebased ontop of release _must also_ be cherry-picked to `master` to ensure there is no content disparity (content that is on release but not on master)