# Git History

Use Git Bash to find, change, and reorganize git history.

## The git graph

|command|argument|description|
|---    |---        |---|
|`git log`|--|Prints out the commit history in a list.|
||`--graph`|Prints an ASCII graph|
||`--decorate`|Shows the positional references: HEAD, branch|
||`--oneline`|Formats log to single line|

![log](assets/images/gitlog.png)

## Show a commit

|command|argument|description|
|---    |---        |---|
|`git show <something>`|--|Prints out info about a commit|
||`<sha1>`|Show the commit referenced by the SHA1|
||`<branch>`|Shows the commit that the branch is pointing to|
||`HEAD`|Shows the commit that the HEAD is pointing to|

In the image above, `HEAD` and `feature/HLP-3162` and `cc67576a` all point to the same commit.

The following commands print the same results:

```bash
git show HEAD
#OR
git show `feature/HLP-3162`
#OR
git show `cc67576a`

commit cc67576a7142c77d3969666cf277ecdf741c8273 (HEAD -> feature/HLP-3162)
Author: kyleweishaar <kyle.weishaar@qlik.com>
Date:   Tue Jul 3 11:59:56 2018 -0400

    save all

diff --git a/Project/Targets/Sense_Hub/dev_share_scripting.fltar b/Project/Targets/Sense_Hub/dev_share_scripting.fltar
index 39644002..423cb586 100644
--- a/Project/Targets/Sense_Hub/dev_share_scripting.fltar
+++ b/Project/Targets/Sense_Hub/dev_share_scripting.fltar
@@ -5,10 +5,16 @@
   Type="CleanXHTML"
   Destinations=""
   GlossaryTermConversion="marked"
-  MasterToc="/Project/TOCs/Sense_Hub/ScriptingModule.fltoc">
+  MasterToc="/Project/TOCs/Sense_Hub/ScriptingModule.fltoc"
+  OutputFolder="C:\git\content-share">
   <PrintedOutput
     CollapseMargins="true"
     GenerateTOCProxy="true"
     GenerateIndexProxy="true"
     GenerateGlossaryProxy="true" />
+  <Destinations>
+    <Destination
+      Link="/Project/Destinations/git_hub.fldes"
+      Publish="true" />
+  </Destinations>
 </CatapultTarget>
\ No newline at end of file
```