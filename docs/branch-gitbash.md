# Create a Branch with Git Bash

Follow along as I create a branch in the writing-resources repo.

First, notice that I am currently in the git repo for this documentation project, and that I am on the `master` branch.

```bash
BDM@usott-bdm MINGW64 /c/git/writing-resources (master)
$
```

Next, I'll create a branch called `develop`.

```bash
git branch develop
```

This command creates a new branch `develop` based on `master` (because I am on master).

I can list my branches with `git branch`.

```bash
git branch
develop
*master
```

The (*) indicates that I am on master, but there are two branches.

To switch branches, I use `git checkout`.

```bash
git checkout develop
```

This command switches your current branch.

I can combine the two previous commands into one, so I create and checkout at the same time:

```bash
git checkout -b <branch-name>
```

My new branch is only on my machine. It won't appear on Github unless I push it to the remote (Github). For development branches this is required. For personal work, it is optional. If my work is only for me and I don't need to share it with anyone until it is finished, then I can leave it as a local branch.

However, I want this branched to be tracked so others can help me on this document. I need to push my branch upstream and set it to track changes.

```bash
git push --set-upstream origin develop
```

The shorthand for this is:

```bash
git push -u origin <branch-name>
```

Now I have a new branch that is both on my machine and on GitHub.