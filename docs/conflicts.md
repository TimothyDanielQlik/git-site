# Conflicts

Merge conflicts can happen when:

1. You merge changes where a document(s) are in conflict.
1. Edit a file that as been deleted.

Sometimes, things can become messy when many people are working on the same stuff. Fixing conflicts is pretty easy though, especially with the right tools.

On a single branch, each subsequent commit replaces the previous.

```ascii
A---B---C---D ... (feature-a)
```

When you merge, conflicts can happen.

```ascii
A---B---C---G (feature-a-albin)
\          /
 D---E----F (feature-a-tove)
```

If the same file has changed on both branches, which version, F or C, is correct when you merge to create G?

### Using an external merge tool

If you are using a GUI, you'll solve merge conflict with a merge tool.

See: [Using the mergetool](mergetool.md)

## Conflicts with Git Bash

Let's say I `git push` and I get an error like the following:

```bash
git push
To https://github.com/qlik-trial/omni-project.git
 ! [rejected]          new-branch -> new-branch (fetch first)
error: failed to push some refs to 'https://github.com/qlik-trial/omni-project.git'
hint: Updates were rejected because the remote contains work that you do
hint: not have locally. This is usually caused by another repository pushing
hint: to the same ref. You may want to first integrate the remote changes
hint: (e.g., 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
```

Git is saying that I can't `push` because the remote copy of the branch has diverged:
it has content that I don't have on my local branch. Also, it is tells me that I need to `fetch` first. So let's do that.

What we want to do is:

1. Fetch the changes from remote.
2. Merge those changes with local.
3. Push our changes to remote.

```bash
git fetch
git merge
git push
```

If any file changes that someone else pushed to the remote branch are not in conflict with your changes,
the process completes without issue.

### Fixing conflicts

Let's say another writer working on `new-branch` changed the title of a document and then pushed her changes to the remote branch.
Meanwhile, you also changed the title of that same document on your copy of `new-branch`.
When you `git push` your changes to remote, you see a conflict error as above.
So you try the `fetch`, `merge`, `push`. The real problem comes when you run `merge`:

```bash
git fetch
git merge
Auto-merging docs/<your-document>.htm
CONFLICT (content): Merge conflict in docs/<your-document>.htm
Automatic merge failed; fix conflicts and then commit the result.
```

Git won't let you merge because you'd be changing the other writer's commit. So, how do you proceed?

Well, you want to see the conflict and decide what to do.
The simplest solution is to use a text editor like VS Code (or Atom, Notepad++, Sublime, etc.) to see te changes.

1. Open the conflict document (\<your-document\>.htm) in a text editor.
2. The conflict should be indicated:
    ```markdown
    <<<<<<< HEAD (Current Change)
    # Pushing and Pulling
    =======
    # Pushing and Pulling example
    >>>>>>> refs/remotes/origin/new-branch (Incoming Change)
    ```
    Current change is your version. Incoming change is the remote version. Here we can see the conflict: both writers made changes to       the title.
3. Correct the change by deleting the \<,\>,=, HEAD, and the content that you don't want to keep, or integrate both changes.
    I want to keep the current change so my document will look like this:
    ```markdown
    # Pushing and Pulling
    ```

Now, we need to `stage`, `commit`, and `push`.

```bash
git add --all #--all just means stage any and all changed files
git commit -m "fixed conflicts"
git push
git show-ref new-branch
ebca4258650049a273e9a67b3fb9aad8aa70af22 refs/heads/new-branch
ebca4258650049a273e9a67b3fb9aad8aa70af22 refs/remotes/origin/new-branch
```

Now we can see that the remote and local branches are up-to-date and pointing to the same commit,
and that is what we want.