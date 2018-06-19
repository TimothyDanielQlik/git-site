# Recover a Deleted Commit

Well, you've decided to delete a commit, but now you realize you shouldn't have done that! Not all is lost, but you'll need to abandon Sourcetree and open up Git Bash.

To recover a deleted commit (or any deleted object), do the following:

1. Open Git Bash
1. `cd` into the local repository.
1. Run `git fsck` = file system consistency check.

    `fsck --lost-found` looks for objects that are not referenced by a branch.

    ```bash
    $ git fsck --lost-found
    Checking object directories: 100% (256/256), done.
    dangling commit 3822a0f32d606bbd6c9f7967906d6ff7ff41ae94
    dangling commit 4cd6ae078fa0008f806b49414cb5b2a5a154d136
    dangling tree 4b825dc642cb6eb9a060e54bf8d69288fbee4904
    ...
    ```
    Dangling objects are not associated with a branch. They exist in the git log but they are not traceable to anything (because you deleted it!).

    Unfortunately, there is no particular order to these dangling objects so it is difficult to know what we're looking for. If you can't find it with `git fsck`, run `reflog`.

1. Run `git reflog`.

    ```bash
    $ git reflog
    e4ba017 (HEAD -> master) HEAD@{0}: reset: moving to e4ba0172eb34744932e514717e8cb411a280a36f
    bcbb398 HEAD@{1}: commit: Going to delete this file, and then I will recover it!
    e4ba017 (HEAD -> master) HEAD@{2}: revert: Revert "Add a text file"
    ef5dd4d HEAD@{3}: commit: Add a text file
    ...
    ```

    The `reflog` keeps a record of when the tip of a branch was updated. Deleting a commit is also like updating the tip of a branch. The reflof is ordered.

    ??? Info
        Remember that a git reset takes the commit message from the commit you are reseting the branch to, and puts a `reset:` infront. Use this to located deleted commits.

    The commit I wan to recover is bcbb398 (the commit above it was `reset`).

1. Type `q` to quit the interactive mode.
1. Run `git show <SHA1>`.

    ```bash
    $ git show bcbb398
    commit bcbb398a9a2d391c01074dc27e306787c5b6ece9
    Author: kyleweishaar <kyle.weishaar@qlik.com>
    Date:   Thu Feb 22 11:04:12 2018 -0500

    Going to delete this file, and then I will recover it!

    diff --git a/New Text Document.txt b/New Text Document.txt
    new file mode 100644
    index 0000000..e69de29
    ```

    I can confirm that this is the commit that I want to recover.

    Now I want to merge this dangling commit back to my branch.

1. Make sure I am on the branch I want to merge into.

    Run `git merge <SHA1>`.

    ```bash
    git merge bcbb398
    ```

1. Open Sourcetree.

    You should see the recovered commit.

    ??? Tip
        You might see some uncommitted changes that come along with the merge. These should not be a problem. Just have a look to see what is uncommitted before you commit them.
