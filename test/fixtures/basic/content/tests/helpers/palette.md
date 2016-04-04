---
subject: Helper Tests
title: Palette
section: helper-tests
pdf: false
---  

# Palette

Something before

{@palette}
Logo Blue: #ccc
Logo: Orange|#ccc
Logo Blue: rgb 100 200 300
Logo Blue: rgb(100,200,300)
Logo Blue: cmyk 1 2 3 4
Logo Blue: 1 2 3 hsv
|rgb 1,2,3
rgb 4 - 5 - 6
  	: # 999
Missing Numbers|1 2  	
Hex Too Short:ab
Hex Too Long:abcdefabc
{/palette}

Something after

---
   
# Code Used

The palette above was generated with the following code:

```
Logo Blue: #ccc
Logo: Orange|#ccc
Logo Blue: rgb 100 200 300
Logo Blue: rgb(100,200,300)
Logo Blue: cmyk 1 2 3 4
Logo Blue: 1 2 3 hsv
|rgb 1,2,3
rgb 4 - 5 - 6
  	: # 999
Missing Numbers|1 2  	
Hex Too Short:ab
Hex Too Long:abcdefabc
```
