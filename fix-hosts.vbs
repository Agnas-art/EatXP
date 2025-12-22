Set objFSO = CreateObject("Scripting.FileSystemObject")

hostsPath = "C:\Windows\System32\drivers\etc\hosts"

' Read current hosts file
Set objFile = objFSO.OpenTextFile(hostsPath, 1)
hostContent = objFile.ReadAll()
objFile.Close()

' Remove any malformed EatEducation entries
hostContent = Replace(hostContent, "mssplus.mcafee.com127.0.0.1 EatEducation", "mssplus.mcafee.com")

' Add proper entry on a new line
If InStr(hostContent, "127.0.0.1") = 0 OR InStr(hostContent, "EatEducation") = 0 Then
    If Right(hostContent, 1) <> vbCrLf Then
        hostContent = hostContent & vbCrLf
    End If
    hostContent = hostContent & "127.0.0.1       EatEducation" & vbCrLf
End If

' Write back to hosts file
Set objFile = objFSO.OpenTextFile(hostsPath, 2)
objFile.Write hostContent
objFile.Close()

WScript.Echo "Hosts file updated!"
