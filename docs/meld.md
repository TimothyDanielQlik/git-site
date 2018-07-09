# Meld

Meld is a visual diff and merge tool. Although Git Extension has default integration with KDiff, you can change the default diff/merge tool.

## Installing Meld

1. Go [here](http://meldmerge.org/) to download and install the latest version of meld.

1. In Git Extensions, select **Tools** > **Settings**.

1. Under **Git Config** > **Mergetool**, select `meld` from the drop-down menu.

1. Under **Git Config** > **Difftool**, select `meld` from the drop-down menu.

    The configuration should look like this:

    ![meld](assets/images/meld.png)

1. Click **Apply**.

1. Click **Ok**.

## Using Meld

When a conflict occurs, Git Extensions suggests that you solve the conflict. The tools that Git Extensions will use to resolve the conflict is Meld.

### Understanding the windows

![meld](assets/images/meld3.png)

### Understanding colors

|Color | Indicates|
|---    |---    |
|Red|Lines in conflict|
|Blue|Lines with resolved conflicts|
|Green|Added lines|

![meld](assets/images/meld1.png)

![meld](assets/images/meld4.png)

### Solving the conflict

The goal of the merge tool is to create the correct file in the middle window. You can replace, add, or delete lines using the arrows, or you can edit the content directly in the window.

#### Replace

Click an arrow beside colored content to _push_ it in that direction.

It will replace the content in the adjacent window. This is the default functionality. (In the example below, I clicked on the first arrow on the file located on the right, replacing the content in the file in the middle).

![meld](assets/images/meld2.png)

#### Add

To add content, hold down `Ctrl` to turn the arrows into `+` signs.

Click on the `+` sign to add content to the adjacent window.

#### Delete

To delete content, hold down `Shift` to turn the arrows into `x` signs.

Click on the `x` to delete the content in the adjacent file.

Learn more [here](http://meldmerge.org/help/file-mode.html).
