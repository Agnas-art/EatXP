Set objFSO = CreateObject("Scripting.FileSystemObject")
Set objShell = CreateObject("WScript.Shell")

hostsPath = "C:\Windows\System32\drivers\etc\hosts"
hostEntry = "127.0.0.1       EatEducation"

' Read current hosts file
Set objFile = objFSO.OpenTextFile(hostsPath, 1)
hostContent = objFile.ReadAll()
objFile.Close()

' Check if entry already exists
If InStr(hostContent, "EatEducation") = 0 Then
    ' Add new entry
    Set objFile = objFSO.OpenTextFile(hostsPath, 8)
    objFile.WriteLine(hostEntry)
    objFile.Close()
    WScript.Echo "EatEducation domain added successfully!"
Else
    WScript.Echo "EatEducation already exists in hosts file"
End If
