# Fetch remote branches

When you first clone a repo, you only fetch the main branch — usually `master`. The repo may have many branches that are not automatically pulled onto your local machine. Follow these instructions to fetch remote branches.

## View remote branches

`git branch -r` — This command will list all branches that exist on the remote. 

```BDM@USOTT-BDM MINGW64 /c/git/git-site (fetchBranch)
$ git branch -r
  origin/HEAD -> origin/master
  origin/gh-pages
  origin/master
  origin/testBranch
```

!!! Note
    My current branch `fetchBranch` is not listed. This means my local branch is not on the remote.

## Fetch a remote branch

`git fetch origin testBranch` — This command will ftech the branch meaning it will add the branch information to your working area (not the index). You will need to checkout the branch to add the branch to your index.

Run the following command: 

`git checkout testBranch` — This command will switch to the `testBranch` branch and add it to the index. 

