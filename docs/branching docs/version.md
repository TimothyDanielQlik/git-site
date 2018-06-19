# Opening versioned files

Let's say that you are working on a file and you've made several commits.
Now, let's assume that you made some recent changes that you are not happy with, and you want to see a previous version of the file.
You can use the graph (commit history) to open versioned files.

For this example, let's assume that you created a `sample.md` file, and changed it twice, committing each change. Each commit represents a version of this file.

![version](assets/images/version.png)

`new sample file` is the first commit.

There are now three versions of this file in your branch history. You can open a previous version by selecting the commit (I selected the original commit in the image above).

Below the graph, the changed files from this commit are listed, and when you select on a document, the changes to that document are shown on the right.

![version](assets/images/version1.png)

We are looking at the original commit, so the document shows 3 new lines added and no line removed. If you open a commit that shows changes, it appears like this:

![version](assets/images/version3.png)

We can see that one line was removed, and one was added.

You can open the versioned file in your editor (or Flare). This is probably what you want to do if you've made a lot of changes.

1. Right-click the file
1. Select **Open selected version**

Notice that the versioned file name (in green) is marked with temp file name.

![version](assets/images/version2.png)

Now, let's say that you actually prefer the first version. You could use `reverse commit` as we saw in the [Working with commits](commits.md) topic. But this would reverse _all_ changes associated with those commits. What if you only want to reverse one file?

You can re-commit the state of the file.

1. Right-click the file
1. Select **Reset to Commit...**
1. Select **OK**

![version](assets/images/version4.png)

## What is happening

Git stored the state of the changed file, and the state of this file was associated to a commit. Git takes the versioned file, stages it, and commits it again. The head of the branch now has a new commit that points to the original version of the file.