# Git Extension Installation

Installing Git Extension is a quick and simple process.

## Prerequisites

* Make sure that you have git installed on your computer.

    !!! Note
        If you don't already have git installed, you can install Git at the same time as your install Git Extension.

* Download Git Extension.

    You should see the installer in your downloads folder.

    [Git Extension](https://github.com/gitextensions/gitextensions/releases)

## Installing Git Extension

1. Grab the latest release from the Git Extensions Github site.

    The latest release is v2.51.02. If you scroll down on the page you'll see a green download button.

    `GitExtensions-2.51.01-SetupComplete.exe`

1. Run the installer.

1. Select the boxes to install Git (if needed) and KDiff (merge conflict tool).

    ![gitdialog](assets/images/gitext-d1.png)

    Accept the default install location.

1. On the custom setup dialog, select which features you want to install.

1. Select the SSH Client.

    I select PuTTY for integration with Windows.

1. Select **Install**.

    You will likely get a User Account Control blocking your install. Watch for the blinking icon in your taskbar.

    You will also get a KDiff dialog that sits in your task bar that does not automatically pop up. If your install looks to be hanging, check your taskbar for the KDiff install.

    Once KDiff installs, your Git Extension installer will finish.

!!! Info
    The first time you open Git Extension, the app will verify that your machine is set up correctly. Click **OK** to open the app.