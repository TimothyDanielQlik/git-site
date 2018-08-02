# Amend commits from command line

Let's say that you have some more changes that you want to add to your latest commit.

## Example

```bash
git commit --amend
```

This command will open the previous commit in either the vim editor or the Git Extension editor, depending on from where you are using the command line.

!!!Warning
    By amending a commit, you are changing history. So don't amend commits that are pushed to the remote.