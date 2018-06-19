# Sourcetree Troubleshooting

??? Info
    As we come across pain points and areas that need troubleshooting, we'll add them here.

## You can't install SourceTree

SourceTree's installer leans heavily on IE for the install process, and uses it authentication window pop-ups. If your IE setting are configured incorrectly, you will have a long and frustrating install experience.

The most common problem that we experienced was an issue with the initial Atlassian login. If your settings are not configured correctly, the authentication window loads indefinitely.

Do the following:

1. Open Internet Explorer.
1. Click **Tools** (the cog icon).
1. Click **Internet Options**.
1. Select the **Security** tab.
1. Click **Custom level**.
1. Confirm the following settings are enabled: **Miscallaneous/Access data sources across domains**, **Miscallaneous/Allow Meta-Refresh**, and **Scripting/Active Scripting**.
1. Select the **Privacy** tab.
1. Clear **Turn on Pop-up Blocker**.
1. Click **OK**.