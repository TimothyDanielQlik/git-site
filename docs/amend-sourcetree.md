# Amend Commits with Sourcetree

Sometimes we can be commit-happy. Perhaps we committed something too soon, or maybe we left a really bad commit message. Git is designed not to lose anything in its history, but we can rewrite some of it.

## Amend a commit

Say, you made a commit yesterday, and you now realize that you have a couple other changes that should be part of this commit.

### Example

I deleted all the old files and committed them to `master`, but I forgot to delete one other file and include that in the latest commit.

To fix this, I'll delete the forgotten file and stage it. My graph will lok this this:

![amend](assets/images/amend.png)

Now I'll commit the staged change, as normal, except this time I want to amend it to the latest commit.

![amend](assets/images/amending.png)

Select yes when the pop-up asks for confirmation.

???Tip
    When amending a commit, you should not select **Push immediately to origin/master**. If you do, you'll end up with a conflict with the remote.

## Edit a commit message

You committed, but your message is not very useful. You can edit the message with **Interactive Rebase**.

### Example

In the example above, my commit message was "delete old files". Perhaps I want to be more specific.

To edit a commit message, I need to open **Interactive rebase** by selecting the parent of the commit I want to edit.

??? Tip
    When referring to the graph, the latest commit is the child of the commit that precedes it.

![ff](assets/images/fixed.png)

The commit with the commit message "filling in info" is a child of "Getting synced up".

Do the following to edit a commit message:

1. Right-click on the parent commit.
1. Select **Rebase children of ...**

    A dialog opens.

1. Select **Edit Message**.
1. Enter a new commit message.
1. Select the box beside **Amend commit**.
1. Select **OK**.

Your commit now has a new message.