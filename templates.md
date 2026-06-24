# Template Code Injects
These are injected into new code for better user experience and accessibility. Make sure to add these before you release a new game.
## Instructions and Back to Homepage Buttons
These are injected into new game imports for accessibility and user experience. These scripts need to be injected into any new game added to FT Games.
### Styling (Paste just before `</style>`)
```
#homeButton,
#instructionsButton{
    position:fixed;
    top:10px;
    z-index:9999999;

    display:inline-flex;
    align-items:center;
    justify-content:center;

    padding:10px 18px;

    background:rgba(20,20,30,.92);
    border:2px solid #00e5ff;
    border-radius:14px;

    color:#fff !important;
    font:700 15px Arial,sans-serif !important;
    text-decoration:none !important;
    line-height:1;
    cursor:pointer;

    box-shadow:
        0 0 10px rgba(0,229,255,.35),
        inset 0 0 8px rgba(0,229,255,.15);

    transition:.25s ease;
    user-select:none;
}

#homeButton{
    right:10px;
}

#instructionsButton{
    left:10px;
}

#homeButton:hover,
#instructionsButton:hover{
    background:linear-gradient(90deg,#00e5ff,#00ff99);
    color:#000 !important;
    box-shadow:0 0 18px rgba(0,255,170,.45);
    transform:translateY(-2px);
}
```
### Object Code (Paste just after `<body>`)
```
<a id="homeButton" href="https://ftgames.xyz/games">
🏠 Home
</a>

<div id="instructionsButton">
📖 Instructions
</div>
```
### Instructions Popup Window (Paste whole script block just before `</body>` and just after `</script>`)
```
<script>
  document.getElementById("instructionsButton").addEventListener("click", () => {
      window.open(
          "https://ftgames.xyz[/REPLACE_WITH_GAME_DIRECTORY]/instructions",
          "instructions",
          "width=800,height=600,resizable=yes,scrollbars=yes"
      );
  });
</script>
```
## Favicon Code (Paste just below `<head>`)
This makes our logo show up in tabs on browsers. It's required on every page.
```
<link rel="icon" type="image/x-icon" href="/images/favicon.png">
```
